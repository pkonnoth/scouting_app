
import { NextApiRequest, NextApiResponse } from 'next';

const BLUE_ALLIANCE_KEY = 't7ZUzNJJloBXuuhVFC7UwfIss0GbPul9lqbsba9SqicpGNd4KpI0pM2gX0zubcKZ';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventCode, matchNumber } = req.query;

  if (!eventCode || !matchNumber) {
    return res.status(400).json({ error: 'Missing eventCode or matchNumber' });
  }

  const matchKey = `${eventCode}_qm${matchNumber}`;

  try {
    // Fetch match data to get red and blue team keys
    const matchResponse = await fetch(
      `https://www.thebluealliance.com/api/v3/match/${matchKey}`,
      {
        headers: {
          'X-TBA-Auth-Key': BLUE_ALLIANCE_KEY,
        },
      }
    );

    if (!matchResponse.ok) throw new Error('Failed to fetch match data');
    const matchData = await matchResponse.json();

    const redTeamKeys = matchData?.alliances?.red?.team_keys || [];
    const blueTeamKeys = matchData?.alliances?.blue?.team_keys || [];

    // Helper function to fetch team details for a given team key
    const fetchTeamDetails = async (teamKey: string) => {
      const teamResponse = await fetch(
        `https://www.thebluealliance.com/api/v3/team/${teamKey}`,
        {
          headers: {
            'X-TBA-Auth-Key': BLUE_ALLIANCE_KEY,
          },
        }
      );
      if (!teamResponse.ok) throw new Error('Failed to fetch team data');
      const teamData = await teamResponse.json();
      return { number: teamKey.replace('frc', ''), name: teamData.nickname };
    };

    // Fetch details for all red and blue teams
    const redTeams = await Promise.all(redTeamKeys.map(fetchTeamDetails));
    const blueTeams = await Promise.all(blueTeamKeys.map(fetchTeamDetails));

    res.status(200).json({
      redTeams,
      blueTeams,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
