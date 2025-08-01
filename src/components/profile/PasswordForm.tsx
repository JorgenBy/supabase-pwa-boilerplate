import { useRef, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast, EToastTypes } from '../../contexts/ToastContext';
import { ETypes, MessageCard } from '../shared/MessageCard';

export default function PasswordForm() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const { updatePassword } = useAuth();
  const { showTypedToast } = useToast();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match');
    }

    const promises = [];
    setLoading(true);
    setError('');
    if (passwordRef.current?.value) {
      promises.push(updatePassword(passwordRef.current?.value));
    }

    Promise.all(promises)
      .then(() => {
        showTypedToast(EToastTypes.SUCCESS, 'Password updated successfully');
      })
      .catch((error) => {
        console.log(error);
        setError('Failed to update password!');
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <>
      <form autoComplete="off" className="space-y-" onSubmit={handleSubmit}>
        <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
        <div className="mb-5 -space-y-px rounded-md shadow-sm">
          <div>
            <label className="sr-only">Password</label>
            <input
              autoComplete="new-password"
              id="password"
              name="password"
              type="password"
              ref={passwordRef}
              className="relative block w-full appearance-none rounded-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="sr-only">Confirm Password</label>
            <input
              autoComplete="new-password"
              id="confirm-password"
              name="confirm-password"
              type="password"
              ref={passwordConfirmRef}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Password
          </button>
        </div>
      </form>
    </>
  );
}
