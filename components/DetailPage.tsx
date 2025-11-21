import React from 'react';
import { DayPlan } from '../types';
import { ClockIcon, TagIcon, MapPinIcon, BuildingOfficeIcon, StarIcon } from './common/icons';
import InteractiveMap from './InteractiveMap';
import { useLanguage } from '../contexts/LanguageContext';

interface DetailPageProps {
  dayPlan: DayPlan;
  onBack: () => void;
  onBookServices: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ dayPlan, onBack, onBookServices }) => {
    const { t } = useLanguage();

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(rating) ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
                />
            );
        }
        return stars;
    };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-lg font-bold text-cyan-500">{t('detail.day', { day: dayPlan.day })} &bull; {dayPlan.date}</p>
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-1">{dayPlan.title}</h2>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-cyan-500 pb-2 mb-4">{t('detail.activities')}</h3>
                    <ul className="space-y-4 h-[500px] lg:h-auto lg:max-h-[600px] overflow-y-auto pr-2 -mr-2">
                        {dayPlan.activities.map((activity, index) => (
                           <li key={index} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg shadow-inner">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">{activity.name}</h4>
                              <div className="flex items-center gap-2 text-sm font-semibold bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 px-3 py-1 rounded-full shrink-0">
                                <ClockIcon className="h-4 w-4" />
                                <span>{activity.startTime} - {activity.endTime}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400 mb-3">
                              <div className="flex items-center gap-1">
                                <TagIcon className="h-4 w-4" />
                                <span className="capitalize">{activity.type}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{activity.location}</span>
                              </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300">{activity.description}</p>
                          </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-cyan-500 pb-2 mb-4">{t('detail.map')}</h3>
                     <InteractiveMap activities={dayPlan.activities} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-cyan-500 pb-2 mb-4">{t('detail.dining')}</h3>
                    <div className="space-y-3">
                        <p><span className="font-bold text-slate-700 dark:text-slate-300">{t('detail.lunch')}：</span> <span className="text-slate-600 dark:text-slate-400">{dayPlan.dining.lunch}</span></p>
                        <p><span className="font-bold text-slate-700 dark:text-slate-300">{t('detail.dinner')}：</span> <span className="text-slate-600 dark:text-slate-400">{dayPlan.dining.dinner}</span></p>
                    </div>
                </div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-cyan-500 pb-2 mb-4">{t('detail.accommodation')}</h3>
                    {dayPlan.hotelRecommendation ? (
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                <BuildingOfficeIcon className="h-5 w-5"/>
                                {dayPlan.hotelRecommendation.name}
                            </h4>
                            <div className="flex items-center">{renderStars(dayPlan.hotelRecommendation.rating)}</div>
                            <p className="text-slate-600 dark:text-slate-400">
                                <span className="font-semibold">¥{dayPlan.hotelRecommendation.pricePerNight}</span> {t('detail.perNight')}
                            </p>
                             <a href={dayPlan.hotelRecommendation.bookingLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-semibold">
                                {t('detail.bookHotel')}
                            </a>
                        </div>
                    ) : (
                         <p className="text-slate-500 dark:text-slate-400">{t('detail.noHotel')}</p>
                    )}
                </div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 border-b-2 border-cyan-500 pb-2 mb-4">{t('detail.transport')}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{dayPlan.transport}</p>
                </div>
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onBack}
              className="px-6 py-3 text-slate-600 dark:text-slate-300 font-semibold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              &larr; {t('detail.back')}
            </button>
            <button
              onClick={onBookServices}
              className="px-8 py-3 bg-cyan-600 text-white rounded-lg font-bold shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105"
            >
              {t('detail.bookServices')} &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;