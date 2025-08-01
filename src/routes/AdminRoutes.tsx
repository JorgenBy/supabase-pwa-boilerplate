import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashNavbar from '../components/layout/DashNavbar';
import IncorrectAccessPanel from '../components/access/IncorrectAccessPanel';

export default function AdminRoutes() {
  const { currentUser, userInfo } = useAuth();

  return currentUser ? (
    userInfo && userInfo.isAdmin ? (
      <>
        <DashNavbar />
        <Outlet />
      </>
    ) : (
      <>
        <DashNavbar />
        <IncorrectAccessPanel message="Only Admin may access this page" />
      </>
    )
  ) : (
    <Navigate to="/login" />
  );
}
