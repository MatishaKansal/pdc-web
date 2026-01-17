'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        if (isMounted) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      try {
        const ref = doc(db, 'Users', firebaseUser.uid);
        const snap = await getDoc(ref);

        if (!isMounted) return;

        if (snap.exists()) {
          const data = snap.data();

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: data.name || '',
            studentId: data.studentId || data.student_id || '',
            college: data.college || data.collegeName || '',
            member: data.member ?? false,
          });

        } else {
          // 🔁 Safety fallback (should not normally happen)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'User',
            member: false,
          });
        }
      } catch (err) {
        console.error('Auth fetch error:', err);
        if (isMounted) setUser(null);
      }

      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    await signOut(auth);
    setUser(null); // 🔥 FORCE navbar refresh
  };

  return { user, loading, logout };
}