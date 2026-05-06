import { Metadata } from 'next'
import { useDomainSEO } from '@/components/SEO'

interface LayoutProps {
  children: React.ReactNode
  params: {
    domain: string
  }
}

// Design token mapping from brands table
const designTokens: Record<string, { primaryColor: string; fontFamily: string }> = {
  'acroyoga.art': {
    primaryColor: '#2563eb',
    fontFamily: 'Inter, sans-serif'
  },
  'hearthelddance.com': {
    primaryColor: '#dc2626',
    fontFamily: 'Georgia, serif'
  },
  'heartheldharmony.com': {
    primaryColor: '#059669',
    fontFamily: 'Inter, sans-serif'
  },
  'partneryogabali.com': {
    primaryColor: '#7c3aed',
    fontFamily: 'Georgia, serif'
  },
  'eugenebutcher.art': {
    primaryColor: '#000000',
    fontFamily: 'Inter, sans-serif'
  },
  'heartheld.dance': {
    primaryColor: '#dc2626',
    fontFamily: 'Georgia, serif'
  }
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { domain } = params
  return useDomainSEO(domain)
}

export default function DomainLayout({ children, params }: LayoutProps) {
  const { domain } = params
  const tokens = designTokens[domain] || {
    primaryColor: '#000000',
    fontFamily: 'Inter, sans-serif'
  }

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --primary-color: ${tokens.primaryColor};
            --font-family: ${tokens.fontFamily};
          }
          
          body {
            font-family: var(--font-family);
            --primary-color: ${tokens.primaryColor};
          }
          
          .primary-color {
            color: var(--primary-color);
          }
          
          .bg-primary {
            background-color: var(--primary-color);
          }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
