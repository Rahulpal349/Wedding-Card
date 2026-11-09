import { setRequestLocale } from 'next-intl/server';
import Gate from '@/components/sections/Gate';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import TheCouple from '@/components/sections/TheCouple';
import WeddingDetails from '@/components/sections/WeddingDetails';
import Nimontron from '@/components/sections/Nimontron';
import Ceremonies from '@/components/sections/Ceremonies';
import Venue from '@/components/sections/Venue';
import OurStory from '@/components/sections/OurStory';
import Gallery from '@/components/sections/Gallery';
import Footer from '@/components/sections/Footer';
import PauseAnimations from '@/components/ui/PauseAnimations';

export function generateStaticParams() {
  return [{ locale: 'bn' }, { locale: 'en' }];
}

export default async function WeddingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* 0. Gate: Ceremonial Cover, Diya & Shankha Still Life, Split-Door with Chime */}
      <Gate />

      {/* Persistent Floating Header Bar: [বাংলা | EN] Pill, Sound Toggle, Hamburger Menu */}
      <Navbar />

      {/* Pause Animations Toggle (Fixed bottom left) */}
      <PauseAnimations />

      {/* Single-Page Scroll Sections Matching Reference Panels */}
      <main className="relative bg-[#FFF8EC]">
        {/* 1. Hero: Invitation with Mango Leaf Garland, Couple Illustration, Drifting Petals, Countdown */}
        <section id="hero">
          <Hero />
        </section>

        {/* 2. The Couple: Arched Portraits of Jhilik & Koushik, Heart, Jora Mach Motif */}
        <section id="couple">
          <TheCouple />
        </section>

        {/* 3. Wedding Details: Date, Ceremony Time, Venue with Folk Thatched Village Illustration */}
        <section id="details">
          <WeddingDetails />
        </section>

        {/* 4. Family Invitation: Bishnupur Terracotta Horse Relief, Invitation Note, Mangal Kalash */}
        <section id="blessings">
          <Nimontron />
        </section>

        {/* 5. Wedding Events Timeline: Gaye Holud, Shubho Bibaho, Boubhat with Calendar Links */}
        <section id="events">
          <Ceremonies />
        </section>

        {/* 6. Venue & Location: Twilight Rajbari Courtyard with Lanterns & Alpona, Map & Travel */}
        <section id="venue">
          <Venue />
        </section>

        {/* 7. Our Story: Five Milestones on Animated Kantha Stitch Line */}
        <section id="story">
          <OurStory />
        </section>

        {/* 8. Gallery: Cherished Moments Grid with Full-Screen Lightbox */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* 9. Closing Blessings & Bidaay Footer: Bride's Hands with Paan, Jora Mach, Share Link */}
        <Footer />
      </main>
    </>
  );
}
