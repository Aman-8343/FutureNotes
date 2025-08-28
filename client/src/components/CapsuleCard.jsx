import React from 'react';
import Countdown from 'react-countdown';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8z" clipRule="evenodd" />
    </svg>
);

const UnlockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" />
    </svg>
);

const CapsuleCard = ({ capsule }) => {
    const serverUrl = import.meta.env.VITE_API_BASE_URL;

    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed || !capsule.isLocked) {
            return <span className="font-semibold text-green-600">Ready to Open!</span>;
        } else {
            return (
                <span className="font-mono text-gray-700">
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className={`p-4 border-l-4 ${capsule.isLocked ? 'border-yellow-400' : 'border-green-400'}`}>
                <div className="flex items-center mb-2">
                    {capsule.isLocked ? <LockIcon /> : <UnlockIcon />}
                    <h3 className="text-lg font-bold text-gray-800 truncate">{capsule.title}</h3>
                </div>
                <div className="text-sm text-gray-500 mb-4">
                    <Countdown date={capsule.unlockDate} renderer={renderer} />
                </div>
                
                {!capsule.isLocked && (
                    <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700 break-words">
                            <strong>Message:</strong> {capsule.message}
                        </p>
                        {capsule.filePath && (
                            <a 
                                href={`${serverUrl}/${capsule.filePath}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                View Attached File →
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CapsuleCard;