import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import AnimatedSection from "@/components/AnimatedSection";
import { LeafDoodle } from "@/components/Doodles";
import { getContactSettings } from "@/lib/contactSettingsStore";

export const metadata: Metadata = {
  title: "Contact | Saleem Snapping",
  description: "Get in touch for wildlife projects, collaborations, publication requests or photography opportunities.",
  openGraph: {
    title: "Contact | Saleem Snapping",
    description: "Get in touch for wildlife projects, collaborations, publication requests or photography opportunities.",
  },
};

export default async function ContactPage() {
  // Edited in the admin panel's Contact tab.
  const contact = await getContactSettings();

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Image */}
        <ContactHero />

        <LeafDoodle className="absolute top-1/4 left-10 w-24 h-24 text-earthy-green z-10 hidden lg:block" />

        {/* Content */}
        <div className="relative z-10 pt-32 pb-16">
          <div className="container-padding">
            <div className="max-w-3xl mx-auto">
              <AnimatedSection>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider mb-8 uppercase">
                  Let&apos;s Connect
                </h1>
              </AnimatedSection>
              
              <AnimatedSection delay={0.1}>
                <p className="text-xl opacity-90 mb-12 leading-relaxed">
                  Have a wildlife project, collaboration, publication request or
                  photography opportunity?
                </p>
              </AnimatedSection>

              <div className="space-y-8 mb-16">
                {contact.email && (
                  <AnimatedSection delay={0.2}>
                    <div>
                      <div className="text-sm tracking-wider uppercase opacity-60 mb-2">
                        Email
                      </div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-lg break-all hover:opacity-70 transition-opacity duration-300"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </AnimatedSection>
                )}

                {contact.instagramUrl && (
                  <AnimatedSection delay={0.3}>
                    <div>
                      <div className="text-sm tracking-wider uppercase opacity-60 mb-2">
                        Instagram
                      </div>
                      <a
                        href={contact.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg break-all hover:opacity-70 transition-opacity duration-300"
                      >
                        @{contact.instagramUsername}
                      </a>
                    </div>
                  </AnimatedSection>
                )}
                
                <AnimatedSection delay={0.4}>
                  <div>
                    <div className="text-sm tracking-wider uppercase opacity-60 mb-2">
                      Location
                    </div>
                    <p className="text-lg">Chennai, India</p>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.5}>
                <ContactForm />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
