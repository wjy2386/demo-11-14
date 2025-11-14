import React from 'react';
import { Itinerary, BookedServices } from '../types';
import { CheckCircleIcon } from './common/icons';

interface FinalItineraryPageProps {
  itinerary: Itinerary;
  bookedServices: BookedServices;
  onStartOver: () => void;
}

const FinalItineraryPage: React.FC<FinalItineraryPageProps> = ({ itinerary, bookedServices, onStartOver }) => {
  const totalServiceCost = (bookedServices.guide?.pricePerDay || 0) * itinerary.duration + (bookedServices.vehicle?.pricePerDay || 0) * itinerary.duration;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">您的 {itinerary.destination} 之旅已规划完毕！</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">这是您的完整行程单。祝您旅途愉快！</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {itinerary.daily_plans.map(plan => (
            <div key={plan.day} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">第 {plan.day} 天: {plan.title} <span className="text-lg font-normal text-slate-500 dark:text-slate-400">({plan.date})</span></h3>
              <ul className="space-y-3">
                {plan.activities.map((activity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-bold text-slate-700 dark:text-slate-300 w-28 shrink-0">{activity.startTime}</span>
                    <span className="text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{activity.name}</span> - {activity.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">已预订服务</h3>
            {bookedServices.guide || bookedServices.vehicle ? (
              <div className="space-y-4">
                {bookedServices.guide && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p className="font-bold text-slate-700 dark:text-slate-300">导游</p>
                    <p className="text-slate-600 dark:text-slate-400">{bookedServices.guide.name}</p>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">¥{bookedServices.guide.pricePerDay * itinerary.duration} / {itinerary.duration} 天</p>
                  </div>
                )}
                {bookedServices.vehicle && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                    <p className="font-bold text-slate-700 dark:text-slate-300">车辆</p>
                    <p className="text-slate-600 dark:text-slate-400">{bookedServices.vehicle.name}</p>
                    <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">¥{bookedServices.vehicle.pricePerDay * itinerary.duration} / {itinerary.duration} 天</p>
                  </div>
                )}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-lg font-bold text-slate-800 dark:text-slate-200">服务总费用: ¥{totalServiceCost}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400">未预订任何服务。</p>
            )}

            <div className="mt-8 text-center text-green-600 dark:text-green-400 flex flex-col items-center">
                <CheckCircleIcon className="h-12 w-12"/>
                <p className="font-bold mt-2">准备出发！</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button
          onClick={onStartOver}
          className="px-8 py-3 font-semibold text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg shadow-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          计划下一次旅行
        </button>
      </div>
    </div>
  );
};

export default FinalItineraryPage;