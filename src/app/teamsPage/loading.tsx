// src/app/teamsPage/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-300">Loading Teams...</h1>
        
        <div className="flex flex-col gap-4 items-center mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="teamBox bg-gray-200 animate-pulse flex items-center justify-center"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationDuration: '1s',
              }}
            >
              <span className="bg-gray-300 h-4 w-3/4 rounded-full"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
