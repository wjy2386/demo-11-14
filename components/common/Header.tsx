import React from 'react';
import { CompassIcon, LanguageIcon } from './icons';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeaderProps {
    title: string;
    onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onHomeClick }) => {
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => {
        setLanguage(language === 'zh' ? 'en' : 'zh');
    };

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
                            {t('appTitle')}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                         <h2 className="text-lg font-semibold text-slate-600 dark:text-slate-400 hidden sm:block">{title}</h2>
                         <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors text-sm font-medium"
                         >
                            <LanguageIcon className="h-4 w-4" />
                            {language === 'zh' ? 'EN' : '中'}
                         </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;