// src/components/TeamsSelection.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from './Button';

interface Team {
  number: string;
  name: string;
}

interface TeamsSelectionProps {
  teams: Team[];
  teamColor: 'Red' | 'Blue';
}

const TeamsSelection: React.FC<TeamsSelectionProps> = ({ teams, teamColor }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Select a Team</h1>
      <p className={`text-center font-semibold ${teamColor === 'Red' ? 'text-red-600' : 'text-blue-600'}`}>
        {teamColor === 'Red' ? 'Red Alliance Teams' : 'Blue Alliance Teams'}
      </p>

      <div className="flex flex-col gap-4 items-center mt-4">
        {teams.map((team) => (
          <button
            key={team.number}
            onClick={() => setSelectedTeam(team)}
            className={`teamBox shadow-md flex items-center justify-center ${
              selectedTeam?.number === team.number
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-800'
            } ${
              teamColor === 'Red' ? 'border border-red-500' : 'border border-blue-500'
            } hover:bg-indigo-500 hover:text-white transition-colors duration-200`}
          >
            <span>{`Team ${team.number}: ${team.name}`}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Link href="/setup" passHref>
          <Button
            text="Back"
            className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none w-full sm:w-auto"
          />
        </Link>

        <Link
          href={{
            pathname: '/nextPage',  // replace with actual next page route
            query: {
              selectedTeamNumber: selectedTeam?.number,
              selectedTeamName: selectedTeam?.name,
            },
          }}
          passHref
        >
          <Button
            text="Next"
            className={`py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none w-full sm:w-auto ${
              !selectedTeam ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => {
              if (!selectedTeam) {
                alert("Please select a team before proceeding.");
              }
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default TeamsSelection;
