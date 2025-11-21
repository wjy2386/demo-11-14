import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, Itinerary, Service } from '../types';
import { Language, translations } from '../utils/translations';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const hotelSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    rating: { type: Type.NUMBER, description: "Hotel rating, number between 1-5" },
    pricePerNight: { type: Type.NUMBER },
    bookingLink: { type: Type.STRING },
  },
  required: ['name', 'rating', 'pricePerNight', 'bookingLink'],
};

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING },
    duration: { type: Type.INTEGER },
    budget: { type: Type.STRING },
    trip_title: { type: Type.STRING },
    overall_summary: { type: Type.STRING },
    daily_plans: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          date: { type: Type.STRING, description: "Date of the plan, e.g., '2023-10-26'. Assume trip starts today." },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                startTime: { type: Type.STRING, description: "Start time, e.g., '09:00'" },
                endTime: { type: Type.STRING, description: "End time, e.g., '11:00'" },
                name: { type: Type.STRING, description: "Name of the activity or attraction." },
                type: { type: Type.STRING, description: "Type of activity, e.g., 'Sightseeing', 'Dining'." },
                location: { type: Type.STRING, description: "Address or location." },
                description: { type: Type.STRING, description: "Brief description and why it's recommended." },
                coordinates: {
                  type: Type.OBJECT,
                  description: "Geographic coordinates.",
                  properties: {
                    lat: { type: Type.NUMBER, description: "Latitude" },
                    lng: { type: Type.NUMBER, description: "Longitude" },
                  },
                  required: ['lat', 'lng'],
                }
              },
              required: ['startTime', 'endTime', 'name', 'type', 'location', 'description', 'coordinates'],
            },
          },
          dining: {
            type: Type.OBJECT,
            properties: {
              lunch: { type: Type.STRING },
              dinner: { type: Type.STRING },
            },
            required: ['lunch', 'dinner'],
          },
          transport: { type: Type.STRING },
          hotelRecommendation: hotelSchema,
        },
        required: ['day', 'date', 'title', 'summary', 'activities', 'dining', 'transport', 'hotelRecommendation'],
      },
    },
  },
  required: ['destination', 'duration', 'budget', 'trip_title', 'overall_summary', 'daily_plans'],
};

const servicesSchema = {
    type: Type.OBJECT,
    properties: {
        guides: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING, description: "Must be 'Guide'" },
                    description: { type: Type.STRING },
                    pricePerDay: { type: Type.NUMBER },
                    imageUrl: { type: Type.STRING }
                },
                required: ['id', 'name', 'type', 'description', 'pricePerDay', 'imageUrl']
            }
        },
        vehicles: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    type: { type: Type.STRING, description: "Must be 'Vehicle'" },
                    description: { type: Type.STRING },
                    pricePerDay: { type: Type.NUMBER },
                    imageUrl: { type: Type.STRING }
                },
                required: ['id', 'name', 'type', 'description', 'pricePerDay', 'imageUrl']
            }
        }
    },
    required: ['guides', 'vehicles']
};

// Helper to translate keys to target language strings for the prompt
const getTranslation = (lang: Language, category: 'budgetOptions' | 'interestOptions', key: string): string => {
    // @ts-ignore
    return translations[lang].home[category][key] || key;
};

export const generateItinerary = async (preferences: UserPreferences, language: Language): Promise<Itinerary> => {
  const budgetLabel = getTranslation(language, 'budgetOptions', preferences.budget);
  const interestLabels = preferences.interests.map(i => getTranslation(language, 'interestOptions', i)).join(', ');
  const langName = language === 'zh' ? 'Simplified Chinese (简体中文)' : 'English';

  const prompt = `
    As a professional AI Travel Planner, please create a detailed and personalized travel itinerary in ${langName} based on the user preferences below.
    Your response must strictly adhere to the provided JSON schema. Do not include any text outside the JSON object.

    User Preferences:
    - Destination: ${preferences.destination}
    - Duration: ${preferences.days} days
    - Budget: ${budgetLabel}
    - Interests: ${interestLabels}

    Please ensure:
    - Provide accurate dates for each day, assuming the trip starts today.
    - Activity 'coordinates' must be accurate real-world coordinates.
    - 'bookingLink' in hotel recommendation can be a fictional URL.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as Itinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary.");
  }
};

export const modifyItinerary = async (currentItinerary: Itinerary, instruction: string, language: Language): Promise<Itinerary> => {
    const langName = language === 'zh' ? 'Simplified Chinese (简体中文)' : 'English';
    
    const prompt = `
      As a professional AI Travel Planner, please modify the existing travel itinerary based on the user's instruction.
      
      Current Itinerary Data (JSON):
      ${JSON.stringify(currentItinerary)}

      User Instruction:
      "${instruction}"

      Please return the modified full itinerary in ${langName}.
      Maintain the same JSON structure.
      Ensure dates and coordinates remain accurate.
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: itinerarySchema,
        },
      });
  
      const jsonText = response.text.trim();
      return JSON.parse(jsonText) as Itinerary;
    } catch (error) {
      console.error("Error modifying itinerary:", error);
      throw new Error("Failed to modify itinerary.");
    }
  };

export const generateServices = async (destination: string, days: number, language: Language): Promise<{ guides: Service[], vehicles: Service[] }> => {
    const langName = language === 'zh' ? 'Simplified Chinese (简体中文)' : 'English';
    
    const prompt = `
        For a ${days}-day trip to ${destination}, please generate a list of fictional available services in ${langName}.
        Strictly follow the provided JSON schema.

        Please provide:
        - 3 Local Guides with different specialties (e.g., History, Food, Adventure).
        - 3 Vehicle Rental options.
        
        For each service, use "https://picsum.photos/seed/{some_random_string}/400/300" for the imageUrl.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: servicesSchema,
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as { guides: Service[], vehicles: Service[] };
    } catch (error) {
        console.error("Error generating services:", error);
        throw new Error("Failed to generate services.");
    }
};