import { HeaderMegaMenu } from "../components/HeaderMegaMenu";
import { FooterLinks } from "../components/FooterLinks";
import "./globals.css";

import LoginContextProvider from "@/context/login.context";

import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <LoginContextProvider>
            <HeaderMegaMenu />
            {children}
            <FooterLinks />
          </LoginContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
