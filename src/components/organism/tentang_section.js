"use client"
import Section from "../template/tagHTML/section"
import Paragraph from "../atoms/paragraph"
import Heading from "../atoms/heading"
import Label from "../atoms/labels"
import { BlueButton } from "../molecules/button/button"
import Image from "next/image"
import { useRouter } from "next/navigation"



export default function TentangSection(){
const router = useRouter()

    return(
        // Tambahkan props direction="col" di sini, hapus className="flex"
        <section id="tentang" className="w-full min-h-screen flex flex-col lg:flex-row gap-10 justify-center items-center"> 
            <div className="lg:w-1/2"> {/* Tambahkan width agar image tidak gepeng */}
                <Image
                src='/tentang_section.svg'
                width={20}
                height={20}
                alt="Logo 3d"
                className="w-full lg:w-1/2 m-auto"
                />
            </div>
            <div className="lg:w-1/2 lg:p-20 space-y-5">
                <Label variant="glass">Tentang Kami</Label>
                <Heading level={2}>
                    Bukan Hanya Pakai AI Tapi Bangun Sistem AI.
                </Heading>
                <Paragraph>
                    Zestify menghubungkan AI ke sistem operasional bisnis kamu sebagai inti cara kerja.
                </Paragraph>
                <BlueButton onClick={() => router.push('/tentang')}>
                    Selengkapnya
                </BlueButton>
            </div>
        </section>
    )
}