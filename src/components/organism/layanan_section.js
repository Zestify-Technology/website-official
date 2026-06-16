import Section from "../template/tagHTML/section";
import Heading from "../atoms/heading";
import Paragraph from "../atoms/paragraph";
import Label from "../atoms/labels";
import PricingCardsGrid from "../molecules/pricingcard";


export default function LayananSection() {

    return(
        <Section>
            <div className="space-y-5 text-center w-[60%]">
                <Label variant="glass">Layanan</Label>
                <Heading level={2} >
                    Dari Data ke Sistem yang Bekerja.
                </Heading>
                <Paragraph>
                    Kami tidak datang dengan solusi siap pakai. Kami masuk ke operasional kamu, pahami datanya, dan bangun sistem AI yang benar-benar relevan bukan sekadar canggih.
                </Paragraph>
            </div>
            <PricingCardsGrid/>
        </Section>
    )
}



