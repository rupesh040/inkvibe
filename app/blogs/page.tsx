import React from 'react';
import PageBanner from '@/components/PageBanner';
import Blogs from '@/components/Blogs';
import { sharedData, homePageData } from '@/data';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <PageBanner pageName="blogs" data={sharedData.PageBanner} />
      <Blogs data={homePageData.Blogs} isBlogPage={true} />
    </div>
  );
}
