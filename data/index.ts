import contentData from './content.json';
import { ContentData } from '@/types';

export const content = contentData as unknown as ContentData;
export default content;

const t1 = content.Tattoo.templateComponents["template-1"];

export const sharedData = {
  PageBanner: content.Tattoo.sections.PageBanner.variants[t1.shared.PageBanner],
  Header: content.Tattoo.sections.Header.variants[t1.shared.Header],
  Footer: content.Tattoo.sections.Footer.variants[t1.shared.Footer],
  Topbar: content.Tattoo.sections.Topbar.variants[t1.shared.Topbar],
};

export const homePageData = {
  Hero: content.Tattoo.sections.Hero.variants[t1.pages.home.Hero],
  About: content.Tattoo.sections.About.variants[t1.pages.home.About],
  Services: content.Tattoo.sections.Services.variants[t1.pages.home.Services],
  Stats: content.Tattoo.sections.Stats.variants[t1.pages.home.Stats],
  Process: content.Tattoo.sections.Process.variants[t1.pages.home.Process],
  Team: content.Tattoo.sections.Team.variants[t1.pages.home.Team],
  CTA: content.Tattoo.sections.CTA.variants[t1.pages.home.CTA],
  Testimonials: content.Tattoo.sections.Testimonials.variants[t1.pages.home.Testimonials],
  Blogs: content.Tattoo.sections.Blogs.variants[t1.pages.home.Blogs],
};

export const aboutPageData = {
  About: content.Tattoo.sections.About.variants[t1.pages.about?.About as string] || content.Tattoo.sections.About.variants['TattooAbout1'],
  Process: content.Tattoo.sections.Process.variants[t1.pages.about?.Process as string] || content.Tattoo.sections.Process.variants['TattooProcess1'],
  Stats: content.Tattoo.sections.Stats.variants[t1.pages.about?.Stats as string] || content.Tattoo.sections.Stats.variants['TattooStats1'],
  CTA: content.Tattoo.sections.CTA.variants[t1.pages.about?.CTA as string] || content.Tattoo.sections.CTA.variants['TattooCTA1'],
};

export const teamPageData = {
  Team: content.Tattoo.sections.Team.variants[t1.pages.team?.Team as string] || content.Tattoo.sections.Team.variants['TattooTeam1'],
};

export const galleryPageData = {
  Gallery: (content.Tattoo.sections as any).Gallery?.variants?.[t1.pages.gallery?.Gallery as string] || (content.Tattoo.sections as any).Gallery?.variants?.TattooGallery1 || {},
};

export const serviceDetailData = (content.Tattoo.sections as any).ServiceDetails?.variants?.TattooServiceDetails1 || {};

export const blogDetailData = (content.Tattoo.sections as any).BlogDetails?.variants?.TattooBlogDetails1 || {};

export const contactData = content.Tattoo.sections.Contact?.variants[t1.shared.Contact as string] || (content.Tattoo.sections as any).Contact?.variants?.TattooContact1 || {};

