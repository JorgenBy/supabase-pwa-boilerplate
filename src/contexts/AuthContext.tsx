import React, { useContext, useState, useEffect } from 'react';
import { ProfileUpdateObject, UserDb, UserInfo } from '../types/types';
import { getRandomColor, shadeColor } from '../utils/colorUtils';
import { mapUserDbToUserInfo } from '../utils/userMapper';
import { supabase } from '../lib/supabase';

interface IAuthProviderProps {
  children: JSX.Element;
}

const AuthContext = React.createContext({});

export function useAuth(): any {
  return useContext(AuthContext);
}

function saveUserToLocalStorage(user: UserInfo) {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserFromLocalStorage(): UserInfo | null {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

function removeUserFromLocalStorage() {
  localStorage.removeItem('user');
}

async function googleSignin(): Promise<void> {
  console.log('Attempting Google login...');
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Google login error:', error.message);
    throw error;
  }
}

export function AuthProvider({ children }: IAuthProviderProps): JSX.Element {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userMessage, setUserMessage] = useState<string>(
    'User information is being fetched...'
  );

  async function signup(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  }

  async function login(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password are required for login');
    }
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function logout() {
    setCurrentUser(null);
    await supabase.auth.signOut();
  }

  async function resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  }

  async function updateUsersEmail(email: string) {
    const { data, error } = await supabase.auth.updateUser({ email });
    if (error) throw error;
    return data;
  }

  async function updateUsersProfile(data: ProfileUpdateObject) {
    if (data.color) {
      data.border_color = shadeColor(data.color, -0.2);
    }

    if (!currentUser) throw new Error('No current user to update');

    const { error } = await supabase
      .from('users')
      .update({ ...data })
      .eq('uid', currentUser.id);

    if (error) throw error;

    await refreshUserInfo(currentUser);
    return true;
  }

  async function refreshUserInfo(user: any) {
    const userData = await fetchOrCreateUser(user);
    if (userData) {
      saveUserToLocalStorage(userData);
      setUserInfo(userData);
    }
  }

  async function updateUsersPassword(password: string) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return data;
  }

  const getCurrentUserToken = async () => {
    const session = await supabase.auth.getSession();
    return session.data.session?.access_token ?? null;
  };

  const fetchOrCreateUser = async (user: any): Promise<UserInfo | null> => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user.id)
      .single();

    if (data) return mapUserDbToUserInfo(data);

    if (!error || error.code === 'PGRST116') {
      const color = getRandomColor();
      const borderColor = shadeColor(color, -0.2);

      const newUser: UserDb = {
        uid: user.id,
        display_name: user.user_metadata.full_name || user.email,
        email: user.email,
        is_admin: false,
        is_approved: false,
        photo_url: `https://robohash.org/${user.email}`,
        color,
        border_color: borderColor,
        queue_position: 0,
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert([newUser]);

      if (insertError) throw insertError;

      return mapUserDbToUserInfo(newUser);
    }

    throw error;
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user ?? null;
        setCurrentUser(user);
        let cUser = getUserFromLocalStorage();

        setUserInfo(cUser);

        if (user && user.id !== cUser?.uid) {
          await refreshUserInfo(user);
        } else if (!user) {
          removeUserFromLocalStorage();
          setUserMessage('You have been logged out.');
          setUserInfo(null);
        }
        if (cUser && !cUser.isApproved) {
          setUserMessage(
            'Your account is not approved yet. Please wait for admin approval.'
          );
        }

        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userInfo,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail: updateUsersEmail,
    updateProfile: updateUsersProfile,
    updatePassword: updateUsersPassword,
    getCurrentUserToken,
    googleSignin,
    userMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
