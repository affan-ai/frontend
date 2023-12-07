import { AuthContextProvider } from '@/app/context/authContext';
import LoginForm from '@/components/LoginForm';

export default function login() {
  return (
    
      <AuthContextProvider>
        <LoginForm />
        </AuthContextProvider>
    
  )
}