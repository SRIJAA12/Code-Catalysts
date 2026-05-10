"use client";
import { use } from "react";
import ItineraryBuilderPage from "@/app/builder/page";

// Re-uses the full builder, pre-loaded with the slug's trip data.
// In production this would fetch from DB using `params.slug`.
export default function ItinerarySlugPage({ params }) {
  const { slug } = use(params);
  // Pass slug as prop so builder can hydrate from DB later
  return <ItineraryBuilderPage slug={slug} />;
}
