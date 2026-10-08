import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Hero />
      <About />
      <Services />
      <Stats />
      <Process />
      <Team />
      <Testimonials />
      <CTA />
    </div>
  );
}
