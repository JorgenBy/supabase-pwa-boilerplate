import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashNavbar from '../components/layout/DashNavbar';
import IncorrectAccessPanel from '../components/access/IncorrectAccessPanel';
import DashFooter from '../components/layout/DashFooter';

export default function PrivateRoutes() {
  const { currentUser, userInfo, userMessage } = useAuth();

  return currentUser ? (
    userInfo && userInfo.isApproved ? (
      <>
        <div className="min-h-screen">
          <DashNavbar />
          <Outlet />
          <DashFooter />
        </div>
      </>
    ) : (
      <>
        <DashNavbar />
        <IncorrectAccessPanel message={userMessage} />
        <DashFooter />
      </>
    )
  ) : (
    <Navigate to="/login" />
  );
}
