import React, { useState } from 'react';
import { UserPreferences } from '../types';
import { MapPinIcon, CalendarIcon, SparklesIcon, SunIcon } from './common/icons';

interface HomePageProps {
  onSubmit: (preferences: UserPreferences) => void;
}

const interestOptions = ["历史", "艺术与文化", "美食家", "探险", "自然", "放松", "夜生活", "购物"];

const HomePage: React.FC<HomePageProps> = ({ onSubmit }) => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState('舒适');
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && days > 0 && interests.length > 0) {
      onSubmit({ destination, days, budget, interests });
    } else {
      alert("请填写所有字段并至少选择一个兴趣。");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900">
      <div className="w-full max-w-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">定制您的完美旅程</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">告诉我们您的旅行梦想，我们将为您打造行程。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-slate-700 dark:text-slate-300">目的地</label>
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
                placeholder="例如：法国巴黎"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-slate-700 dark:text-slate-300">旅行天数</label>
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
              <label htmlFor="budget" className="block text-sm font-medium text-slate-700 dark:text-slate-300">预算</label>
              <select
                id="budget"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 py-3 pl-3 pr-10 text-base text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-cyan-500"
              >
                <option>经济</option>
                <option>舒适</option>
                <option>奢华</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">兴趣</label>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
                    interests.includes(interest)
                      ? 'bg-cyan-500 text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-cyan-500'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-105">
            <SparklesIcon className="h-5 w-5"/>
            生成我的行程
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;