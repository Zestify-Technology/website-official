import SideRays from "@/components/animation/siderays";
import Footer from "@/components/molecules/footer/footer";
import Navbar from "@/components/molecules/navbar/navbar";
import HomeHeroSection from "@/components/organism/home_section";
import KlienSection from "@/components/organism/klien_section";
import LayananSection from "@/components/organism/layanan_section";
import ProblemSection from "@/components/organism/problem_section";
import SumberSection from "@/components/organism/sumber_section";
import TechStack from "@/components/organism/techstack";
import TentangSection from "@/components/organism/tentang_section";
import WorkflowSection from "@/components/organism/workflow_section";
import Main from "@/components/template/tagHTML/main";



export default function Home() {
  return (
    <>
      {/* Background Glow Effect */}

      <header>
        <Navbar />
      </header>

      {/* Tambahkan padding top agar tidak tertutup Navbar Fixed */}
      <Main className="pt-24 flex flex-col gap-20">
        <div className="z-1 w-full mh-screen absolute right-0 top-0 pointer-events-none">
          <SideRays
            speed={2.5}
            rayColor1="#0ea7ff"
            rayColor2="#98a6ff"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-10" />
        </div>
        <HomeHeroSection  />
        <TechStack />
        <ProblemSection />
        <TentangSection/>
        <LayananSection/>
        <WorkflowSection/>
        <SumberSection/>
        <KlienSection/>
      </Main>
      <Footer/>
    </>
  );
}
