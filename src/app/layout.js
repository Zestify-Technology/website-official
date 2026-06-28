import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope"
});

export const metadata = {
  title: "Zestify Deploy Intellegence",
  description: "Zestify membantu bisnis dan organisasi di Indonesia mengintegrasikan AI ke dalam sistem operasional",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${manrope} scrollbar-hidden scrollbar-hide  h-full antialiased`}
    >
      <body className="scrollbar-hidden scrollbar-hide min-h-full relative flex flex-col">{children}</body>
    </html>
  );
}
