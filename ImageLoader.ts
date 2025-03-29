/* eslint-disable @typescript-eslint/no-explicit-any */
// Docs: https://www.contentful.com/developers/docs/references/images-api/
export default function contentfulLoader({ src, width, quality }: any) {
  const url = new URL(`https://d3ce763r42l5ye.cloudfront.net${src}`);
  // d3ce763r42l5ye.cloudfront.net/
  url.searchParams.set('fm', 'webp');
  url.searchParams.set('w', width.toString());
  url.searchParams.set('q', (quality || 75).toString());
  return url.href;
}
