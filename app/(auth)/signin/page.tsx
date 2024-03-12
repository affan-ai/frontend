import { AuthContextProvider } from '@/app/context/authContext';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Login | Rwikistat',
  description: 'Rwikistat Learning App for Data Science, under licensed by ApanJago and Lifeofrifai',
}

export default function login() {
  return (
    
      <AuthContextProvider>
        <LoginForm />
        </AuthContextProvider>
    
  )
}