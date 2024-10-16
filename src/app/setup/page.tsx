// src/app/setup/page.tsx

import SetupForm from '../components/SetupForm';

const events = [
  { name: 'Dalton', code: '2024gadal' },
  { name: 'Carrollton', code: '2024gacar' },
  { name: 'States', code: '2024gacmp' },
];

const SetupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <SetupForm events={events} />
    </div>
    
    
  );
};

export default SetupPage;
