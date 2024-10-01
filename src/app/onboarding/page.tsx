'use client';

import Link from 'next/link';
import Button from '../components/Button'; // Adjust the path as needed

const OnboardingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Scouting Onboarding</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="scouterName" className="block text-sm font-medium text-gray-700">
              Scouter Name
            </label>
            <input
              type="text"
              id="scouterName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="event" className="block text-sm font-medium text-gray-700">
              Event
            </label>
            <input
              type="text"
              id="event"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter the event name"
            />
          </div>

          <div>
            <label htmlFor="teamNumber" className="block text-sm font-medium text-gray-700">
              Team Number
            </label>
            <input
              type="text"
              id="teamNumber"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your team number"
            />
          </div>

          {/* Use the Button component here */}
          <Link href="/teleop">
          <Button
            text="Next"
            onClick={() => console.log('Custom button clicked')}
            className="mt-4 mx-auto w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 gap-2"
          />

          </Link>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
