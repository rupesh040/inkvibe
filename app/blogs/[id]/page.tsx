import React from 'react';
import PageBanner from '@/components/PageBanner';
import { sharedData, blogDetailData } from '@/data';
import BlogDetailContent from '@/components/BlogDetailContent';

export const instant = false;

export async function generateStaticParams() {
  return Object.keys(blogDetailData).map((id) => ({ id }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = await params;
  const id = unwrappedParams.id;
  const data = blogDetailData[id] || Object.values(blogDetailData)[0];

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <PageBanner 
        pageName="blog details" 
        data={sharedData.PageBanner} 
        customTitle={data.title}
        customBreadcrumb={["Home", "Blog", data.title]}
      />
      <BlogDetailContent data={data} currentId={id} />
    </div>
  );
}
