import React from 'react';
import { Itinerary } from '../types';
import { SunIcon, CalendarIcon, SparklesIcon } from './common/icons';

interface ItineraryPageProps {
  itinerary: Itinerary;
  onSelectDay: (dayIndex: number) => void;
  onFinalize: () => void;
}

const ItineraryPage: React.FC<ItineraryPageProps> = ({ itinerary, onSelectDay, onFinalize }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{itinerary.trip_title}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">{itinerary.overall_summary}</p>
        <div className="mt-4 flex justify-center items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-cyan-500" />
                <span>{itinerary.duration} 天</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-cyan-500">¥</span>
                <span>{itinerary.budget}预算</span>
            </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {itinerary.daily_plans.map((plan, index) => (
          <div key={plan.day} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full mr-4">
                    <SunIcon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">第 {plan.day} 天</p>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{plan.title}</h3>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{plan.summary}</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50">
              <button
                onClick={() => onSelectDay(index)}
                className="w-full text-center px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-600 transition-colors"
              >
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
            onClick={onFinalize}
            className="w-full max-w-md flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-transform transform hover:scale-105"
        >
            <SparklesIcon className="h-5 w-5"/>
            查看完整行程（不预订服务）
        </button>
      </div>
    </div>
  );
};

export default ItineraryPage;