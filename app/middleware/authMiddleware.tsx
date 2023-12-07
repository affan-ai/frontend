// authMiddleware.js
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserAuth } from '@/app/context/authContext';

const useAuthMiddleware = (redirectTo = '/signin') => {
  const { user } = UserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(redirectTo); // Menggunakan router.replace untuk mengganti riwayat navigasi
    }
  }, [user, router, redirectTo]);

  return { user };
};

export default useAuthMiddleware;
