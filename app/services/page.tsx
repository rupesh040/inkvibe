import PageBanner from "@/components/PageBanner";
import Servicesection from "@/components/Servicesection";
import { homePageData, sharedData } from '@/data';
    

export default function Services() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageBanner pageName="services" data={sharedData.PageBanner} />
      <Servicesection data={homePageData.Services} />
    </div>
  );
}
