import Signup from './components/auth/Signup';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import ForgotPassword from './components/auth/ForgotPassword';
import UpdateProfile from './pages/UserProfile';
import { ToastProvider } from './contexts/ToastContext';
import { AdminProvider } from './contexts/AdminContext';
import 'react-toastify/dist/ReactToastify.min.css';
import AppContextProviders from './contexts/AppContextProvider';
import AdminRoutes from './routes/AdminRoutes';
import AdminPanel from './components/admin/AdminPanel';
import { Flowbite } from 'flowbite-react';

function App() {
  const providers = [ToastProvider, AuthProvider, AdminProvider];
  return (
    <Flowbite>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppContextProviders components={providers}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard />} path="/" />
              <Route path="/update-profile" element={<UpdateProfile />} />
            </Route>
            <Route element={<AdminRoutes />}>
              <Route element={<AdminPanel />} path="/adminpanel" />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AppContextProviders>
      </Router>
    </Flowbite>
  );
}

export default App;
