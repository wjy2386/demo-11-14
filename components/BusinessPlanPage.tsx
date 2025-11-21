import React from 'react';

interface BusinessPlanPageProps {
    onBack: () => void;
}

const BusinessPlanPage: React.FC<BusinessPlanPageProps> = ({ onBack }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">商业模式与战略蓝图</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400">AI 驱动的核心优势与多元化盈利生态</p>
            </div>

            {/* Central Node */}
            <div className="flex justify-center mb-12">
                <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center z-10 transform hover:scale-105 transition-transform duration-300">
                    <h1 className="text-3xl font-bold mb-2">AI 旅行规划平台</h1>
                    <p className="text-cyan-100">流量入口 & 智能决策核心</p>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-slate-300 dark:bg-slate-600"></div>
                </div>
            </div>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Connecting Lines for Desktop (Visual Decoration) */}
                <div className="hidden lg:block absolute top-[-2rem] left-[16%] right-[16%] h-8 border-t-4 border-l-4 border-r-4 border-slate-300 dark:border-slate-600 rounded-t-xl pointer-events-none"></div>

                {/* Pillar 1: Supply Chain Deep Dive */}
                <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-slate-300 dark:bg-slate-600 lg:hidden"></div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full border-t-4 border-green-500 hover:shadow-2xl transition-shadow">
                        <div className="flex items-center justify-center -mt-12 mb-4">
                            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full text-green-600 dark:text-green-300 font-bold text-xl border-4 border-white dark:border-slate-800">
                                核心资源管控
                            </div>
                        </div>
                        <ul className="space-y-4">
                            <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-green-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">签约持证导游</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">建立标准化服务体系，去中介化，提供高毛利、高品质的在地陪伴。</p>
                            </li>
                            <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-green-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">直签出行运力</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">与网约车运营公司及租车公司直签，确保合规运力，降低调度成本。</p>
                            </li>
                             <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-green-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">独家资源壁垒</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">独家签约稀缺景点、VIP缆车通道、特色酒店库存，打造产品护城河。</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pillar 2: High Frequency Services */}
                <div className="flex flex-col items-center">
                    <div className="w-1 h-8 bg-slate-300 dark:bg-slate-600 lg:hidden"></div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full border-t-4 border-amber-500 hover:shadow-2xl transition-shadow">
                        <div className="flex items-center justify-center -mt-12 mb-4">
                            <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full text-amber-600 dark:text-amber-300 font-bold text-xl border-4 border-white dark:border-slate-800">
                                增值服务收入
                            </div>
                        </div>
                        <ul className="space-y-4">
                            <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-amber-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">铁路购票手续费</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">嵌入行程规划的高频刚需入口，通过智能抢票和无忧出行服务获利。</p>
                            </li>
                            <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-amber-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">动态佣金引擎</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">基于AI推荐算法，精准匹配酒店、餐厅，获取优于OTA的渠道佣金。</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Pillar 3: Global Cross-Border */}
                <div className="flex flex-col items-center">
                     <div className="w-1 h-8 bg-slate-300 dark:bg-slate-600 lg:hidden"></div>
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg w-full border-t-4 border-purple-500 hover:shadow-2xl transition-shadow">
                        <div className="flex items-center justify-center -mt-12 mb-4">
                            <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full text-purple-600 dark:text-purple-300 font-bold text-xl border-4 border-white dark:border-slate-800">
                                全球双向战略
                            </div>
                        </div>
                        <ul className="space-y-4">
                            <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-purple-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">境外资源·境内推广 (B2B/2C)</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">整合海外优质供应链，为国内B端旅行社供货或直接触达C端用户。</p>
                            </li>
                             <li className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-purple-400">
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">入境游一站式解决方案</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">解决外国游客在华支付、交通、语言痛点。One-stop app for Inbound China Travel.</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 text-center">
                <button
                    onClick={onBack}
                    className="px-8 py-3 text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                    返回首页
                </button>
            </div>
        </div>
    );
};

export default BusinessPlanPage;