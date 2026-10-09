import React from 'react';
import PageBanner from '@/components/PageBanner';
import { sharedData, galleryPageData } from '@/data';
import Gallery from '@/components/Gallery';

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <PageBanner pageName="gallery" data={sharedData.PageBanner} />
      <Gallery data={galleryPageData.Gallery} />
    </div>
  );
}
