import { Montserrat } from "next/font/google";
import "./css/globals.css";
import JsonLd from "@/components/atoms/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Zestify Tech",
    template: "%s | Zestify Technology",
  },
  // icons: {
  //   icon: '/logo.png', // atau '/logo.png' jika ada di folder public
  //   shortcut: '/logo.png',
  //   apple: '/logo.png', // opsional untuk iOS
  // },
  description:
    "Kami membangun ekosistem teknologi berbasis AI untuk efisiensi bisnis Anda. Satu sistem cerdas yang mampu menghadirkan ribuan solusi digital otomatis dan tepat guna.",
  metadataBase: new URL("https://zestify.my.id"),
  openGraph: {
    title: "Agensi Teknologi Penerapan AI",
    description:
      "Kami membangun ekosistem teknologi berbasis AI untuk efisiensi bisnis Anda. Satu sistem cerdas yang mampu menghadirkan ribuan solusi digital otomatis dan tepat guna.",
    url: "https://zestify.my.id",
    siteName: "Agensi Teknologi AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Site",
    description: "My site description here.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "website",
  name: "Agensi Teknologi AI",
  url: "https://zestify.my.id",
  logo: "https://zestify.my.id/logo.png",
  sameAs: ["https://instagram.com/zestify.my.id"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-black relative  overflow-x-hidden`}
      >
        <JsonLd data={organizationData} />
         <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
