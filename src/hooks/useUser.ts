'use client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // initialize user state
    supabase.auth.getSession().then((session) => {
      setUser(session.data.session?.user ?? null);
    });

    // Listen for changes on auth state
    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  return user;
}
