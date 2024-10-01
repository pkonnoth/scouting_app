'use client';

import Link from 'next/link';
import Button from '../components/Button'; // Adjust the path as needed

export default function page() {

    return (
        <div>
            <h1>Teleop</h1>
            <Link href="/onboarding">
                <Button
                    text="Back"
                    onClick={() => console.log('Custom button clicked')}
                    className="mt-4 mx-auto w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 gap-2"
                />

          </Link>
        </div>
        
    )

}