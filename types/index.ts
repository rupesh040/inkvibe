export interface SocialLink {
  name: string;
  icon: string;
  href: string;
  svg?: string;
}

export interface TopbarVariant {
  location: string;
  phone: string;
  email: string;
  social: SocialLink[];
}

export interface NavLink {
  name: string;
  href: string;
  active?: boolean;
  hasDropdown?: boolean;
}

export interface HeaderVariant {
  logo: string;
  links: NavLink[];
  button: string;
}

export interface HeroSlide {
  subtitlePart1: string;
  subtitlePart2: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface HeroVariant {
  slides: HeroSlide[];
}

export interface AboutFeature {
  icon: string;
  title: string;
}

export interface AboutVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description1: string;
  description2: string;
  features: AboutFeature[];
  buttonText: string;
  buttonLink: string;
  image1: string;
  image2: string;
  image3: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

export interface ServicesVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  services: ServiceItem[];
}

export interface StatItem {
  icon: string;
  value: string;
  label: string;
}

export interface StatsVariant {
  imageLeft: string;
  imageRight: string;
  stats: StatItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface ProcessVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: string[];
  steps: ProcessStep[];
  backgroundImage: string;
}

export interface TeamSocialLink {
  platform: string;
  url: string;
}

export interface TeamFeature {
  icon: string;
  title: string;
  subtitle: string;
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string;
  socials: TeamSocialLink[];
  experience?: string;
  location?: string;
  instagramHandle?: string;
  biography?: string;
  aboutSubtitle?: string;
  aboutTitleLine1?: string;
  aboutTitleLine2?: string;
  aboutText?: string[];
  quote?: string;
  quoteImage?: string;
  features?: TeamFeature[];
}

export interface TeamVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  members: TeamMember[];
  buttonText?: string;
  buttonLink?: string;
}

export interface CTAButton {
  text: string;
  link: string;
  style: 'solid' | 'outline';
}

export interface CTAVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  watermark: string;
  description: string;
  buttons: CTAButton[];
  image: string;
}

export interface BlogItem {
  image: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  link: string;
}

export interface BlogsVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  blogs: BlogItem[];
  buttonText: string;
  buttonLink: string;
}

export interface Testimonial {
  text: string;
  author: string;
  rating: number;
}

export interface TestimonialVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  testimonials: Testimonial[];
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterContact {
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
}

export interface FooterVariant {
  logo: string;
  description: string;
  social: SocialLink[];
  quickLinks: {
    title: string;
    links: FooterLink[];
  };
  services: {
    title: string;
    links: FooterLink[];
  };
  contact: {
    title: string;
    info: FooterContact;
  };
  bottomBar: {
    copyright: string;
    links: FooterLink[];
  };
}

export interface PageBannerVariant {
  image: string;
  pages: {
    [key: string]: {
      title: string;
      breadcrumb: string[];
    };
  };
}

export interface ContentData {
  Tattoo: {
    templateComponents: {
      "template-1": {
        shared: {
          Topbar: string;
          Header: string;
          Footer: string;
          PageBanner: string;
          Contact?: string;
          Appointment?: string;
          AppointmentFeatures?: string;
        };
        pages: {
          home: {
            Hero: string;
            About: string;
            Services: string;
            Process: string;
            Team: string;
            Testimonials: string;
            Stats: string;
            CTA: string;
            Blogs: string;
          };
          team?: {
            Team: string;
          };
          about?: {
            About: string;
            Process: string;
            Stats: string;
            CTA: string;
          };
          gallery?: {
            Gallery: string;
          };
        }
      }
    };
    sections: {
      Topbar: {
        variants: {
          [key: string]: TopbarVariant;
        }
      };
      Header: {
        variants: {
          [key: string]: HeaderVariant;
        }
      };
      Hero: {
        variants: {
          [key: string]: HeroVariant;
        }
      };
      About: {
        variants: {
          [key: string]: AboutVariant;
        }
      };
      Services: {
        variants: {
          [key: string]: ServicesVariant;
        }
      };
      Process: {
        variants: {
          [key: string]: ProcessVariant;
        }
      };
      Team: {
        variants: {
          [key: string]: TeamVariant;
        }
      };
      Stats: {
        variants: {
          [key: string]: StatsVariant;
        }
      };
      Testimonials: {
        variants: {
          [key: string]: TestimonialVariant;
        }
      };
      CTA: {
        variants: {
          [key: string]: CTAVariant;
        }
      };
      Blogs: {
        variants: {
          [key: string]: BlogsVariant;
        }
      };
      Footer: {
        variants: {
          [key: string]: FooterVariant;
        }
      };
      PageBanner: {
        variants: {
          [key: string]: PageBannerVariant;
        }
      };
      Contact?: {
        variants: {
          [key: string]: ContactVariant;
        }
      };
      Appointment?: {
        variants: {
          [key: string]: AppointmentVariant;
        }
      };
      AppointmentFeatures?: {
        variants: {
          [key: string]: AppointmentFeaturesVariant;
        }
      };
    };
  }
}

export interface ContactField {
  label: string;
  placeholder: string;
}

export interface ContactVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  backgroundImage: string;
  contactItems: { label: string; value: string }[];
  followUsLabel: string;
  formSubtitle: string;
  formTitleLine1: string;
  formTitleLine2: string;
  formDescription: string;
  services: string[];
  fields: {
    name: ContactField;
    phone: ContactField;
    email: ContactField;
    service: ContactField;
    message: ContactField;
  };
  map?: {
    address: string;
    iframeSrc: string;
  };
  submitButton: string;
  successTitle: string;
  successMessage: string;
}

export interface AppointmentFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AppointmentVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  features: AppointmentFeature[];
  formSubtitle: string;
  formTitleLine1: string;
  formTitleLine2: string;
  formDescription: string;
  fields: {
    name: ContactField;
    phone: ContactField;
    email: ContactField;
    time: ContactField;
    date: ContactField;
    artist: ContactField;
    service: ContactField;
    message: ContactField;
  };
  submitButton: string;
  successTitle: string;
  successMessage: string;
}

export interface AppointmentFeaturesVariant {
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}
