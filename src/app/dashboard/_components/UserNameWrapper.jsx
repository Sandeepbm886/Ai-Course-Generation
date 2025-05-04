'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function UserNameWrapper() {
  const [hasMounted, setHasMounted] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !isLoaded) return null;

  return (
    <span>
      {user.fullName || user.username || user.emailAddresses[0]?.emailAddress}
    </span>
  );
}
