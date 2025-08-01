import { Spinner } from 'flowbite-react';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { userInfo } = useAuth();
  var loading = false; // Replace with actual loading state if needed

  return (
    <div>
      <div className="container mx-auto md:p-5">
        {loading ? (
          <div className="flex justify-center mx-auto pt-2">
            <Spinner size="xl" aria-label="Loading" />
          </div>
        ) : (
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
              {userInfo ? (
                <p className="text-lg">
                  Welcome, {userInfo.displayName || 'User'}!
                </p>
              ) : (
                <p className="text-lg">Loading user information...</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
