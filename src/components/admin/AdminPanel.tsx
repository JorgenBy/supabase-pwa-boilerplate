import UserCards from './UserCards';
import { useEffect } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { useMediaQuery } from 'react-responsive';
import { Spinner } from 'flowbite-react';

const AdminPanel = () => {
  const { listUsers, allUsers, loading, approveUser, rejectUser, createAdmin } =
    useAdmin();

  // set different background classes for mobile and desktop
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  let bgClass = isTabletOrMobile ? ' bg-slate-50/90' : ' bg-slate-50/50';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await listUsers();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div
        className={
          'flex flex-col justify-center mx-auto p-2 rounded-lg' + bgClass
        }
      >
        <div className="text-center">
          <Spinner className="" size="xl" aria-label="Laddar användare" />
        </div>
        <p className="text-center pt-2">Loading users...</p>
      </div>
    );
  }
  return (
    <UserCards
      users={allUsers}
      approveUser={approveUser}
      rejectUser={rejectUser}
      makeAdmin={createAdmin}
    />
  );
};

export default AdminPanel;
