import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import Process from "@/components/Process";
import { aboutPageData, sharedData } from '@/data';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageBanner pageName="about" data={sharedData.PageBanner} />
      <About data={aboutPageData.About} showButton={false} />
      <Process data={aboutPageData.Process} /> 
    </div>
  );
}
