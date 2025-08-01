import { useRef, useState } from 'react';
import { ETypes, MessageCard } from '../shared/MessageCard';
import { useAuth } from '../../contexts/AuthContext';
import { EToastTypes, useToast } from '../../contexts/ToastContext';
import { UserInfo } from '../../types/types';

interface IProfileFormProps {
  userInfo: UserInfo;
  updateProfile: (profileUpdateObject: any) => Promise<void>;
}

export default function ProfileForm({
  userInfo,
  updateProfile,
}: IProfileFormProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const displayNameRef = useRef<HTMLInputElement>(null);
  const photoURLRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const { updateEmail } = useAuth();
  const { showTypedToast } = useToast();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current?.value !== userInfo.email) {
      promises.push(updateEmail(emailRef.current?.value));
    }
    if (
      displayNameRef.current?.value !== userInfo.displayName ||
      photoURLRef.current?.value
    ) {
      promises.push(
        updateProfile({
          display_name: displayNameRef.current?.value,
          photo_url: photoURLRef.current?.value,
        })
      );
    }
    if (colorRef.current?.value !== userInfo.color) {
      promises.push(
        updateProfile({
          color: colorRef.current?.value,
        })
      );
    }

    Promise.all(promises)
      .then(() => {
        showTypedToast(EToastTypes.SUCCESS, 'Profile updated!');
      })
      .catch((error) => {
        console.log(error);
        setError('Profile update failed');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <MessageCard message={error} type={ETypes.DANGER} visible={!!error} />
      <form autoComplete="off" className="space-y-" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="mb-5 -space-y-px rounded-md shadow-sm">
          <div>
            <label
              htmlFor="display-name"
              className="py-1 text-sm text-gray-500 flex items-center "
            >
              Display name
            </label>
            <input
              id="display-name"
              name="displayname"
              type="text"
              ref={displayNameRef}
              defaultValue={userInfo.displayName!}
              className="relative block w-full appearance-none rounded-none rounded-b-md 
                        rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 
                        focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Profil namn"
            />
          </div>
          <div>
            <div>
              <label
                htmlFor="email-address"
                className="py-1 text-sm text-gray-500 flex items-center "
              >
                E-mail adress
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                ref={emailRef}
                defaultValue={userInfo.email}
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="E-post adress"
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label
                htmlFor="photo-url"
                className="py-1 text-sm text-gray-500 flex items-center "
              >
                Profile picture URL
              </label>
              <input
                id="photo-url"
                name="photourl"
                type="text"
                ref={photoURLRef}
                defaultValue={userInfo.photoURL!}
                className="relative block w-full appearance-none rounded-none rounded-b-md rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Profilbild URL"
              />
            </div>
          </div>
          <div className="-space-y-px rounded-md shadow-sm ">
            <label
              htmlFor="user-color"
              className="py-1 text-sm text-gray-500 flex items-center "
            >
              Profile color
            </label>
            <input
              id="user-color"
              type="color"
              ref={colorRef}
              defaultValue={userInfo.color}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative transition-colors flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update profile
          </button>
        </div>
      </form>
    </>
  );
}
