import React, { Suspense } from 'react';
import PageBanner from '@/components/PageBanner';
import Blogs from '@/components/Blogs';
import { sharedData, homePageData } from '@/data';

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <PageBanner pageName="blogs" data={sharedData.PageBanner} />
      <Suspense fallback={<div className="text-white py-12 text-center tracking-widest text-sm">LOADING BLOGS...</div>}>
        <Blogs data={homePageData.Blogs} isBlogPage={true} />
      </Suspense>
    </div>
  );
}
