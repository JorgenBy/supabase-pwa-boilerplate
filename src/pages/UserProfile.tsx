import { Tabs } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordForm from '../components/profile/PasswordForm';
import { useAuth } from '../contexts/AuthContext';
import { MainContainer } from '../components/layout/MainContainer';

export default function UpdateProfile() {
  const { loading, userInfo, updateProfile } = useAuth();
  return (
    <>
      <MainContainer>
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="Laddar användare" size="xl" />
            <p className="mt-2 text-sm text-slate-900">Loading user</p>
          </div>
        ) : (
          <Tabs.Group aria-label="Event tabs" style="underline">
            <Tabs.Item active title="Profile">
              <ProfileForm userInfo={userInfo} updateProfile={updateProfile} />
            </Tabs.Item>
            <Tabs.Item title="Change Password">
              <PasswordForm />
            </Tabs.Item>
          </Tabs.Group>
        )}
      </MainContainer>
    </>
  );
}
