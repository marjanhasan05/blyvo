import { FC } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Agent {
  name: string;
  languages: string[];
  subtitle?: string;
}

const agents: Agent[] = [
  { name: "Maria", languages: ["EN", "ES"] },
  { name: "Arjun", languages: ["EN", "HI"] },
  { name: "Sarah", languages: ["EN", "FR"] },
  { name: "Khalid", languages: ["EN", "AR"], subtitle: "Graceful & Precise" },
];

const AgentsSection: FC = () => {
  return (
    <div
      className="  p-8 rounded-4xl w-full  relative overflow-hidden shadow-2xl"
      style={{
        background: "rgba(157, 157, 157, 0.10)",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-20 px-1">
        <h2 className="text-[22px] font-medium text-white tracking-wide">
          My agents{" "}
          <sup className="text-sm text-gray-400 font-normal ml-0.5">4</sup>
        </h2>

        <Link
          to={"/create-agent"}
          className="group relative flex items-center bg-white text-black pl-5 pr-1.5 py-1.5 rounded-full hover:bg-gray-50 transition duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          <span className="text-[15px] font-semibold mr-3">Add</span>
          <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-[-2px_0_8px_rgba(0,0,0,0.1)] border border-gray-100">
            <Plus size={18} strokeWidth={2.5} className="text-black" />
          </div>
        </Link>
      </div>

      {/* Card Stack */}
      <div className="relative h-80">
        {agents.map((agent, index) => {
          const reversedIndex = agents.length - 1 - index;

          return (
            <div
              key={agent.name}
              className="absolute transition-all duration-500 ease-out "
              style={{
                top: `${index * 60}px`,
                left: `${reversedIndex * 14}px`,
                right: `${reversedIndex * 14}px`,
                zIndex: index,
              }}
            >
              <div
                className="
                              w-full
                              h-37.5
                              bg-linear-to-b from-[#132A46] to-[#0A162B]
                              border border-[#ffffff15]
                              text-white 
                              rounded-3xl 
                              px-6 
                              pt-5 
                              pb-6
                              shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.3),0_15px_35px_rgba(0,0,0,0.5)]
                            "
              >
                <div className="flex justify-between items-start">
                  <div className="pt-0.5">
                    <p className="text-[18px] font-medium tracking-wide">
                      {agent.name}
                    </p>
                    {agent.subtitle && (
                      <p className="text-[12px] text-gray-300 mt-1 italic font-light">
                        {agent.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-[6px] font-normal text-white tracking-[0.4em] mb-2 uppercase">
                      Languages
                    </p>
                    <div className="flex gap-1.5 font-bold">
                      {agent.languages.map((lang) => (
                        <span
                          key={lang}
                          className="text-[10px] text-gray-900 bg-[#F4F4F5] px-2 py-0.75 rounded-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentsSection;
