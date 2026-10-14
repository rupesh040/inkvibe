import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Servicesection";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Blogs from "@/components/Blogs";
import { homePageData } from '@/data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Hero data={homePageData.Hero} />
      <About data={homePageData.About} />
      <Services data={homePageData.Services} />
      <Process data={homePageData.Process} />
      <Team data={homePageData.Team} />
      <Testimonials data={homePageData.Testimonials} />
      <Blogs data={homePageData.Blogs} />
    </div>
  );
}
