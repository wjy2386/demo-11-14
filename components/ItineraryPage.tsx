import React, { useState } from 'react';
import { Itinerary } from '../types';
import { SunIcon, CalendarIcon, SparklesIcon, ArrowPathIcon, PencilSquareIcon, BookmarkIcon, XMarkIcon } from './common/icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ItineraryPageProps {
  itinerary: Itinerary;
  onSelectDay: (dayIndex: number) => void;
  onFinalize: () => void;
  onRegenerate: () => void;
  onModify: (instruction: string) => void;
  onSave: () => void;
}

const ItineraryPage: React.FC<ItineraryPageProps> = ({ itinerary, onSelectDay, onFinalize, onRegenerate, onModify, onSave }) => {
  const { t } = useLanguage();
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [modifyPrompt, setModifyPrompt] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleModifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modifyPrompt.trim()) {
      onModify(modifyPrompt);
      setIsModifyModalOpen(false);
      setModifyPrompt('');
    }
  };

  const handleSaveClick = () => {
    onSave();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
      {/* Action Toolbar */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 mb-4">
          <button 
            onClick={handleSaveClick}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isSaved ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
          >
            {isSaved ? (
                <span>{t('itinerary.saved')}</span>
            ) : (
                <>
                    <BookmarkIcon className="h-4 w-4" />
                    {t('itinerary.save')}
                </>
            )}
          </button>
          <button 
            onClick={onRegenerate}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold transition-colors"
          >
            <ArrowPathIcon className="h-4 w-4" />
            {t('itinerary.regenerate')}
          </button>
          <button 
            onClick={() => setIsModifyModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-200 dark:hover:bg-cyan-800 rounded-lg text-sm font-semibold transition-colors"
          >
            <PencilSquareIcon className="h-4 w-4" />
            {t('itinerary.modify')}
          </button>
      </div>

      <div className="text-center mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{itinerary.trip_title}</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">{itinerary.overall_summary}</p>
        <div className="mt-4 flex justify-center items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-cyan-500" />
                <span>{itinerary.duration} {t('itinerary.days')}</span>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-cyan-500">¥</span>
                <span>{itinerary.budget} {t('itinerary.budget')}</span>
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
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">{t('detail.day', { day: plan.day })}</p>
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
                {t('itinerary.viewDetails')}
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
            {t('itinerary.viewFull')}
        </button>
      </div>

      {/* Modification Modal */}
      {isModifyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-cyan-500"/>
                {t('itinerary.modifyModalTitle')}
              </h3>
              <button 
                onClick={() => setIsModifyModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleModifySubmit} className="p-6">
              <label htmlFor="modification" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('itinerary.modifyModalLabel')}
              </label>
              <textarea
                id="modification"
                rows={4}
                className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:border-cyan-500 focus:ring-cyan-500 p-3"
                placeholder={t('itinerary.modifyModalPlaceholder')}
                value={modifyPrompt}
                onChange={(e) => setModifyPrompt(e.target.value)}
                required
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModifyModalOpen(false)}
                  className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  {t('itinerary.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-500/30"
                >
                  {t('itinerary.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ItineraryPage;