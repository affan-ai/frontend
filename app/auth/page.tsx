import { AuthContextProvider } from '../context/authContext';
import LoginForm from '../components/LoginForm';

export default function login() {
  return (
    
    <div className='p-4'><AuthContextProvider><LoginForm /></AuthContextProvider></div>
    
  )
}