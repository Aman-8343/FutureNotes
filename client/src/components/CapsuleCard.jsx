import React from 'react';
import Countdown from 'react-countdown';

const CapsuleCard = ({ capsule }) => {
    
    const serverUrl = import.meta.env.VITE_API_BASE_URL;

    
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed || !capsule.isLocked) {
            return <span className="unlocked-text">✨ Unlocked!</span>;
        } else {
            return (
                <span className="countdown-timer">
                    {days}d {hours}h {minutes}m {seconds}s
                </span>
            );
        }
    };

    return (
        <div className={`capsule-card ${!capsule.isLocked ? 'unlocked' : 'locked'}`}>
            <h3>{capsule.title}</h3>
            <div className="unlock-info">
                <strong>Unlocks in: </strong>
                <Countdown date={capsule.unlockDate} renderer={renderer} />
            </div>
            
            {!capsule.isLocked && (
                <div className="capsule-content">
                    <p><strong>Message:</strong> {capsule.message}</p>
                    {capsule.filePath && (
                        <a href={`${serverUrl}/${capsule.filePath}`} target="_blank" rel="noopener noreferrer" className="file-link">
                            View Attached File
                        </a>
                    )}
                </div>
            )}
        </div>
    );
};

export default CapsuleCard;