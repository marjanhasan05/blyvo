
import React from 'react';
import { CheckCircle, MoreHorizontal, Calendar, Users, MessageCircle, Zap, ChevronRight } from 'lucide-react';

const AgentProfileCard: React.FC = () => {
    const integrations = [
        {
            id: 1,
            name: 'Google Calendar',
            icon: Calendar,
            description: 'Syncs appointments',
            status: 'Active' as const,
            color: 'text-blue-500',
        },
        {
            id: 2,
            name: 'HubSpot CRM',
            icon: Users,
            description: 'Lead capture',
            status: 'Active' as const,
            color: 'text-orange-500',
        },
        {
            id: 3,
            name: 'WhatsApp',
            icon: MessageCircle,
            description: 'Follow-up messages',
            status: 'Active' as const,
            color: 'text-green-500',
        },
        {
            id: 4,
            name: 'Zapier',
            icon: Zap,
            description: 'Workflow automation',
            status: 'Setup' as const,
            color: 'text-orange-600',
        },
    ];

    return (
        <div className="w-full bg-linear-to-b rounded-3xl overflow-hidden    shadow-2xl backdrop-blur-xl -top-24 z-10 relative" style={{
            background: 'rgba(157, 157, 157, .25)',

            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
        }}>


 

            {/* Header */}
            <div className="px-6 pt-6 pb-4  "  >
                <div className="flex items-center gap-2 mb-8">
                    <CheckCircle className="w-5 h-5 text-[#37D906]" />
                    <span className="text-[#37D906] font-medium text-sm">Active agent</span>
                </div>

                <h1 className="text-4xl font-semibold text-white mt-4 mb-2">Maria</h1>
                <p className="text-white italic  font-light text-lg">Professional & Approachable</p>
            </div>

            {/* Abilities & Stats */}
            <div className="px-6 py-6  ">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="text-xs uppercase tracking-[0.4em] text-[#9E9E9E] mb-1">ABILITIES</div>
                        <div className="text-white font-medium">Books Appointments</div>
                    </div>

                    <div className="text-right">
                        <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">CALLS TODAY</div>
                        <div className="text-4xl font-semibold text-white">24</div>
                    </div>
                </div>

                {/* Languages */}
                <div className="mt-6">
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">LANGUAGES</div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-[#9E9E9E] text-black text-sm rounded-sm font-medium">EN</span>
                        <span className="px-3 py-1 bg-[#9E9E9E] text-black text-sm rounded-sm font-medium">ES</span>
                    </div>
                </div>
            </div>

            {/* Integrations Section */}
            <div className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                    <div className='mb-4'>
                        <span className="text-white text-2xl  font-medium">Integrations</span>
                        <span className="text-slate-500 text-sm ml-1.5">4</span>
                    </div>
                    <a href="#" className="text-[#9E9E9E] hover:text-emerald-400 text-sm font-medium flex items-center gap-1">
                        Manage <span className="text-xs"><ChevronRight /></span>
                    </a>
                </div>

                {/* Integration Logos */}
                <div className="flex gap-4 mb-8">
                    <div className="w-15 h-15 bg-white rounded-full flex items-center justify-center shadow-md">
                        <img src="/public/agent-icon/1.svg" alt="Google Calendar" className="w-6 h-6" />
                    </div>
                    <div className="w-15 h-15 bg-orange-500 rounded-full flex items-center justify-center shadow-md -translate-x-8">
                        <img src="/public/agent-icon/2.svg" alt="" />
                    </div>
                    <div className="w-15 h-15 bg-green-500 rounded-full flex items-center justify-center shadow-md -translate-x-16">
                       <img src="/public/agent-icon/3.svg" alt="" />
                    </div>
                    <div className="w-15 h-15  bg-orange-600 rounded-full flex items-center justify-center shadow-md -translate-x-24">
                       <img src="/public/agent-icon/4.svg" alt="" />
                    </div>
                </div>

                {/* Enable Multilingual Mode */}
                <div className="mb-6">
                     
                        <span className="text-white text-xl font-medium">Enable Multilingual Mode</span>
                    
                </div>

                {/* Integration List */}
                <div className="space-y-3 bg-[#2F2F2F] rounded-4xl p-5">
                    {integrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="flex items-center justify-between bg-[#3B3B3B] transition-colors rounded-2xl px-2 py-3 border border-slate-800 group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-15 h-15 rounded-xl flex items-center justify-center `}>
                                   <img src="/public/agent-icon/1.svg" alt="" />
                                </div>
                                <div>
                                    <div className="font-medium text-[16px] text-white">{integration.name}</div>
                                    <div className="text-[#9E9E9E] text-[14px]">{integration.description}</div>
                                </div>
                            </div>

                            <div className="flex items-center ">
                                <span
                                    className={`text-sm font-medium px-3 py-1 rounded-full ${integration.status === 'Active'
                                        ? ' text-emerald-500'
                                        : ' text-amber-500'
                                        }`}
                                >
                                    {integration.status}
                                </span>
                                <button className="text-slate-400 hover:text-slate-300 transform rotate-90 transition-opacity">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default AgentProfileCard;