// src/app/teamsPage/page.tsx

import TeamsSelection from '../components/TeamsSelection';


interface TeamsPageProps {
  searchParams: {
    eventCode: string;
    matchNumber: string;
    teamColor: 'Red' | 'Blue';
  };
}

const BLUE_ALLIANCE_KEY = 't7ZUzNJJloBXuuhVFC7UwfIss0GbPul9lqbsba9SqicpGNd4KpI0pM2gX0zubcKZ';

async function fetchTeamData(eventCode: string, matchNumber: string) {
  const matchKey = `${eventCode}_qm${matchNumber}`;
  
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

  return { redTeams, blueTeams };
}

const TeamsPage = async ({ searchParams }: TeamsPageProps) => {
  const { eventCode, matchNumber, teamColor } = searchParams;

  // Fetch the team data directly on the server
  const { redTeams, blueTeams } = await fetchTeamData(eventCode, matchNumber);
  const teamsToDisplay = teamColor === 'Red' ? redTeams : blueTeams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <TeamsSelection
        teams={teamsToDisplay}
        teamColor={teamColor}
      />
    </div>
  );
};

export default TeamsPage;
