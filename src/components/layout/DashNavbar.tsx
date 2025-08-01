'use client';

import { Dropdown, Navbar, Avatar } from 'flowbite-react';
import { FiLogOut, FiEdit2 } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { Spinner } from 'flowbite-react';
import logo from '../../assets/images/logo.png';
import { DarkThemeToggle } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function NavbarWithDropdown() {
  const { logout, loading, userInfo } = useAuth();
  const { showError } = useToast();
  const navigate = useNavigate();

  if (loading) {
    return <Spinner aria-label="navbar loading" />;
  }

  async function handleLogout(): Promise<void> {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      showError(err);
    }
  }

  const [navigation, setNavigation] = useState([
    { name: 'Dashboard', href: '/', current: false },
  ]);

  useEffect(() => {
    const newObj = navigation.map((e) => {
      return {
        name: e.name,
        href: e.href,
        current: e.href === window.location.pathname,
      };
    });
    setNavigation(newObj);
  }, [window.location.pathname]);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img alt="logo" className="mr-3 h-6 sm:h-9" src={logo} />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Your Application
          {/* Replace with your application name */}
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle className="mr-2" />
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                !userInfo.photoURL
                  ? `https://robohash.org/${userInfo.email}`
                  : userInfo.photoURL
              }
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">{userInfo.displayName}</span>
            <span className="block truncate text-sm font-medium">
              {userInfo.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            icon={FiEdit2}
            onClick={() => navigate('/update-profile')}
          >
            Update Profile
          </Dropdown.Item>
          {userInfo && userInfo.isAdmin && (
            <Dropdown.Item
              icon={GrUserAdmin}
              onClick={() => navigate('/adminpanel')}
            >
              Admin Panel
            </Dropdown.Item>
          )}
          <Dropdown.Divider />
          <Dropdown.Item icon={FiLogOut} onClick={() => handleLogout()}>
            Logout
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navigation.map((item) => (
          <Navbar.Link
            active={item.current}
            key={item.name}
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
