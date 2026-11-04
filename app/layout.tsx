import type { Metadata } from "next"
import { JetBrains_Mono, Poppins } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "QualifyLeads",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", poppins.variable)}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
