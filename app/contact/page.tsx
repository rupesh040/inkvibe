import React from 'react';
import PageBanner from '@/components/PageBanner';
import ContactSection from '@/components/ContactSection';
import ContactMap from '@/components/ContactMap';
import { sharedData, contactData } from '@/data';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050505]">
      <PageBanner pageName="contact" data={sharedData.PageBanner} />
      <ContactSection data={contactData} />
      
      {contactData.map && (
        <ContactMap mapData={contactData.map} />
      )}
    </div>
  );
}
