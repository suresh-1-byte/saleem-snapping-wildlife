"use client";

import { usePathname } from "next/navigation";
import { AmbientSoundProvider } from "@/components/AmbientSound";

/**
 * Website header, footer and background music. The admin panel has its own
 * header, so none of these are shown under /admin.
 */
export default function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <AmbientSoundProvider>
      {header}
      <main>{children}</main>
      {footer}
    </AmbientSoundProvider>
  );
}
