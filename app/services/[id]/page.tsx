import React from 'react';
import PageBanner from '@/components/PageBanner';
import { sharedData, serviceDetailData } from '@/data';
import ServiceDetailAbout from '@/components/ServiceDetailAbout';
import ServiceDetailWhyChoose from '@/components/ServiceDetailWhyChoose';
import ServiceDetailOurWork from '@/components/ServiceDetailOurWork';

export const instant = false;

export async function generateStaticParams() {
  return Object.keys(serviceDetailData).map((id) => ({ id }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const id = unwrappedParams.id;
  const data = serviceDetailData[id] || serviceDetailData['tattooing'];

  const serviceTitle = (data.about?.titleLine1 + ' ' + data.about?.titleLine2) || id.toUpperCase();
  const breadcrumb = ['HOME', 'SERVICES', id.replace(/-/g, ' ').toUpperCase()];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505] text-white">
      <PageBanner
        pageName="services"
        data={sharedData.PageBanner}
        customTitle={serviceTitle}
        customBreadcrumb={breadcrumb}
      />
      <ServiceDetailAbout data={data.about} />
      <div className="w-full h-px bg-white/5" />
      <ServiceDetailWhyChoose data={data.whyChoose} />
      <div className="w-full h-px bg-white/5" />
      <ServiceDetailOurWork data={data.ourWork} />
    </div>
  );
}

