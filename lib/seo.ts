import type { Metadata } from "next";
import type { EventJsonLdProps } from "next-seo";

export const siteMetadata: Metadata = {
  title: {
    default: "Invitación exclusiva | Celebra con nosotros",
    template: "%s | Invitación especial",
  },
  description:
    "Descubre todos los detalles de un evento inolvidable: fecha, ubicación, galería de fotos y confirma tu asistencia en un diseño elegante.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Invitación exclusiva | Celebra con nosotros",
    description:
      "Explora cada detalle de esta celebración: itinerario, galería y confirmación RSVP, todo en un solo lugar.",
    siteName: "Invitación Especial",
    locale: "es_MX",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Invitación elegante en tonos rosa y rose gold",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@example",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://example.com",
  },
};

export const galaEventJsonLd: EventJsonLdProps = {
  name: "Celebración de Gala de Valentina",
  description:
    "Una noche sofisticada para celebrar el próximo capítulo en la vida de Valentina junto a familia y amigos.",
  startDate: "2025-12-28T18:30:00-06:00",
  endDate: "2025-12-29T02:30:00-06:00",
  url: "https://example.com",
  location: {
    name: "Hacienda San Felipe",
    address: {
      streetAddress: "Camino a la Hacienda 120",
      addressLocality: "Querétaro",
      addressRegion: "Qro",
      postalCode: "76000",
      addressCountry: "MX",
    },
  },
  image: ["https://example.com/event-cover.jpg"],
  organizer: {
    name: "Familia García",
    url: "https://example.com/organizer",
  },
  performer: [
    {
      name: "Valentina García",
    },
  ],
};
