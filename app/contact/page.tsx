import ContactClient from "./ContactClient";
import { getBanners } from "@/app/api/api";

export default async function ContactPage() {
  const banners = await getBanners();

  return <ContactClient banners={banners} />;
}
