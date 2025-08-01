import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ETypes, MessageCard } from '../shared/MessageCard';
import { MainContainer } from '../layout/MainContainer';

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();
  const [messageType, setMessageType] = useState<ETypes>(ETypes.DANGER);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      setMessage('');
      setLoading(true);
      await resetPassword(emailRef.current?.value);
      setMessageType(ETypes.SUCCESS);
      setMessage('Check your email for password reset instructions.');
    } catch {
      setMessageType(ETypes.DANGER);
      setMessage('Password reset failed. Please try again.');
    }

    setLoading(false);
  }
  return (
    <>
      <MainContainer>
        <div className="text-center mb-4">
          <h1 className="text-center text-gray-900">Återställ ditt lösenord</h1>
        </div>
        <MessageCard
          title={messageType == ETypes.SUCCESS ? 'Success' : 'Error'}
          message={message}
          type={messageType}
          visible={!!message}
        />
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-mail adress
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                required
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="E-mail address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Send instructions
            </button>
          </div>
          <div className="text-sm text-left">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to="/login"
            >
              Back to login
            </Link>
          </div>
        </form>
      </MainContainer>
    </>
  );
}
