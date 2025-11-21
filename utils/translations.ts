
export type Language = 'zh' | 'en';

export const translations = {
    zh: {
        appTitle: "AI 旅行规划师",
        home: {
            title: "定制您的完美旅程",
            subtitle: "告诉我们您的旅行梦想，我们将为您打造行程。",
            destination: "目的地",
            destinationPlaceholder: "例如：法国巴黎",
            days: "旅行天数",
            budget: "预算",
            budgetOptions: {
                economy: "经济",
                comfort: "舒适",
                luxury: "奢华"
            },
            interests: "兴趣",
            interestOptions: {
                history: "历史",
                art_culture: "艺术与文化",
                food: "美食家",
                adventure: "探险",
                nature: "自然",
                relaxation: "放松",
                nightlife: "夜生活",
                shopping: "购物"
            },
            generateButton: "生成我的行程",
            alertMissing: "请填写所有字段并至少选择一个兴趣。"
        },
        itinerary: {
            save: "保存行程",
            saved: "已保存!",
            regenerate: "重新生成",
            modify: "AI 修改",
            days: "天",
            budget: "预算",
            viewDetails: "查看详情",
            viewFull: "查看完整行程（不预订服务）",
            modifyModalTitle: "AI 智能修改",
            modifyModalLabel: "您希望如何调整这个行程？",
            modifyModalPlaceholder: "例如：把行程改得轻松一点，或者我想在第二天晚上去吃一顿米其林大餐...",
            cancel: "取消",
            submit: "提交修改"
        },
        detail: {
            day: "第 {day} 天",
            activities: "活动安排",
            map: "地图视图",
            dining: "餐饮推荐",
            lunch: "午餐",
            dinner: "晚餐",
            accommodation: "住宿推荐",
            perNight: "/ 晚",
            bookHotel: "立即预订",
            noHotel: "暂无酒店推荐。",
            transport: "交通方式",
            back: "返回行程概览",
            bookServices: "预订导游 / 车辆",
            mapNoLocation: "当地活动没有可在地图上显示的位置。"
        },
        booking: {
            title: "升级您的旅程",
            subtitle: "预订当地导游或车辆，享受难忘的体验。",
            guides: "当地导游",
            vehicles: "车辆租赁",
            bookNow: "立即预订",
            booked: "已预订",
            perDay: "/天",
            finalize: "完成我的旅行计划"
        },
        final: {
            title: "您的 {destination} 之旅已规划完毕！",
            subtitle: "这是您的完整行程单。祝您旅途愉快！",
            day: "第 {day} 天",
            bookedServices: "已预订服务",
            guide: "导游",
            vehicle: "车辆",
            totalCost: "服务总费用",
            ready: "准备出发！",
            startOver: "计划下一次旅行",
            noServices: "未预订任何服务。"
        },
        loading: {
            generating: "正在为您量身定制行程...",
            regenerating: "正在重新生成您的行程...",
            modifying: "AI 正在根据您的意见调整行程...",
            searching: "正在寻找可用的导游和车辆..."
        },
        error: {
            generate: "生成行程失败，请重试。",
            modify: "修改行程失败，请重试。",
            services: "生成服务列表失败，请重试。",
            unknown: "发生未知错误",
            back: "返回"
        },
        common: {
            wait: "请稍候..."
        }
    },
    en: {
        appTitle: "AI Travel Planner",
        home: {
            title: "Plan Your Perfect Trip",
            subtitle: "Tell us your travel dreams, and we'll build the itinerary.",
            destination: "Destination",
            destinationPlaceholder: "e.g. Paris, France",
            days: "Duration (Days)",
            budget: "Budget",
            budgetOptions: {
                economy: "Economy",
                comfort: "Comfort",
                luxury: "Luxury"
            },
            interests: "Interests",
            interestOptions: {
                history: "History",
                art_culture: "Art & Culture",
                food: "Foodie",
                adventure: "Adventure",
                nature: "Nature",
                relaxation: "Relaxation",
                nightlife: "Nightlife",
                shopping: "Shopping"
            },
            generateButton: "Generate My Itinerary",
            alertMissing: "Please fill in all fields and select at least one interest."
        },
        itinerary: {
            save: "Save",
            saved: "Saved!",
            regenerate: "Regenerate",
            modify: "AI Modify",
            days: "Days",
            budget: "Budget",
            viewDetails: "View Details",
            viewFull: "View Full Itinerary (No Booking)",
            modifyModalTitle: "AI Smart Modification",
            modifyModalLabel: "How would you like to adjust this itinerary?",
            modifyModalPlaceholder: "e.g. Make the schedule more relaxed, or I want a Michelin star dinner on day 2...",
            cancel: "Cancel",
            submit: "Submit"
        },
        detail: {
            day: "Day {day}",
            activities: "Activities",
            map: "Map View",
            dining: "Dining",
            lunch: "Lunch",
            dinner: "Dinner",
            accommodation: "Accommodation",
            perNight: "/ night",
            bookHotel: "Book Now",
            noHotel: "No hotel recommendation.",
            transport: "Transport",
            back: "Back to Overview",
            bookServices: "Book Guides / Vehicles",
            mapNoLocation: "No location data available for map display."
        },
        booking: {
            title: "Upgrade Your Trip",
            subtitle: "Book local guides or vehicles for an unforgettable experience.",
            guides: "Local Guides",
            vehicles: "Vehicle Rentals",
            bookNow: "Book Now",
            booked: "Booked",
            perDay: "/day",
            finalize: "Finalize My Trip"
        },
        final: {
            title: "Your trip to {destination} is ready!",
            subtitle: "Here is your complete itinerary. Have a safe trip!",
            day: "Day {day}",
            bookedServices: "Booked Services",
            guide: "Guide",
            vehicle: "Vehicle",
            totalCost: "Total Service Cost",
            ready: "Ready to Go!",
            startOver: "Plan Another Trip",
            noServices: "No services booked."
        },
        loading: {
            generating: "Tailoring your itinerary...",
            regenerating: "Regenerating your itinerary...",
            modifying: "AI is adjusting the itinerary based on your feedback...",
            searching: "Searching for best local guides and vehicles..."
        },
        error: {
            generate: "Failed to generate itinerary. Please try again.",
            modify: "Failed to modify itinerary. Please try again.",
            services: "Failed to generate services list. Please try again.",
            unknown: "Unknown error occurred",
            back: "Back"
        },
        common: {
            wait: "Please wait..."
        }
    }
};