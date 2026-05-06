import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    domain: string
  }
}

// Generate static params for all validated domains
export async function generateStaticParams() {
  const validatedDomains = [
    'acroyoga.art',
    'hearthelddance.com', 
    'heartheldharmony.com',
    'hearthelddance.org',
    'eugenebutcher.art',
    'partneryogabali.com',
    'heartheld.dance',
    // Add remaining 8 domains here
  ]
  
  return validatedDomains.map((domain) => ({
    domain: domain,
  }))
}

// Generate metadata for each domain
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { domain } = params
  
  // Domain-specific content mapping
  const domainContent: Record<string, { title: string; description: string }> = {
    'acroyoga.art': {
      title: 'AcroYoga as an Artform',
      description: 'A celebration of moving meditation.'
    },
    'hearthelddance.com': {
      title: 'Heart Held Dance',
      description: 'Moving from the center of being.'
    },
    'heartheldharmony.com': {
      title: 'Heart Held Harmony',
      description: 'The architecture of connection.'
    },
    'partneryogabali.com': {
      title: 'Partner Yoga Bali',
      description: 'Sovereign practice in the heart of Bali.'
    },
    'eugenebutcher.art': {
      title: 'Eugene Butcher',
      description: '2nd Brain Architecture and Creative Direction.'
    },
    'heartheld.dance': {
      title: 'Heart Held Dance',
      description: 'Moving from the center of being.'
    }
  }
  
  const content = domainContent[domain] || {
    title: 'SOVEREIGN ENGINE',
    description: 'v2.0 - Multi-tenant authority platform'
  }
  
  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
    },
  }
}

export default function DomainPage({ params }: PageProps) {
  const { domain } = params
  
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
  
  // Domain-specific content
  const domainContent: Record<string, { heading: string; body: string }> = {
    'acroyoga.art': {
      heading: 'AcroYoga as an Artform',
      body: 'A celebration of moving meditation.'
    },
    'hearthelddance.com': {
      heading: 'Heart Held Dance',
      body: 'Moving from the center of being.'
    },
    'heartheldharmony.com': {
      heading: 'Heart Held Harmony',
      body: 'The architecture of connection.'
    },
    'partneryogabali.com': {
      heading: 'Partner Yoga Bali',
      body: 'Sovereign practice in the heart of Bali.'
    },
    'eugenebutcher.art': {
      heading: 'Eugene Butcher',
      body: '2nd Brain Architecture and Creative Direction.'
    },
    'heartheld.dance': {
      heading: 'Heart Held Dance',
      body: 'Moving from the center of being.'
    }
  }
  
  const content = domainContent[domain] || {
    heading: 'SOVEREIGN ENGINE',
    body: 'v2.0 - Multi-tenant authority platform'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">{content.heading}</h1>
        <p className="text-xl text-gray-600">{content.body}</p>
        <div className="mt-8 text-sm text-gray-500">
          Domain: {domain}
        </div>
      </div>
    </div>
  )
}
