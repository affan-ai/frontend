import { AuthContextProvider } from '@/app/context/authContext';
import LoginForm from '@/components/LoginForm';
import SignIn from '@/components/SignIn';

export default function login() {
  return (
    
      <AuthContextProvider>
        <LoginForm />
        </AuthContextProvider>
    
  )
}