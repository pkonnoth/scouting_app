// src/components/SetupForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from './Button';

interface Event {
  name: string;
  code: string;
}

interface SetupFormProps {
  events: Event[];
}

const SetupForm: React.FC<SetupFormProps> = ({ events }) => {
  const [scouterName, setScouterName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [matchNumber, setMatchNumber] = useState('');
  const [teamColor, setTeamColor] = useState<'Red' | 'Blue' | null>(null);

  const isFormComplete = scouterName && selectedEvent && matchNumber && teamColor;

  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Scouting Setup</h1>

      {/* Scouter Name Input */}
      <div>
        <label htmlFor="scouterName" className="block text-sm font-medium text-gray-700">
          Scouter Name
        </label>
        <input
          type="text"
          id="scouterName"
          value={scouterName}
          onChange={(e) => setScouterName(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          placeholder="Enter your name"
        />
      </div>

      {/* Event Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Event</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {events.map((event) => (
            <button
              type="button"
              key={event.code}
              onClick={() => setSelectedEvent(event)}
              className={`px-4 py-2 rounded-md shadow-sm flex-1 ${
                selectedEvent?.code === event.code
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-indigo-500 hover:text-white focus:outline-none`}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>

      {/* Match Number Input */}
      <div>
        <label htmlFor="matchNumber" className="block text-sm font-medium text-gray-700">
          Match Number
        </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="matchNumber"
          value={matchNumber}
          onChange={(e) => setMatchNumber(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          placeholder="Enter match number"
        />
      </div>

      {/* Team Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Team Color</label>
        <div className="flex space-x-2 mt-2">
          {['Red', 'Blue'].map((color) => (
            <button
              type="button"
              key={color}
              onClick={() => setTeamColor(color as 'Red' | 'Blue')}
              className={`px-4 py-2 rounded-md shadow-sm flex-1 ${
                teamColor === color
                  ? color === 'Red'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-indigo-500 hover:text-white focus:outline-none`}
            >
              {color} Team
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Button */}
      <Link
        href={{
          pathname: '/teamsPage',
          query: {
            scouterName,
            eventCode: selectedEvent?.code,
            matchNumber,
            teamColor,
          },
        }}
        passHref
      >
        <Button
          text="Next"
          onClick={() => {
            if (!isFormComplete) {
              alert("Please complete all fields.");
            }
          }}
          className={`mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            !isFormComplete ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        />
      </Link>
    </div>
  );
};

export default SetupForm;
