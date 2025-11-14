import React, { useState, useCallback } from 'react';
import { Page, UserPreferences, Itinerary, DayPlan, BookedServices, Service } from './types';
import { generateItinerary, generateServices } from './services/geminiService';
import HomePage from './components/HomePage';
import ItineraryPage from './components/ItineraryPage';
import DetailPage from './components/DetailPage';
import BookingPage from './components/BookingPage';
import FinalItineraryPage from './components/FinalItineraryPage';
import Header from './components/common/Header';
import LoadingSpinner from './components/common/LoadingSpinner';

const App: React.FC = () => {
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
        setLoadingMessage('正在为您量身定制行程...');
        setError(null);
        setCurrentPage(Page.Itinerary); 
        try {
            const result = await generateItinerary(preferences);
            setItinerary(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : '发生未知错误');
            setCurrentPage(Page.Home); 
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleSelectDay = (dayIndex: number) => {
        if (itinerary) {
            setSelectedDay(itinerary.daily_plans[dayIndex]);
            setCurrentPage(Page.Detail);
        }
    };

    const handleBookingRequest = useCallback(async () => {
        if (!itinerary) return;
        setIsLoading(true);
        setLoadingMessage('正在寻找可用的导游和车辆...');
        setError(null);
        setCurrentPage(Page.Booking);
        try {
            const services = await generateServices(itinerary.destination, itinerary.duration);
            setGuides(services.guides);
            setVehicles(services.vehicles);
        } catch (err) {
            setError(err instanceof Error ? err.message : '发生未知错误');
            setCurrentPage(Page.Detail);
        } finally {
            setIsLoading(false);
        }
    }, [itinerary]);

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
                    <p className="text-red-500 font-semibold">{error}</p>
                    <button onClick={handleReset} className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg">再试一次</button>
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
                    return <ItineraryPage itinerary={itinerary} onSelectDay={handleSelectDay} onFinalize={() => setCurrentPage(Page.Final)}/>;
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
            case Page.Home: return "让我们开始规划旅程";
            case Page.Itinerary: return "为您生成的行程";
            case Page.Detail: return `第 ${selectedDay?.day} 天详情`;
            case Page.Booking: return "预订服务";
            case Page.Final: return "您的最终行程单";
            default: return "AI 旅行规划师";
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