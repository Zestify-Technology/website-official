import Heading from "../atoms/heading";
import Label from "../atoms/labels";
import Paragraph from "../atoms/paragraph";
import Section from "../template/tagHTML/section";



export default function KlienSection() {
  return (
    <Section id='klien'>
      <div className="lg:w-[60%] space-y-3 flex items-center justify-center flex-col">
        <Label variant="glass">Klien Kami</Label>
        <Heading level={2} className="text-center">
          Dipercaya Oleh Mereka Yang Mau Bergerak Duluan.
        </Heading>
        <Paragraph className="text-center">
             bersama bisnis dan institusi yang percaya bahwa AI bukan masa depan, tapi kebutuhan sekarang.
        </Paragraph>
      </div>
    </Section>
  );
}
