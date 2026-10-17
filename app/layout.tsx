import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { SiteShell } from "@/components/site-shell"
import { GoogleAnalytics } from "@/components/google-analytics"
import { OrganizationLD } from "@/components/json-ld"
import { generateSEO } from "@/components/seo"
import siteConfig from "@/data/site-config.json"
import Script from "next/script"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  ...generateSEO(),
  verification: {
    google: siteConfig.googleSiteVerification,
  },
  icons: siteConfig.icons,
  manifest: siteConfig.manifest || "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor || "#4b0082",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationLD />
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
        <Script id="mailerlite-universal" strategy="afterInteractive">{`
          (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
          .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
          n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
          (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
          ml('account', '1828078');
        `}</Script>
        <Script id="linkedin-insight-tag" strategy="afterInteractive">{`
          _linkedin_partner_id = "9314812";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l) {
              window.lintrk = function(a,b) { window.lintrk.q.push([a,b]) };
              window.lintrk.q = [];
            }
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}</Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=9314812&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  )
}
