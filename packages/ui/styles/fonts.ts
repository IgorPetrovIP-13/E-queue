import { Fira_Code as FontMono, Inter as FontSans, Nunito as FontNunito} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono"
});

export const fontNunito = FontNunito({
	subsets: ["latin"],
	variable: "--font-nunito"
});