'use client';

import { useEffect } from 'react';

export default function RootPage() {
  useEffect(() => {
    const locale = localStorage.getItem('preferred-locale') || 'en';
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <div className="min-h-screen bg-maroon" aria-hidden="true" />
  );
}
