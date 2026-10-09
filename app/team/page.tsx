import PageBanner from "@/components/PageBanner";
import Team from "@/components/Team";
import { teamPageData, sharedData } from '@/data';

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageBanner pageName="team" data={sharedData.PageBanner} />
      <Team data={teamPageData.Team} />
    </div>
  );
}
