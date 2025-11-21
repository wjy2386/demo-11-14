import React, { useState, useCallback } from 'react';
import { Page, UserPreferences, Itinerary, DayPlan, BookedServices, Service } from './types';
import { generateItinerary, generateServices, modifyItinerary } from './services/geminiService';
import HomePage from './components/HomePage';
import ItineraryPage from './components/ItineraryPage';
import DetailPage from './components/DetailPage';
import BookingPage from './components/BookingPage';
import FinalItineraryPage from './components/FinalItineraryPage';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
    const { t, language } = useLanguage();
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
    const [itinerary, setItinerary] = useState<Itinerary | null>(null);
    const [selectedDay, setSelectedDay] = useState<DayPlan | null>(null);
    const [guides, setGuides] = useState<Service[]>([]);
    const [vehicles, setVehicles] = useState<Service[]>([]);
    const [bookedServices, setBookedServices] = useState<BookedServices>({});
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleReset = () => {
        setCurrentPage(Page.Home);
        setUserPreferences(null);
        setItinerary(null);
        setSelectedDay(null);
        setBookedServices({});
        setGuides([]);
        setVehicles([]);
        setIsLoading(false);
        setError(null);
    };

    const handleItineraryRequest = useCallback(async (preferences: UserPreferences) => {
        setUserPreferences(preferences);
        setIsLoading(true);
        setLoadingMessage(t('loading.generating'));
        setError(null);
        setCurrentPage(Page.Itinerary); 
        try {
            const result = await generateItinerary(preferences, language);
            setItinerary(result);
        } catch (err) {
            setError(t('error.generate'));
            setCurrentPage(Page.Home); 
        } finally {
            setIsLoading(false);
        }
    }, [language, t]);

    const handleRegenerateItinerary = useCallback(async () => {
        if (!userPreferences) return;
        setIsLoading(true);
        setLoadingMessage(t('loading.regenerating'));
        setError(null);
        try {
            const result = await generateItinerary(userPreferences, language);
            setItinerary(result);
        } catch (err) {
            setError(t('error.generate'));
        } finally {
            setIsLoading(false);
        }
    }, [userPreferences, language, t]);

    const handleModifyItinerary = useCallback(async (instruction: string) => {
        if (!itinerary) return;
        setIsLoading(true);
        setLoadingMessage(t('loading.modifying'));
        setError(null);
        try {
            const result = await modifyItinerary(itinerary, instruction, language);
            setItinerary(result);
        } catch (err) {
            setError(t('error.modify'));
        } finally {
            setIsLoading(false);
        }
    }, [itinerary, language, t]);

    const handleSaveItinerary = () => {
        if (!itinerary) return;
        // In a real app, this might save to a backend.
        // Here we just save to local storage as a demo.
        try {
            localStorage.setItem('savedItinerary', JSON.stringify(itinerary));
            console.log("Itinerary saved to local storage");
        } catch (e) {
            console.error("Failed to save to local storage", e);
        }
    };

    const handleSelectDay = (dayIndex: number) => {
        if (itinerary) {
            setSelectedDay(itinerary.daily_plans[dayIndex]);
            setCurrentPage(Page.Detail);
        }
    };

    const handleBookingRequest = useCallback(async () => {
        if (!itinerary) return;
        setIsLoading(true);
        setLoadingMessage(t('loading.searching'));
        setError(null);
        setCurrentPage(Page.Booking);
        try {
            const services = await generateServices(itinerary.destination, itinerary.duration, language);
            setGuides(services.guides);
            setVehicles(services.vehicles);
        } catch (err) {
            setError(t('error.services'));
            setCurrentPage(Page.Detail);
        } finally {
            setIsLoading(false);
        }
    }, [itinerary, language, t]);

    const handleBookService = (service: Service) => {
        setBookedServices(prev => {
            if (service.type === 'Guide') {
                return { ...prev, guide: service };
            }
            if (service.type === 'Vehicle') {
                return { ...prev, vehicle: service };
            }
            return prev;
        });
    };

    const renderPage = () => {
        if (error) {
            return (
                <div className="text-center p-8">
                    <p className="text-red-500 font-semibold mb-4">{error}</p>
                    <button 
                        onClick={() => { setError(null); setIsLoading(false); }} 
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
                    >
                        {t('error.back')}
                    </button>
                </div>
            );
        }

        if (isLoading) {
            return <LoadingSpinner message={loadingMessage} />;
        }

        switch (currentPage) {
            case Page.Home:
                return <HomePage onSubmit={handleItineraryRequest} />;
            case Page.Itinerary:
                if (itinerary) {
                    return (
                        <ItineraryPage 
                            itinerary={itinerary} 
                            onSelectDay={handleSelectDay} 
                            onFinalize={() => setCurrentPage(Page.Final)}
                            onRegenerate={handleRegenerateItinerary}
                            onModify={handleModifyItinerary}
                            onSave={handleSaveItinerary}
                        />
                    );
                }
                break;
            case Page.Detail:
                if (selectedDay) {
                    return <DetailPage dayPlan={selectedDay} onBack={() => setCurrentPage(Page.Itinerary)} onBookServices={handleBookingRequest} />;
                }
                break;
            case Page.Booking:
                return <BookingPage 
                    guides={guides} 
                    vehicles={vehicles} 
                    bookedServices={bookedServices} 
                    isLoading={isLoading} 
                    onBookService={handleBookService}
                    onFinalize={() => setCurrentPage(Page.Final)} 
                />;
            case Page.Final:
                if (itinerary) {
                    return <FinalItineraryPage itinerary={itinerary} bookedServices={bookedServices} onStartOver={handleReset} />;
                }
                break;
        }
        // Fallback to home if state is inconsistent
        return <HomePage onSubmit={handleItineraryRequest} />;
    };
    
    const getHeaderTitle = () => {
        switch (currentPage) {
            case Page.Home: return t('appTitle'); // This case might not be hit if Header is hidden on Home, but logic exists
            case Page.Itinerary: return t('itinerary.viewDetails').replace('查看详情', '为您生成的行程'); // Hacky fallbacks or strict keys? Let's use better keys or direct translations if I had them.
            // Better approach: use keys I defined in translation file
            // But '为您生成的行程' is not in translations exactly under 'itinerary'.
            // Let's look at translations.ts content I created.
            // It has 'appTitle', 'home.title'.
            // It doesn't have breadcrumb titles. I'll add logic to t() or just map manually using t() for parts.
            // For now to match the exact strings from previous version but translated:
            case Page.Itinerary: return language === 'zh' ? "为您生成的行程" : "Your Itinerary";
            case Page.Detail: return t('detail.day', { day: selectedDay?.day || 0 }) + " " + (language === 'zh' ? "详情" : "Details");
            case Page.Booking: return t('booking.title');
            case Page.Final: return t('final.title', { destination: itinerary?.destination || '' });
            default: return t('appTitle');
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {currentPage !== Page.Home && <Header title={getHeaderTitle()} onHomeClick={handleReset}/>}
            <div className="transition-opacity duration-500 ease-in-out">
                {renderPage()}
            </div>
        </main>
    );
};

export default App;