import React from 'react';

const CallBreakdown: React.FC = () => {
    return (
        <div className="relative w-full rounded-[24px] overflow-hidden  bg-white/10 p-8   border border-white/5 shadow-2xl px-14 min-h-[400px]">




            {/* Glowing Background Shape for the Chart */}
            <div
                className="absolute top-1/2 left-[20%] -translate-y-1/2 pointer-events-none z-0"
                style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '279px',
                    background: '#152440',
                    filter: 'blur(97px)'
                }}
            />

            {/* Main Content Container */}
            <div className="relative z-20 flex flex-col h-full w-full">

                {/* Header Section */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <h2 className="text-[24px] font-medium text-white/90 tracking-wide">Call breakdown</h2>
                    <button className="px-5 py-1.5 bg-[#252528] hover:bg-[#303033] transition-colors rounded-[12px] text-[13px] font-medium text-white border border-white/5">
                        This week
                    </button>
                </div>

                {/* Body Section */}
                <div className="flex flex-col md:flex-row items-center pt-8 gap-12 w-full justify-between ">

                    {/* SVG Chart & Center Text */}
                    <div className="relative flex items-center justify-center   ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="234" height="241" viewBox="0 0 234 241" fill="none" className="relative z-10 w-[260px] h-[260px]">
                            <path className="drop-shadow-lg" d="M233.063 120.062C233.063 182.471 182.471 233.062 120.063 233.062C57.6544 233.062 7.06262 182.471 7.06262 120.062C7.06262 57.6543 57.6544 7.0625 120.063 7.0625C182.471 7.0625 233.063 57.6543 233.063 120.062ZM26.5208 120.062C26.5208 171.724 68.4009 213.604 120.063 213.604C171.724 213.604 213.604 171.724 213.604 120.062C213.604 68.4008 171.724 26.5206 120.063 26.5206C68.4009 26.5206 26.5208 68.4008 26.5208 120.062Z" fill="#A855F7" />
                            <g filter="url(#filter0_d_1682_7314)">
                                <path className="drop-shadow-lg" d="M217.976 152.215C223.193 153.928 226.074 159.568 223.909 164.615C218.152 178.034 209.836 190.24 199.393 200.534C186.584 213.161 170.946 222.548 153.779 227.915C136.612 233.282 118.412 234.473 100.692 231.39C86.2451 228.876 72.4574 223.58 60.0827 215.83C55.4287 212.915 54.5841 206.638 57.8966 202.258C61.2091 197.878 67.4218 197.065 72.1297 199.891C81.9383 205.781 92.7737 209.827 104.101 211.798C118.703 214.339 133.7 213.357 147.846 208.935C161.992 204.513 174.877 196.778 185.432 186.373C193.62 178.301 200.221 168.803 204.929 158.376C207.188 153.371 212.758 150.501 217.976 152.215Z" fill="#FB923C" />
                            </g>
                            <g filter="url(#filter1_d_1682_7314)">
                                <path className="drop-shadow-lg" d="M71.6489 211.114C69.0877 215.93 63.0782 217.794 58.5034 214.823C44.3768 205.646 32.4438 193.401 23.6212 178.953C14.7987 164.504 9.35728 148.296 7.6467 131.537C7.09275 126.11 11.4961 121.616 16.9509 121.538C22.4057 121.46 26.837 125.832 27.4913 131.247C29.0884 144.466 33.5033 157.229 40.4818 168.657C47.4604 180.086 56.7973 189.843 67.8263 197.302C72.3452 200.358 74.21 206.297 71.6489 211.114Z" fill="#5BEA7C" />
                            </g>
                            <g filter="url(#filter2_d_1682_7314)">
                                <path className="drop-shadow-lg" d="M18.0755 137.034C12.8399 137.906 7.846 134.367 7.42256 129.076C5.69073 107.437 10.226 85.6818 20.5888 66.4532C30.9516 47.2247 46.6295 31.4741 65.6556 21.0226C70.3076 18.4671 76.0094 20.6924 78.1605 25.5446C80.3117 30.3969 78.091 36.0321 73.4842 38.6683C58.3368 47.3364 45.8487 60.097 37.5088 75.5719C29.169 91.0469 25.3771 108.494 26.4659 125.912C26.7971 131.21 23.3112 136.163 18.0755 137.034Z" fill="#2DD4BF" />
                            </g>
                            <g filter="url(#filter3_d_1682_7314)">
                                <path className="drop-shadow-lg" d="M64.3682 33.0299C61.4888 28.5303 62.7857 22.5079 67.515 20.0237C81.9383 12.4475 97.8658 8.06153 114.212 7.21406C130.558 6.36659 146.854 9.08197 161.983 15.126C166.944 17.1078 168.857 22.9638 166.458 27.737C164.06 32.5102 158.259 34.3838 153.264 32.4901C141.163 27.9023 128.207 25.8596 115.214 26.5333C102.22 27.207 89.5453 30.5784 77.9837 36.3929C73.2112 38.7931 67.2476 37.5294 64.3682 33.0299Z" fill="#F472B6" />
                            </g>
                            <defs>
                                <filter id="filter0_d_1682_7314" x="48.8319" y="144.654" width="182.866" height="95.4706" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.53125" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1682_7314" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1682_7314" result="shape" />
                                </filter>
                                <filter id="filter1_d_1682_7314" x="0.537109" y="114.474" width="79.333" height="108.841" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.53125" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1682_7314" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1682_7314" result="shape" />
                                </filter>
                                <filter id="filter2_d_1682_7314" x="0" y="12.8903" width="86.0492" height="131.338" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.53125" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1682_7314" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1682_7314" result="shape" />
                                </filter>
                                <filter id="filter3_d_1682_7314" x="55.7848" y="0" width="118.766" height="44.6501" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                    <feOffset />
                                    <feGaussianBlur stdDeviation="3.53125" />
                                    <feComposite in2="hardAlpha" operator="out" />
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1682_7314" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1682_7314" result="shape" />
                                </filter>
                            </defs>
                        </svg>

                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-[15px] text-white/50 mb-1">Total</span>
                            <div className="flex  gap-1">
                                <span className="text-[44px] font-bold text-white leading-none">186</span>
                                <span className="text-[12px] text-white/50 mb-1">calls</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="relative z-10 w-full max-w-[400px] mb-8 ">
                        <div className="grid grid-cols-2 gap-y-6 gap-x-8">

                            <div className="flex items-center justify-between gap-6 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-[16px] bg-[#5BEA7C] rounded-full group-hover:shadow-[0_0_8px_#5BEA7C] transition-shadow"></div>
                                    <span className="text-[15px] text-[#A0A0A0]">Lead Qual</span>
                                </div>
                                <span className="text-[16px] font-bold text-white">35%</span>
                            </div>

                            <div className="flex items-center justify-between gap-6 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-[16px] bg-[#A855F7] rounded-full group-hover:shadow-[0_0_8px_#A855F7] transition-shadow"></div>
                                    <span className="text-[15px] text-[#A0A0A0]">Booking</span>
                                </div>
                                <span className="text-[16px] font-bold text-white">35%</span>
                            </div>
                            <div className="flex items-center justify-between gap-6 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-[16px] bg-[#2DD4BF] rounded-full group-hover:shadow-[0_0_8px_#2DD4BF] transition-shadow"></div>
                                    <span className="text-[15px] text-[#A0A0A0]">Support</span>
                                </div>
                                <span className="text-[16px] font-bold text-white">35%</span>
                            </div>

                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-[16px] bg-[#FB923C] rounded-full group-hover:shadow-[0_0_8px_#FB923C] transition-shadow"></div>
                                    <span className="text-[15px] text-[#A0A0A0]">Inquiries</span>
                                </div>
                                <span className="text-[16px] font-bold text-white">35%</span>
                            </div>

                            <div className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-[3px] h-[16px] bg-[#F472B6] rounded-full group-hover:shadow-[0_0_8px_#F472B6] transition-shadow"></div>
                                    <span className="text-[15px] text-[#A0A0A0]">Other</span>
                                </div>
                                <span className="text-[16px] font-bold text-white">35%</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallBreakdown;
