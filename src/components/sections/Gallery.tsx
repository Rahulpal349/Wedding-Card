'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { event } from '../../../content/event';
import Lightbox, { GalleryPhoto } from '@/components/ui/Lightbox';
import KanthaStitchSVG from '@/components/motifs/KanthaStitch';
import PaanLeafSVG from '@/components/motifs/PaanLeaf';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const t = useTranslations('gallery');
  const locale = useLocale();

  const photos: GalleryPhoto[] = event.gallery || [];

  const handleOpen = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleClose = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  return (
    <section className="bg-[#FFF8EC] py-20 md:py-28 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-10 h-10 text-[#2F5D3A] mx-auto mb-3 opacity-80">
            <PaanLeafSVG />
          </div>
          <h2
            className={
              locale === 'bn'
                ? 'font-display-bn text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold mb-2'
                : 'font-display text-3xl sm:text-4xl md:text-5xl text-[#B3172F] font-bold mb-2'
            }
          >
            {t('title')}
          </h2>
          <p className="font-display text-base text-[#B5532E] tracking-widest uppercase mb-4">
            {t('subtitle')}
          </p>
          <div className="max-w-xs mx-auto text-[#B5532E]/40">
            <KanthaStitchSVG />
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo, index) => {
            const title = locale === 'bn' ? photo.titleBn : photo.titleEn;
            const caption = locale === 'bn' ? photo.captionBn : photo.captionEn;

            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleOpen(index)}
                aria-label={`${t('viewPhoto')}: ${title}`}
                className="group relative bg-[#F6E9D2] rounded-2xl p-4 sm:p-5 border border-[#B5532E]/25 shadow-md text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705] cursor-pointer"
              >
                {/* Visual Thumbnail Area */}
                <div className="relative aspect-[4/3] bg-[#FFF8EC] rounded-xl flex flex-col items-center justify-center p-6 border border-dashed border-[#B5532E]/30 overflow-hidden mb-4">
                  <div className="w-16 h-16 text-[#B3172F] opacity-75 group-hover:scale-110 transition-transform duration-300">
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                      <rect x="10" y="15" width="80" height="70" rx="8" strokeWidth="2.5" />
                      <circle cx="35" cy="40" r="10" />
                      <path d="M15 75 L45 45 L70 70 L85 55" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  {/* Subtle hover icon overlay */}
                  <div className="absolute inset-0 bg-[#6F0E20]/0 group-hover:bg-[#6F0E20]/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full bg-[#FFF8EC] text-[#6F0E20] text-xs font-bold shadow-md">
                      {t('viewPhoto')}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <h3
                  className={
                    locale === 'bn'
                      ? 'font-display-bn text-xl sm:text-2xl font-bold text-[#6F0E20] mb-1'
                      : 'font-display text-xl sm:text-2xl font-bold text-[#6F0E20] mb-1'
                  }
                >
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-[#3A0D14]/70 line-clamp-2">
                  {caption}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          locale={locale}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}

