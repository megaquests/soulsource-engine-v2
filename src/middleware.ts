import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  
  // Extract domain from hostname (remove www prefix if present)
  const domain = hostname?.replace(/^www\./, '') || ''
  
  // List of validated domains
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
  
  // Check if domain is in our validated list
  if (validatedDomains.includes(domain)) {
    // Rewrite to the domain-specific page
    const url = request.nextUrl.clone()
    url.pathname = `/${domain}${url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  // Default behavior for non-validated domains
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|static).*)'],
}
