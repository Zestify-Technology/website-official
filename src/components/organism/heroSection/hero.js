import GradientButton, { SolidButton } from "@/components/atoms/button/button";
import H1 from "@/components/atoms/heading/heading";
import Paragraph from "@/components/atoms/paragraph/paragraph";
import Section from "@/components/template/section/section";

export default function HeroSection() {
  return (
    <Section className="flex flex-col justify-center items-center">
      <div
        className="
            w-[80%] md:w-[39%] inset-0 flex flex-col gap-4
            "
      >
        <H1 align="center">Satu Sistem Cerdas, Ribuan Solusi Efisien</H1>
        <Paragraph align="center">
          Kami membangun ekosistem teknologi berbasis AI untuk efisiensi bisnis
          Anda. Satu sistem cerdas yang mampu menghadirkan ribuan solusi digital
          otomatis dan tepat guna.
        </Paragraph>

        <div className="flex justify-center gap-10">
          <GradientButton href="/eksperimen">
            Ajukan Eksperimental
          </GradientButton>
        </div>
      </div>
    </Section>
  );
}
