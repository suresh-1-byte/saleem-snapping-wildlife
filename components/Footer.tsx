import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-charcoal">
      <div className="container-padding py-12 md:py-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <p className="text-sm md:text-base opacity-80">
            Saleem Snapping <span className="text-muted-olive">•</span> Wildlife Photographer <span className="text-muted-olive">•</span> Chennai, India
          </p>
          <Image
            src="/images/watermark.png"
            alt="Saleem Snapping signature"
            width={240}
            height={96}
            className="w-40 md:w-52 h-auto object-contain"
          />
          <div className="flex items-center space-x-6 text-sm opacity-60">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity duration-300"
            >
              Instagram
            </Link>
            <span>•</span>
            <Link
              href="mailto:[your email]"
              className="hover:opacity-100 transition-opacity duration-300"
            >
              Email
            </Link>
            <span>•</span>
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
