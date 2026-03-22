import GradientButton, { SolidButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";


export default function HeroSection() {
  return (
    <Section  className="min-h-screen flex flex-col justify-center items-center">
        <div
          className="
            w-[80%] md:w-[39%] inset-0 flex flex-col gap-4
            "
        >
          <H1 align="center">
            Bisnis Menjadi Efisien Dengan Sistem Otomatis & AI Terintegrasi
          </H1>
          <Paragraph align="center">
            membantu perusahaan dengan 10–100 karyawan mengotomatisasi dan
            mengintegrasikan proses bisnis mereka menggunakan teknologi AI agar
            lebih efisien, scalable, dan siap berkembang.
          </Paragraph>

          <div className="flex justify-center gap-10">
            <GradientButton href="/pusat-layanan/pengajuan">
              Ajukan Eksperimental
            </GradientButton>
          </div>
        </div>
    </Section>
  );
}
