import React from 'react';
import {
  AiOutlineCheckSquare,
  AiOutlineCloseSquare,
  AiOutlineUser,
} from 'react-icons/ai';
import { GrUserAdmin } from 'react-icons/gr';
import { AppUser, UserInfo } from '../../types/types';
import { Card, Modal, Spinner } from 'flowbite-react';
import { useAdmin } from '../../contexts/AdminContext';

interface Props {
  users: AppUser[];
  approveUser: (email: string) => Promise<void>;
  rejectUser: (email: string) => Promise<void>;
  makeAdmin: (email: string) => Promise<void>;
}

const UserCards: React.FC<Props> = ({
  users,
  approveUser,
  rejectUser,
  makeAdmin,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [userToView, setUserToView] = React.useState<UserInfo | null>(null);

  const { getUser } = useAdmin();

  const handleModalOpen = async (userId: string) => {
    let user = await getUser(userId);
    setUserToView(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setUserToView(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="divide-y divide-gray-400 p-4 bg-gray-100 shadow rounded-lg"
            >
              <div className="pb-2 relative">
                <h3 className="text-lg font-medium">{user.displayname}</h3>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500 flex items-center">
                  Admin:{' '}
                  {user.isAdmin ? (
                    <AiOutlineCheckSquare className="ml-1" />
                  ) : (
                    <AiOutlineCloseSquare className="ml-1" />
                  )}
                </p>
                <p className="text-gray-500 flex items-center">
                  Approved:{' '}
                  {user.isApproved ? (
                    <AiOutlineCheckSquare className="ml-1" />
                  ) : (
                    <AiOutlineCloseSquare className="ml-1" />
                  )}
                </p>
                {user.isAdmin && (
                  <div className="absolute top-0 right-0 ">
                    <GrUserAdmin />
                  </div>
                )}
              </div>
              {!user.isApproved ? (
                <div className="flex justify-center space-x-5 items-center pt-2">
                  <button
                    onClick={() => approveUser(user.email)}
                    type="button"
                    className="bg-green-500 hover:bg-green-700 text-green-900 font-bold py-2 px-4 rounded-md focus:ring-4 focus:outline-none focus:ring-green-300 text-sm text-center inline-flex items-center mr-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <AiOutlineCheckSquare className="mr-1" size="1.5em" />
                    Approve
                  </button>
                  <button
                    onClick={() => rejectUser(user.email)}
                    type="button"
                    className="bg-red-500 hover:bg-red-700 text-red-900 font-bold py-2 px-4 rounded-md focus:ring-4 focus:outline-none focus:ring-red-300 text-sm text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <AiOutlineCloseSquare className="mr-1" size="1.5em" />
                    Reject
                  </button>
                </div>
              ) : !user.isAdmin ? (
                <div className="flex justify-center space-x-5 items-center pt-2">
                  <button
                    onClick={() => makeAdmin(user.email)}
                    type="button"
                    className="bg-yellow-500 hover:bg-yellow-700 text-yellow-900 font-bold py-2 px-4 rounded-md focus:ring-4 focus:outline-none focus:ring-yellow-300 text-sm text-center inline-flex items-center mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                  >
                    <GrUserAdmin className="mr-1" size="1.5em" />
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleModalOpen(user.id)}
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700 text-blue-900 font-bold py-2 px-4 rounded-md focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <AiOutlineUser className="mr-1" size="1.5em" />
                    View User
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <Modal
        title="User Details"
        show={showModal}
        onClose={() => handleModalClose()}
        size="lg"
      >
        <Modal.Header>Users details</Modal.Header>
        <Modal.Body>
          {userToView ? (
            <Card>
              <div className="flex flex-col items-center pb-10">
                <img
                  alt={
                    userToView.displayName ? userToView.displayName : 'Anonym'
                  }
                  height="96"
                  src={userToView.photoURL}
                  width="96"
                  className="mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {userToView.displayName}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {userToView.email}
                </span>
                <div
                  className="mt-4 flex space-x-3 lg:mt-6 rounded-xl"
                  style={{
                    backgroundColor: userToView.color,
                    height: '20px',
                    width: '20px',
                  }}
                />
              </div>
            </Card>
          ) : (
            <div className="text-center">
              <Spinner aria-label="Hämtar användare" size="lg" />
              <p className="text-gray-500">Fetching users...</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserCards;
