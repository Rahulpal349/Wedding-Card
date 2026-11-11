import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#6F0E20] text-[#FFF8EC] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 text-[#F2B705] mb-4">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-90">
          <circle cx="50" cy="50" r="40" stroke="#F2B705" strokeWidth="3" fill="none" />
          <path d="M30 40 Q50 20 70 40" stroke="#F2B705" strokeWidth="3" fill="none" />
          <circle cx="50" cy="50" r="5" fill="#F2B705" />
        </svg>
      </div>
      <h1 className="font-display-bn text-3xl sm:text-4xl font-bold mb-2">
        পাতাটি খুঁজে পাওয়া যায়নি
      </h1>
      <p className="font-display text-base sm:text-lg text-[#FFF8EC]/80 mb-6">
        Page Not Found (404)
      </p>
      <Link
        href="/bn"
        className="px-6 py-2.5 rounded-full bg-[#FFF8EC] text-[#6F0E20] font-bold text-sm sm:text-base hover:bg-[#F6E9D2] transition-all shadow-lg"
      >
        বিবাহের আমন্ত্রণপত্রে ফিরুন
      </Link>
    </div>
  );
}
