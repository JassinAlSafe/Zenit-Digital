import { notFound } from "next/navigation";
import { services } from "../../../data/servicesData";
import ServiceDetailPage from "../../../Components/Services/ServiceDetailPage";
import ServiceDetailErrorBoundary from "../../../Components/Services/ServiceDetailErrorBoundary";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  
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

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <ServiceDetailErrorBoundary>
      <ServiceDetailPage service={service} />
    </ServiceDetailErrorBoundary>
  );
}