import { AuthContextProvider } from '@/app/context/authContext';
import LoginForm from '@/components/LoginForm';
import SignIn from '@/components/SignIn';

export default function login() {
  return (
    
    <div className='p-4'>
      <AuthContextProvider>
        <LoginForm />
        </AuthContextProvider></div>
    
  )
}