
export enum Page {
  Home,
  Itinerary,
  Detail,
  Booking,
  Final,
}

export interface UserPreferences {
  destination: string;
  days: number;
  budget: string;
  interests: string[];
}

export interface Activity {
  startTime: string;
  endTime: string;
  name: string;
  type: string;
  location: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  bookingLink: string;
}

export interface DayPlan {
  day: number;
  date: string;
  title: string;
  summary: string;
  activities: Activity[];
  dining: {
    lunch: string;
    dinner: string;
  };
  transport: string;
  hotelRecommendation: Hotel;
}

export interface Itinerary {
  destination: string;
  duration: number;
  budget: string;
  trip_title: string;
  overall_summary: string;
  daily_plans: DayPlan[];
}

export interface Service {
  id: string;
  name: string;
  type: 'Guide' | 'Vehicle';
  description: string;
  pricePerDay: number;
  imageUrl: string;
}

export interface BookedServices {
  guide?: Service;
  vehicle?: Service;
}
