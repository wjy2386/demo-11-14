import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { MapPinIcon, SparklesIcon, SunIcon } from './common/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HomePageProps {
  onSubmit: (preferences: UserPreferences) => void;
}

const interestKeys = ["history", "art_culture", "food", "adventure", "nature", "relaxation", "nightlife", "shopping"];

const HomePage: React.FC<HomePageProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('comfort');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interestKey: string) => {
    setInterests(prev =>
      prev.includes(interestKey) ? prev.filter(i => i !== interestKey) : [...prev, interestKey]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && days > 0 && interests.length > 0) {
      onSubmit({ destination, days, budget, interests });
    } else {
      alert(t('home.alertMissing'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      {/* Language switcher is in Header, but HomePage is sometimes standalone in current App logic if no header. 
          However, App.tsx renders Header for non-Home pages. For Home page, we need access to switch language? 
          The provided design has Header on all pages except maybe Home? 
          Wait, App.tsx says: currentPage !== Page.Home && <Header ... />.
          So Home page has NO header. I should add the language switcher here or enable header on Home.
          Let's add a standalone language switcher here for simplicity.
      */}
      
      <div className="absolute top-4 right-4 z-50">
          {/* We will let the user switch language via a button here since Header is hidden */}
          <LanguageSwitcherButton /> 
      </div>

      <div className="w-full max-w-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8 relative">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{t('home.title')}</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">{t('home.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('home.destination')}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MapPinIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 pl-10 py-3 text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
                placeholder={t('home.destinationPlaceholder')}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('home.days')}</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <SunIcon className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="number"
                  id="days"
                  value={days}
                  onChange={e => setDays(Number(e.target.value))}
                  min="1"
                  max="30"
                  className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 pl-10 py-3 text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('home.budget')}</label>
              <select
                id="budget"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 py-3 pl-3 pr-10 text-base text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
              >
                <option value="economy">{t('home.budgetOptions.economy')}</option>
                <option value="comfort">{t('home.budgetOptions.comfort')}</option>
                <option value="luxury">{t('home.budgetOptions.luxury')}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t('home.interests')}</label>
            <div className="flex flex-wrap gap-3">
              {interestKeys.map(key => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleInterest(key)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    interests.includes(key)
                      ? 'bg-cyan-500 text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-cyan-500'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {t(`home.interestOptions.${key}`)}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-105">
            <SparklesIcon className="h-5 w-5"/>
            {t('home.generateButton')}
          </button>
        </form>
      </div>
    </div>
  );
};

import { LanguageIcon } from './common/icons';
const LanguageSwitcherButton = () => {
    const { language, setLanguage } = useLanguage();
    return (
         <button
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors font-medium backdrop-blur-sm"
            >
            <LanguageIcon className="h-5 w-5" />
            {language === 'zh' ? 'English' : '中文'}
        </button>
    )
}

export default HomePage;