'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Zap, Star, Package } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=1400&q=90'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1400&q=90'
const SECONDARY_IMAGE = 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=1200&q=90'

const trustItems = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over 250 PLN' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'No questions asked' },
  { icon: Shield, label: 'Secure Checkout', sub: '256-bit SSL encryption' },
  { icon: Package, label: 'Premium Quality', sub: 'Every stitch, perfected' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubmitted(true)
  }

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-[#0f0f0f] overflow-hidden min-h-[88vh] flex items-center">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="Vaulted — Premium Streetwear"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container-custom py-24 lg:py-32">
          <div className="max-w-xl space-y-7 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70">
              <Zap className="h-3 w-3" />
              New Drop — Limited Stock
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.06] tracking-tight">
              Wear What<br />
              <span className="text-[#d4a853]">Matters.</span>
            </h1>

            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Premium zip-up hoodies built for real life. Structured fit, heavyweight fleece, zero compromise.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-[#0f0f0f] px-8 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-white/90 transition-colors"
                prefetch={true}
              >
                Shop the Drop
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-wide hover:border-white hover:bg-white/5 transition-colors"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-[#0f0f0f] bg-gradient-to-br from-gray-400 to-gray-600"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#d4a853] text-[#d4a853]" />
                  ))}
                </div>
                <span className="text-xs text-white/60">Loved by 2,400+ customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ────────────────────────────────────── */}
      <section className="bg-[#1a1a1a] text-white border-y border-white/10">
        <div className="container-custom py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 flex-shrink-0 text-[#d4a853]" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-semibold text-white">{label}</p>
                  <p className="text-xs text-white/40">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─────────────────────────────────── */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="h-8 w-48 skeleton rounded mx-auto mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] skeleton rounded" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── BRAND STORY / EDITORIAL ─────────────────────── */}
      <section className="py-section bg-[#f8f7f5]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">The Vaulted Standard</p>
              <h2 className="text-h2 font-heading font-bold leading-tight">
                Designed to outlast trends. Built to last seasons.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We started Vaulted because we were tired of buying hoodies that lost their shape after two washes. Every piece we make is obsessively tested for fit, weight, and longevity. When you wear Vaulted, you feel the difference.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  '400 GSM heavyweight French terry fleece',
                  'Structured hood — holds shape wash after wash',
                  'YKK zippers. Every time.',
                  'Garment-dyed for a rich, lived-in finish',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 h-4 w-4 rounded-full bg-[#0f0f0f] flex-shrink-0 flex items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4a853]" />
                    </span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide link-underline pb-0.5"
                prefetch={true}
              >
                Shop the Collection
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative aspect-[4/5] bg-muted rounded-sm overflow-hidden">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Vaulted — The Quality Standard"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECONDARY CTA / FEATURE VISUAL ─────────────── */}
      <section className="relative overflow-hidden bg-[#0f0f0f] py-section">
        <div className="absolute inset-0">
          <Image
            src={SECONDARY_IMAGE}
            alt="Vaulted Lifestyle"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f0f]/60 via-transparent to-[#0f0f0f]/80" />
        </div>
        <div className="relative container-custom text-center text-white space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d4a853] font-semibold">Limited Quantities</p>
          <h2 className="text-h1 font-heading font-bold">The Drop Won&apos;t Wait.</h2>
          <p className="text-white/60 max-w-md mx-auto leading-relaxed">
            Our current drop is nearly sold through. Once it&apos;s gone, it&apos;s gone. No restocks. No exceptions.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#d4a853] text-[#0f0f0f] px-10 py-4 text-sm font-bold uppercase tracking-wide hover:bg-[#c49840] transition-colors"
          >
            Secure Yours Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── NEWSLETTER ──────────────────────────────────── */}
      <section className="py-section border-t">
        <div className="container-custom max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-3">Early Access</p>
          <h2 className="text-h2 font-heading font-bold">Be First In Line.</h2>
          <p className="mt-3 text-muted-foreground">
            Get exclusive early access to new drops, restocks, and member-only discounts.
          </p>
          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-green-700">
              <Shield className="h-4 w-4" />
              You&apos;re in. We&apos;ll be in touch.
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 border border-border bg-transparent px-4 py-3.5 text-sm placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-foreground text-background px-6 py-3.5 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Join the List
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
