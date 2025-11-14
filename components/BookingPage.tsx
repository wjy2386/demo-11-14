import React from 'react';
import { Service, BookedServices } from '../types';
import LoadingSpinner from './common/LoadingSpinner';
import { CheckCircleIcon } from './common/icons';

interface BookingPageProps {
  guides: Service[];
  vehicles: Service[];
  bookedServices: BookedServices;
  isLoading: boolean;
  onBookService: (service: Service) => void;
  onFinalize: () => void;
}

const ServiceCard: React.FC<{ service: Service; isBooked: boolean; onBook: (service: Service) => void; }> = ({ service, isBooked, onBook }) => {
    return (
        <div className={`rounded-lg shadow-lg overflow-hidden bg-white dark:bg-slate-800 border-2 ${isBooked ? 'border-cyan-500' : 'border-transparent'}`}>
            <img src={service.imageUrl} alt={service.name} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{service.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{service.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-semibold text-cyan-600 dark:text-cyan-400">¥{service.pricePerDay}<span className="text-sm font-normal text-slate-500 dark:text-slate-400">/天</span></p>
                    <button
                        onClick={() => onBook(service)}
                        disabled={isBooked}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            isBooked 
                            ? 'bg-green-500 text-white cursor-not-allowed flex items-center gap-2' 
                            : 'bg-cyan-500 text-white hover:bg-cyan-600'
                        }`}
                    >
                        {isBooked ? <><CheckCircleIcon className="h-4 w-4"/> 已预订</> : '立即预订'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const BookingPage: React.FC<BookingPageProps> = ({ guides, vehicles, bookedServices, isLoading, onBookService, onFinalize }) => {
  if (isLoading) {
    return <LoadingSpinner message="正在寻找最佳的本地导游和车辆..." />;
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">升级您的旅程</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">预订当地导游或车辆，享受难忘的体验。</p>
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">当地导游</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map(guide => (
              <ServiceCard key={guide.id} service={guide} isBooked={bookedServices.guide?.id === guide.id} onBook={onBookService} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">车辆租赁</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map(vehicle => (
              <ServiceCard key={vehicle.id} service={vehicle} isBooked={bookedServices.vehicle?.id === vehicle.id} onBook={onBookService} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <button
          onClick={onFinalize}
          className="px-12 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
        >
          完成我的旅行计划
        </button>
      </div>
    </div>
  );
};

export default BookingPage;