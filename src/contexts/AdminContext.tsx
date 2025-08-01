import React, { useContext, useState } from 'react';
import { useToast, EToastTypes } from '../contexts/ToastContext';
import { AppUser, UserInfo } from '../types/types';
import { supabase } from '../lib/supabase';
import { mapUserDbToAppUser } from '../utils/userMapper';

interface IAdminProviderProps {
  children: JSX.Element;
}

const AdminContext = React.createContext({});

const baseUrl = import.meta.env.DEV
  ? 'http://localhost:54321'
  : 'https://<your url>.supabase.co';

export function useAdmin(): any {
  return useContext(AdminContext);
}

export function AdminProvider({ children }: IAdminProviderProps): JSX.Element {
  const [allUsers, setAllUsers] = useState<AppUser[] | null>(null);
  const [loading, setLoading] = useState(true);

  const { showTypedToast, showError } = useToast();

  const listUsers = async () => {
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) throw error;

      setAllUsers(mapUserDbToAppUser(data));
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
    }
  };

  const getUser = async (usersId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('uid', usersId)
        .single();
      if (error) throw error;
      return data as UserInfo;
    } catch (error: any) {
      console.error('Error getting user:', error.message);
    }
  };

  const approveUser = async (usersEmail: string) => {
    console.log('Approving user:', usersEmail);
    try {
      const response = await fetch(`${baseUrl}/functions/v1/approve-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usersEmail }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      showTypedToast(EToastTypes.INFO, result.message);
      listUsers();
    } catch (error: any) {
      console.error('Error approving user:', error.message);
      showError(error.message);
    }
  };

  const rejectUser = async (usersEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/functions/v1/reject-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usersEmail }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      showTypedToast(EToastTypes.INFO, result.message);
      listUsers();
    } catch (error: any) {
      console.error('Error rejecting user:', error.message);
      showError(error.message);
    }
  };

  const createAdmin = async (usersEmail: string) => {
    try {
      const response = await fetch(`${baseUrl}/functions/v1/create-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: usersEmail }),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);
      showTypedToast(EToastTypes.INFO, result.message);
      listUsers();
    } catch (error: any) {
      console.error('Error promoting user:', error.message);
      showError(error.message);
    }
  };

  const value = {
    getUser,
    listUsers,
    approveUser,
    rejectUser,
    createAdmin,
    allUsers,
    loading,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
