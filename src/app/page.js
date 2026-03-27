import GradualBlurMemo from "@/components/atoms/animation/gradual blur/gradualblur";
import Orb from "@/components/atoms/background/orb";
import JsonLd from "@/components/atoms/JsonLd";
import IconFAB from "@/components/molecules/fab/fab";
import Navbar from "@/components/molecules/navbar/navbar";
import FaqSection from "@/components/organism/faqSection/faq";
import Footer from "@/components/organism/footer/footer";
import HeroSection from "@/components/organism/heroSection/hero";
import SecuritySection from "@/components/organism/securitySection/security";
import ServicesSection from "@/components/organism/service/service";
import TechStack from "@/components/organism/techstack/techstack";
import WhyUsSection from "@/components/organism/whySection/why";
import WorkflowSection from "@/components/organism/workflowSection/workflow";
import Main from "@/components/template/mainSection/main";
import Image from "next/image";


export const metadata = {
  title: "Agensi Teknologi Penerapan AI",
  description:
    "Kami membangun ekosistem teknologi berbasis AI untuk efisiensi bisnis Anda. Satu sistem cerdas yang mampu menghadirkan ribuan solusi digital otomatis dan tepat guna.",
};

const websiteData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zestify",
  url: "https://zestify.my.id",
};

// HALAMAN LANDING PAGE PERUSAHAAN
export default function Home() {
  return (
    <>
      <JsonLd data={websiteData} />
      {/*
        SEBELUM: overflowY: "auto" → sticky mati total karena
        scroll terjadi di dalam div ini, bukan di window.

        SESUDAH: hapus overflowY, pakai minHeight agar layout
        tetap benar. Scroll sekarang terjadi di window → sticky bekerja.
      */}
      <div>
        {/* NAVBAR */}
        <Navbar />
        <IconFAB/>

        {/* BACKGROUND ORB */}
        <div className="h-screen absolute lg:translate-y-[0px] opacity-70 w-full">
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
          <div id="mengapa-kami" className="py-40">
            <WhyUsSection />
          </div>
          <ServicesSection />
          <WorkflowSection />
          <SecuritySection />
          <FaqSection />
        </Main>
        <Footer />
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
