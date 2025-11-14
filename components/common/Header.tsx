import React from 'react';
import { CompassIcon } from './icons';

interface HeaderProps {
    title: string;
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onHomeClick }) => {
    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div 
                        className="flex items-center space-x-3 cursor-pointer group"
                        onClick={onHomeClick}
                    >
                        <CompassIcon className="h-8 w-8 text-cyan-500 group-hover:animate-spin" />
                        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600 transition-colors">
                            AI 旅行规划师
                        </h1>
                    </div>
                    <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 hidden sm:block">{title}</h2>
                </div>
            </div>
        </header>
    );
};

export default Header;