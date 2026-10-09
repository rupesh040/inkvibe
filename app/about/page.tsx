import PageBanner from "@/components/PageBanner";
import About from "@/components/About";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import { aboutPageData, sharedData } from '@/data';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageBanner pageName="about" data={sharedData.PageBanner} />
      <About data={aboutPageData.About} />
      <Process data={aboutPageData.Process} />
      <Stats data={aboutPageData.Stats} />
      <CTA data={aboutPageData.CTA} />
    </div>
  );
}
