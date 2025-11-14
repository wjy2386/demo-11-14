import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, Itinerary, Service } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const hotelSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    rating: { type: Type.NUMBER, description: "酒店星级，1-5之间的数字" },
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
          date: { type: Type.STRING, description: "当天计划的日期，例如 '2023-10-26'。假设旅行从今天开始。" },
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                startTime: { type: Type.STRING, description: "活动开始时间，例如 '09:00'" },
                endTime: { type: Type.STRING, description: "活动结束时间，例如 '11:00'" },
                name: { type: Type.STRING, description: "活动或景点的名称。" },
                type: { type: Type.STRING, description: "活动类型，例如 '观光', '餐饮', '游览'。" },
                location: { type: Type.STRING, description: "活动的地址或位置。" },
                description: { type: Type.STRING, description: "活动的简要描述及其推荐理由。" },
                coordinates: {
                  type: Type.OBJECT,
                  description: "活动地点的地理坐标。",
                  properties: {
                    lat: { type: Type.NUMBER, description: "纬度" },
                    lng: { type: Type.NUMBER, description: "经度" },
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
                    type: { type: Type.STRING, enum: ['Guide'] },
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
                    type: { type: Type.STRING, enum: ['Vehicle'] },
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


export const generateItinerary = async (preferences: UserPreferences): Promise<Itinerary> => {
  const prompt = `
    作为一个专业的AI旅行规划师，请根据用户的偏好，用简体中文创建一个详细且个性化的旅行行程。
    请严格遵守提供的JSON schema格式进行回应，不要在JSON对象之外包含任何文字。

    用户偏好：
    - 目的地：${preferences.destination}
    - 时长：${preferences.days} 天
    - 预算：${preferences.budget}
    - 兴趣：${preferences.interests.join('， ')}

    你的任务是生成一个完整的行程对象，其中包含：
    1.  一个富有创意和吸引力的'trip_title'（旅行标题）和'overall_summary'（整体摘要）。
    2.  为指定的旅行天数制定一个'daily_plans'（每日计划）。
    3.  对于每一天，提供'date'（日期，假设旅行从今天开始），一个吸引人的'title'（标题），一个简短的'summary'（摘要），'lunch'（午餐）和'dinner'（晚餐）的建议，以及推荐的'transport'（交通方式）。
    4.  对于每一天的'activities'（活动），提供一个详细列表。每个活动必须包含：
        - 'startTime'（开始时间）和'endTime'（结束时间），例如 "09:00", "11:30"。
        - 'name'（活动或地点的清晰名称）。
        - 'type'（类型，例如 "观光", "美食", "文化", "探险"）。
        - 'location'（地址或地点）。
        - 'description'（一个引人注目的描述，解释该活动以及为什么它适合该用户）。
        - 'coordinates'（一个包含'lat'和'lng'的对象，表示该地点的精确地理坐标）。
    5.  对于每个 'daily_plan'，请包含一个 'hotelRecommendation'。如果行程只在一个城市，每天可以是同一家酒店。推荐内容需包括 'name'（名称）、'rating'（星级，1-5）、'pricePerNight'（每晚价格）和一个虚构的 'bookingLink'（预订链接）。
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
    throw new Error("生成行程失败，请重试。");
  }
};

export const generateServices = async (destination: string, days: number): Promise<{ guides: Service[], vehicles: Service[] }> => {
    const prompt = `
        为一次为期 ${days} 天，目的地为 ${destination} 的旅行，请用简体中文生成一个虚构的可用服务列表。
        - 提供3个具有不同专长（例如：历史、美食、探险）的本地导游。
        - 提供3个车辆租赁选项（例如：紧凑型轿车、SUV、摩托车）。
        对于每项服务，请提供名称、描述、每日价格以及一个来自 picsum.photos 的占位符图片URL。
        响应必须是符合所提供 schema 的有效JSON对象。图片URL请使用格式 https://picsum.photos/seed/{some_random_string}/400/300
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
        throw new Error("生成服务列表失败，请重试。");
    }
};