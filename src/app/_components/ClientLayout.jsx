'use client';

import { useEffect, useState } from 'react';
import { GoogleOneTap } from '@clerk/nextjs';

export default function ClientLayout({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted && <GoogleOneTap />}
      {children}
    </>
  );
}
