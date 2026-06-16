import Heading from "../atoms/heading"
import Paragraph from "../atoms/paragraph"
import Section from "../template/tagHTML/section"
import Charts from "../organism/charts"
import Label from "../atoms/labels"

export default function ProblemSection(){
    return(
        // px-4 menjaga agar komponen tidak menempel langsung ke tepi layar handphone
        <Section className="w-full flex flex-col items-center gap-8 py-10 px-4 my-30 max-w-4xl mx-auto">
            
            <Label variant="glass">AI Solved The Problem</Label>
            
            <div className="w-full md:w-[80%] flex justify-center items-center flex-col gap-3 text-center">
                <Heading level={2} className="w-full text-center leading-tight">
                    Sistem AI Menyelesaikan Berbagai Masalah Bisnis Anda!
                </Heading>
                <Paragraph className="text-center w-full opacity-80 text-sm sm:text-base">
                    Berbagai masalah bisa diselesaikan dengan membangun sistem AI yang terhubung dengan data usaha anda.
                </Paragraph>
            </div>
            
            {/* Wrapper Chart - Mengambil lebar penuh 100% dari container luar */}
            <div className="w-full">
                <Charts/>
            </div>
            
        </Section>
    )
}