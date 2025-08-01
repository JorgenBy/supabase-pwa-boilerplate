import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ETypes, MessageCard } from '../components/shared/MessageCard';
import { SpacerWithText } from '../components/shared/SpacerWithText';
import { SocialSignIn } from '../components/auth/SocialSignIn';
import { MainContainer } from '../components/layout/MainContainer';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/');
  }, []);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current?.value, passwordRef.current?.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }
  return (
    <>
      <MainContainer>
        <div className="text-center mb-4">
          <h1 className="text-center text-gray-900">Login</h1>
        </div>
        <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
        <SocialSignIn setError={setError} enabled={!loading} />
        <div className="text-center text-sm text-gray-500 mt-4  pt-10">
          <SpacerWithText text="Login with password" />
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef}
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
          <div className="text-sm">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/signup"
            >
              No account? Sign up
            </Link>
          </div>
          <div className="text-sm">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </MainContainer>
    </>
  );
}
