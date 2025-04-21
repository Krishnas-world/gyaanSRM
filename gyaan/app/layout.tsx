import type { Metadata } from "next";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Montserrat_Alternates({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
}); //,'200',,'400','500','600','700','800','900'

export const metadata: Metadata = {
  title: "Gyaan | Learning made fun",
  description:
    "Transforming education into a delightful journey of discovery and growth.",
};

export default function RootLayout({
  children,
}: // New prop to control visibility
Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" richColors expand={true} closeButton />
      </body>
    </html>
  );
}
