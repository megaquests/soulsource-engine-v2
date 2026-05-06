import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    domain: string
    slug: string
  }
}

// Generate static params for all domain/slug combinations
export async function generateStaticParams() {
  const validatedDomains = [
    'acroyoga.art',
    'hearthelddance.com', 
    'heartheldharmony.com',
    'hearthelddance.org',
    'eugenebutcher.art',
    'partneryogabali.com',
    'heartheld.dance',
  ]
  
  // Common slugs for spoke pages
  const commonSlugs = ['about', 'services', 'contact', 'blog', 'manifesto']
  
  const params = []
  for (const domain of validatedDomains) {
    for (const slug of commonSlugs) {
      params.push({ domain, slug })
    }
  }
  
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { domain, slug } = params
  
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | ${domain}`,
    description: `Learn more about ${slug} at ${domain}`,
  }
}

export default function DomainSlugPage({ params }: PageProps) {
  const { domain, slug } = params
  
  // Validate domain
  const validatedDomains = [
    'acroyoga.art',
    'hearthelddance.com', 
    'heartheldharmony.com',
    'hearthelddance.org',
    'eugenebutcher.art',
    'partneryogabali.com',
    'heartheld.dance',
  ]
  
  if (!validatedDomains.includes(domain)) {
    notFound()
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">{domain}</h1>
        <p className="text-xl text-gray-600 mb-4">{slug}</p>
        <div className="text-sm text-gray-500">
          Domain: {domain} | Slug: {slug}
        </div>
        <div className="mt-8">
          <a href={`/${domain}`} className="text-blue-600 hover:underline">
            ← Back to {domain}
          </a>
        </div>
      </div>
    </div>
  )
}
