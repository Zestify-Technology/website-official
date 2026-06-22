import Heading from "@/components/atoms/heading";
import Label from "@/components/atoms/labels";
import Paragraph from "@/components/atoms/paragraph";
import { GlassButton } from "@/components/molecules/button/button";
import Footer from "@/components/molecules/footer/footer";
import MorphGlassContainer from "@/components/molecules/kontainer_image/container-image";
import Main from "@/components/template/tagHTML/main";
import Section from "@/components/template/tagHTML/section";
import Image from "next/image";

export default function TentangPage() {
  const styleSection = "lg:p-28 lg:flex-row space-y-10";

  return (
    <>
      <Main>
        <div className="fixed top-10 z-100">
          <GlassButton href="/" />
        </div>
        <Section className="lg:p-28 lg:flex-row space-y-10">
          <div className="lg:w-1/2 space-y-8">
            <Heading level={1}>Tentang Kami</Heading>
            <Paragraph>
              Zestify adalah sebuah AI-Services & Technology Company yang
              membantu bisnis dan organisasi di Indonesia mengintegrasikan AI ke
              dalam sistem operasional nyata mereka dari otomatisasi workflow
              hingga deployment sistem manajemen berbasis AI.
            </Paragraph>
          </div>
          <div className="Image lg:w-1/2 flex justify-center items-center">
            <Image
              src="/tentang page/hero_section.svg"
              width={1000}
              height={1000}
              alt="Image w-full "
            />
          </div>
        </Section>

        <Section className={`${styleSection} lg:gap-10`}>
          <div className="lg:w-1/2">
            <MorphGlassContainer>
              <Image
                src="/Tentang Page/Visi_image.svg"
                alt="image"
                width={700}
                height={700}
                className="rounded-2xl w-full"
              />
            </MorphGlassContainer>
          </div>
          <div className="lg:w-1/2 p-5 space-y-5">
            <Label variant="glass">Visi & Misi</Label>
            <Heading level={2}>Visi & Misi</Heading>
            <Paragraph>
              Menjadi perusahaan dan ekosistem teknologi AI terdepan di
              Indonesia yang mendorong transformasi bisnis efektif dan inovasi
              berkelanjutan melalui integrasi solusi AI kustom yang berdampak
              nyata bagi mitra.
            </Paragraph>
          </div>
        </Section>

        <Section className={`${styleSection} lg:gap-10`}>
          <div className="lg:w-1/2 p-5 space-y-5">
            <Label variant="glass">Moat</Label>
            <Heading level={2}>MOAT Zestify</Heading>
            <Paragraph>
              Moat Zestify bukan di model AI-nya, melainkan di cara
              mengimplementasikannya. Empat pilar keunggulan Zestify
            </Paragraph>
          </div>

          <div className="lg:w-1/2">
            <MorphGlassContainer>
              <Image
                src="/Tentang Page/MOAT.svg"
                alt="image"
                width={700}
                height={700}
                className="rounded-2xl w-full"
              />
            </MorphGlassContainer>
          </div>
        </Section>

        <Section direction="col">
          <Heading level={5} className="lg:w-1/2 text-center">
            Deploying Intelligence. Untuk Indonesia.
          </Heading>
          <Paragraph className="lg:w-1/2 text-center">
            Zestify dibangun untuk jadi bagian dari cara bisnis Indonesia
            beroperasi — bukan vendor yang datang dan pergi, tapi partner yang
            tumbuh bersama.
          </Paragraph>
        </Section>
      </Main>
      <Footer />
    </>
  );
}
