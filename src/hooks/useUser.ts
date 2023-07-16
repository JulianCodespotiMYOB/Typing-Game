'use client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initialize
    supabase.auth.getSession().then((session) => {
      setUser(session.data.session?.user ?? null);
    });

    // Subscribe to changes
    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    // Unsubscribe from changes
    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, []);

  const logout = () => {
    supabase.auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .then(() => {
        window.location.reload();
      });
  };

  return { user, logout };
}
