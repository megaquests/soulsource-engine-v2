import { Metadata } from 'next'

interface SEOProps {
  title: string
  description: string
  domain: string
  slug?: string
  keywords?: string[]
  featuredImage?: string
  publishedAt?: string
  author?: string
  type?: 'website' | 'article'
}

export function generateSEOData({
  title,
  description,
  domain,
  slug = '',
  keywords = [],
  featuredImage,
  publishedAt,
  author,
  type = 'website'
}: SEOProps): Metadata {
  const url = `https://${domain}${slug ? `/${slug}` : ''}`
  
  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebPage',
    headline: title,
    description: description,
    url: url,
    image: featuredImage ? [featuredImage] : undefined,
    datePublished: publishedAt,
    dateModified: new Date().toISOString(),
    author: author ? {
      '@type': 'Person',
      name: author
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: domain,
      url: `https://${domain}`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return {
    title: title,
    description: description,
    keywords: keywords.join(', '),
    openGraph: {
      title: title,
      description: description,
      type: type,
      url: url,
      siteName: domain,
      images: featuredImage ? [{
        url: featuredImage,
        width: 1200,
        height: 630,
        alt: title
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: featuredImage ? [featuredImage] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'application/ld+json': JSON.stringify(jsonLd),
    },
  }
}

// Component for rendering JSON-LD schema
export function JSONLDSchema({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Hook for generating domain-specific SEO data
export function useDomainSEO(domain: string, slug?: string) {
  const domainSEOData: Record<string, { title: string; description: string; keywords: string[] }> = {
    'acroyoga.art': {
      title: 'AcroYoga as an Artform',
      description: 'A celebration of moving meditation and partner yoga practices.',
      keywords: ['acroyoga', 'meditation', 'movement', 'artform', 'partner yoga']
    },
    'hearthelddance.com': {
      title: 'Heart Held Dance',
      description: 'Moving from the center of being through heart-centered dance practices.',
      keywords: ['dance', 'heart', 'movement', 'meditation', 'centered dance']
    },
    'heartheldharmony.com': {
      title: 'Heart Held Harmony',
      description: 'The architecture of connection through movement and harmony.',
      keywords: ['harmony', 'connection', 'movement', 'dance', 'heart']
    },
    'partneryogabali.com': {
      title: 'Partner Yoga Bali',
      description: 'Sovereign practice in the heart of Bali - partner yoga and connection.',
      keywords: ['partner yoga', 'bali', 'connection', 'practice', 'sovereign']
    },
    'eugenebutcher.art': {
      title: 'Eugene Butcher',
      description: '2nd Brain Architecture and Creative Direction.',
      keywords: ['creative direction', 'architecture', '2nd brain', 'art']
    },
    'heartheld.dance': {
      title: 'Heart Held Dance',
      description: 'Moving from the center of being through heart-centered practices.',
      keywords: ['dance', 'heart', 'movement', 'meditation', 'centered']
    }
  }

  const seoData = domainSEOData[domain] || {
    title: 'SOVEREIGN ENGINE',
    description: 'v2.0 - Multi-tenant authority platform',
    keywords: ['sovereign', 'engine', 'authority', 'platform']
  }

  return generateSEOData({
    title: seoData.title,
    description: seoData.description,
    domain: domain,
    slug: slug,
    keywords: seoData.keywords,
    type: slug ? 'article' : 'website'
  })
}
