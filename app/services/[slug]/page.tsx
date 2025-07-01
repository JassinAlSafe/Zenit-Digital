import { notFound } from "next/navigation";
import { services } from "../../../data/servicesData";
import ServiceDetailPage from "../../../Components/Services/ServiceDetailPage";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Zenit Digital Services`,
    description: service.shortDescription,
  };
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailPage service={service} />;
}