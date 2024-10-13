'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '../components/Button';

interface Team {
  number: string;
  name: string;
}

const TeamsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventCode = searchParams?.get('eventCode') || '';
  const matchNumber = searchParams?.get('matchNumber') || '';
  const teamColor = searchParams?.get('teamColor') || '';

  const [redTeams, setRedTeams] = useState<Team[]>([]);
  const [blueTeams, setBlueTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  // Fetch team data with names based on eventCode and matchNumber
  useEffect(() => {
    const fetchTeams = async () => {
      if (eventCode && matchNumber) {
        try {
          const response = await fetch(
            `/api/getTeams?eventCode=${eventCode}&matchNumber=${matchNumber}`
          );
          if (!response.ok) throw new Error('Failed to fetch team data');
          const data = await response.json();

          setRedTeams(data.redTeams);
          setBlueTeams(data.blueTeams);
        } catch (error) {
          console.error('Error fetching teams:', error);
        }
      }
    };

    fetchTeams();
  }, [eventCode, matchNumber]);

  // Determine which teams to display based on team color
  const teamsToDisplay = teamColor === 'Red' ? redTeams : blueTeams;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Select a Team</h1>
        
        <p
          className={`text-center font-semibold ${
            teamColor === 'Red' ? 'text-red-600' : 'text-blue-600'
          }`}
        >
          {teamColor === 'Red' ? 'Red Alliance Teams' : 'Blue Alliance Teams'}
        </p>

        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mt-4">
          {teamsToDisplay.map((team) => (
            <button
              key={team.number}
              onClick={() => setSelectedTeam(team)}
              className={`px-4 py-2 rounded-md shadow-md flex items-center gap-2 ${
                selectedTeam?.number === team.number
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              } ${
                teamColor === 'Red' ? 'border border-red-500' : 'border border-blue-500'
              } hover:bg-indigo-500 hover:text-white transition-colors duration-200 w-full sm:w-auto`}
            >
              <span>{`Team ${team.number}: ${team.name}`}</span>
            </button>
          ))}
        </div>

        {selectedTeam && (
          <div className="mt-4 text-center">
            <p>
              Selected Team: Team {selectedTeam.number} - {selectedTeam.name}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          {/* Back Button */}
          <Button
            text="Back"
            onClick={() => router.back()}
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none w-full sm:w-auto"
          />

          {/* Placeholder Next Button */}
          <Button
            text="Next"
            onClick={() => console.log('Proceeding to the next step')}
            className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
