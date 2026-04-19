import CommonWrapper from "@/common/CommonWrapper"
import LanguageSettings from "@/components/DashboardTwoComponent/LanguageSettings"
import VoiceSelector from "@/components/DashboardTwoComponent/VoiceSelector"
import AgentGreetings from "./AgentGreetings"

const Agents = () => {
    return (
        <div >
            <CommonWrapper>
                <div data-aos="fade-up" style={{
                    borderRadius: "30px",
                    background: "rgba(20, 21, 22, 0.70)"
                }}  >
                    <VoiceSelector />
                </div>
                <div data-aos="fade-up" style={{
                    borderRadius: "30px",
                    background: "rgba(20, 21, 22, 0.70)"
                }}>
                    <LanguageSettings />
                </div>

                <div data-aos="fade-up">
                    <AgentGreetings />
                </div>
            </CommonWrapper>
        </div>
    )
}




export default Agents