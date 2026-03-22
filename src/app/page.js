import GradualBlurMemo from "@/components/atoms/animation/gradual blur/gradualblur";
import Aurora from "@/components/atoms/background/aurora";
import Orb from "@/components/atoms/background/orb";
import Plasma from "@/components/atoms/background/plasma";
import Navbar from "@/components/molecules/navbar/navbar";
import FaqSection from "@/components/organism/faqSection/faq";
import Footer from "@/components/organism/footer/footer";
import HeroSection from "@/components/organism/heroSection/hero";
import SecuritySection from "@/components/organism/securitySection/security";
import ServicesSection from "@/components/organism/service/service";
import TechStack from "@/components/organism/techstack/techstack";
import EfficiencyParallax from "@/components/organism/whySection/chart";
import WhyUsSection from "@/components/organism/whySection/why";
import WorkflowSection from "@/components/organism/workflowSection/workflow";
import Main from "@/components/template/mainSection/main";
import Image from "next/image";







// HALAMAN LANDING PAGE PERUSAHAAN
export default function Home() {
  return (
    <>
      {/*
        SEBELUM: overflowY: "auto" → sticky mati total karena
        scroll terjadi di dalam div ini, bukan di window.

        SESUDAH: hapus overflowY, pakai minHeight agar layout
        tetap benar. Scroll sekarang terjadi di window → sticky bekerja.
      */}
      <div >
        {/* NAVBAR */}
        <Navbar />

        {/* BACKGROUND ORB */}
        <div className="h-screen absolute lg:translate-x-[0px] lg:translate-y-[-40px] opacity-70 w-full">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#000000"
          />
        </div>

        {/* BAGIAN ISI */}
        <Main>
          <HeroSection />
          <TechStack />
            <div id="mengapa-kami" className="py-40" >
                <WhyUsSection />
            </div>
          <ServicesSection/>
          <WorkflowSection/>
          <SecuritySection/>
          <FaqSection/>
        </Main>
        <Footer/>
      </div>

      <GradualBlurMemo
        target="page"
        position="bottom"
        height="7rem"
        strength={3.5}
        divCount={2}
        curve="bezier"
        opacity={1}
      />
    </>
  );
}