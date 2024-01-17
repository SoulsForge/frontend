import { useContext } from 'react';
import { AuthContext } from '@/lib/contexts/auth/auth-context';


const useAuth = () => useContext(AuthContext);

export default useAuth;