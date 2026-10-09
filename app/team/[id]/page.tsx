import PageBanner from "@/components/PageBanner";
import TeamDetailProfile from "@/components/TeamDetailProfile";
import TeamDetailFeatures from "@/components/TeamDetailFeatures";
import TeamDetailAbout from "@/components/TeamDetailAbout";
import Team from "@/components/Team";
import { teamPageData, sharedData } from '@/data';
import { notFound } from 'next/navigation';

export const instant = false;

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const member = teamPageData.Team.members.find((m) => m.id === id);

  if (!member) {
    return notFound();
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <PageBanner 
        pageName="team-detail" 
        data={sharedData.PageBanner} 
        customTitle={member.name}
        customBreadcrumb={["HOME", "TEAM", member.name]}
      />
      <TeamDetailProfile member={member} />
      {member.features && <TeamDetailFeatures features={member.features} />}
      <TeamDetailAbout member={member} />
    </div>
  );
}
