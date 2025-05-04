'use client';
import { useEffect, useState } from 'react';
import { UserButton } from '@clerk/nextjs';

export default function UserButtonWrapper() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <UserButton />;
}
