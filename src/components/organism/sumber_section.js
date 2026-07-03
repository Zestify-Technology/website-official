
import Section from "../template/tagHTML/section"
import Paragraph from "../atoms/paragraph"
import Heading from "../atoms/heading"
import Label from "../atoms/labels"
import { BlueButton } from "../molecules/button/button"
import Image from "next/image"


export default function SumberSection(){
    return(
        // Tambahkan props direction="col" di sini, hapus className="flex"
        <section id="source" className="w-full min-h-screen flex flex-col lg:flex-row gap-10 justify-center items-center"> 
            <div className="lg:1/2"> {/* Tambahkan width agar image tidak gepeng */}
                <Image
                src='/sumberDaya.svg'
                width={20}
                height={20}
                alt="Logo 3d"
                className="w-full m-auto"
                />
            </div>
            <div className="lg:w-1/2 lg:p-20 space-y-5">
                <Label variant="glass">Sumber Daya</Label>
                <Heading level={2}>
                    Semua yang Kamu Butuhkan untuk Mulai.
                </Heading>
                <Paragraph>
                     Zestify bukan hanya tentang deploy sistem AI. Kami membangun ekosistem — tempat bisnis, developer, dan ide bertemu, berkembang, dan saling mendorong maju.
                </Paragraph>
                {/* <BlueButton>
                    Selengkapnya
                </BlueButton> */}
            </div>
        </section>
    )
}