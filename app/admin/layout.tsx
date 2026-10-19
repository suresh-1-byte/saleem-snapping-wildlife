// The root layout already provides <html> and <body>, and hides the website
// header, footer and music on admin pages (see components/SiteChrome.tsx).
// Rendering another <html>/<body> here nested them inside the website page,
// which made the footer jump to the top until the page was refreshed.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
