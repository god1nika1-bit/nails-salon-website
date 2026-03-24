import { REVIEWS_DATA, getAverageRating } from "@/data/reviews";

export function JsonLd() {
  const avgRating = getAverageRating();
  const reviewCount = REVIEWS_DATA.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "ЛАЙК НЭЙЛС",
    alternateName: "Like Nails & KO",
    description: "Салон красоты на Политехнической, 6 в Санкт-Петербурге. Маникюр, педикюр, парикмахерские услуги, косметология, массаж.",
    url: "https://archontis.github.io/nails-salon-website",
    telephone: "+78006007413",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Политехническая, д. 6, стр. 1, 1 этаж",
      addressLocality: "Санкт-Петербург",
      addressRegion: "Санкт-Петербург",
      postalCode: "194021",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 59.993272,
      longitude: 30.357199,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "10:00",
        closes: "21:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(avgRating),
      reviewCount: String(reviewCount),
      bestRating: "5",
    },
    priceRange: "₽₽",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
