import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export interface ISocialSignInProps {
  enabled?: boolean;
  setError: (error: string) => void;
}

export function SocialSignIn({ enabled = true, setError }: ISocialSignInProps) {
  const { googleSignin } = useAuth();
  const navigate = useNavigate();

  async function handleGoogleLogin(): Promise<void> {
    try {
      setError('');
      await googleSignin();
      navigate('/');
    } catch {
      setError('Failed to log in with Google');
    }
  }

  return (
    <div className=" gap-2 flex justify-between flex-wrap">
      <button
        onClick={handleGoogleLogin}
        aria-label="Sign in with Google"
        disabled={!enabled}
        className="flex items-center justify-center w-full gap-2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <FaGoogle className="h-5 w-5 text-red-600" />
        <span>Google</span>
      </button>
    </div>
  );
}
