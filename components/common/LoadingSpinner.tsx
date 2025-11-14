import React from 'react';
import { CompassIcon } from './icons';

interface LoadingSpinnerProps {
    message: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8">
            <CompassIcon className="h-16 w-16 text-cyan-500 animate-spin mb-4" />
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{message}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">请稍候...</p>
        </div>
    );
};

export default LoadingSpinner;