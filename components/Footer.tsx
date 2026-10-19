import { SiteImage } from "@/components/SiteImagesProvider";
import type { ContactSettings } from "@/lib/contactSettings";

export default function Footer({ contact }: { contact: ContactSettings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-charcoal">
      <div className="container-padding py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-sm md:text-base opacity-80">
            Saleem Snapping <span className="text-muted-olive">•</span> Wildlife Photographer <span className="text-muted-olive">•</span> Chennai, India
          </p>
          <SiteImage
            src="/images/watermark.png"
            deliveryWidth={480}
            alt="Saleem Snapping signature"
            width={240}
            height={96}
            className="w-40 md:w-52 h-auto object-contain"
          />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm opacity-60">
            {contact.instagramUrl && (
              <>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 transition-opacity duration-300"
                >
                  Instagram
                </a>
                <span aria-hidden="true">•</span>
              </>
            )}
            {contact.email && (
              <>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:opacity-100 transition-opacity duration-300"
                >
                  Email
                </a>
                <span aria-hidden="true">•</span>
              </>
            )}
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
