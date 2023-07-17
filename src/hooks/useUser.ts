'use client';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize
    supabase.auth.getSession().then((session) => {
      setUser(session.data.session?.user ?? null);
      setIsLoading(false);
    });

    // Subscribe to changes
    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setIsLoading(false);
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

  return { user, logout, isLoading };
}
