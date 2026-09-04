export const SITE_URL = "https://openchecknow.lovable.app";

export interface Crumb {
  name: string;
  path: string;
}

/** Builds a schema.org BreadcrumbList JSON-LD string for a route. */
export function breadcrumbLd(crumbs: Crumb[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  });
}
