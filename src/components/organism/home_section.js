import BlurFade from "../animation/animationScrol";
import BlueSpan from "../atoms/gradientspan";
import Heading from "../atoms/heading";
import Label from "../atoms/labels";
import Paragraph from "../atoms/paragraph";
import { BlueButton, WhiteButton } from "../molecules/button/button";
import Section from "../template/tagHTML/section";

export default function HomeHeroSection() {
  return (
    <Section className="gap-15" id="herosection">
      <div className="lg:w-[60%] space-y-3 flex flex-col justify-center items-center">
        <BlurFade delay={1}>
          <div className="p-10 flex gap-4 justify-center items-center">
            {/* Memanggil Label Gradient */}
            <div className="hidden lg:block">
              <Label variant="gradient">Zestify Tech</Label>
            </div>

            {/* Memanggil Label Glass */}
            <Label variant="glass">Agensi Teknologi AI</Label>
          </div>
        </BlurFade>
        <BlurFade>
          <Heading level={1} className="text-center">
            Menerapkan <BlueSpan>Kecerdasan</BlueSpan> <br /> Untuk Bisnis
          </Heading>
        </BlurFade>
        <BlurFade>
          <Paragraph className="m-auto text-center lg:w-[80%]">
            Zestify membantu bisnis dan organisasi di Indonesia mengintegrasikan
            AI ke dalam sistem operasional
          </Paragraph>
        </BlurFade>
      </div>
      <BlurFade delay={1}>
        <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 lg:space-x-10">
          <BlueButton href="/zesAI-chat" className="m-auto">
            zesAI Chat
          </BlueButton>
          {/* <WhiteButton>Konsultasi</WhiteButton> */}
        </div>
      </BlurFade>
    </Section>
  );
}
