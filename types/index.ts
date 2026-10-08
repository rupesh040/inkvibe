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

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: TeamSocialLink[];
}

export interface TeamVariant {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  members: TeamMember[];
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

export interface ContentData {
  Tattoo: {
    templateComponents: {
      "template-1": {
        shared: {
          Topbar: string;
          Header: string;
          Footer: string;
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
          }
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
      Footer: {
        variants: {
          [key: string]: FooterVariant;
        }
      };
    };
  }
}
