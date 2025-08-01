export interface UserInfo {
  uid: string | null;
  displayName: string | null;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
  photoURL: string;
  color: string;
  borderColor: string;
  queuePosition: number;
}

export interface UserDb {
  uid: string;
  display_name: string;
  email: string;
  is_admin: boolean;
  is_approved: boolean;
  photo_url: string;
  color: string;
  border_color: string;
  queue_position: number;
  created_at?: string;
}

export interface AppUser {
  id: string;
  displayname: string;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
}

export interface HandleUserClaimsResponse {
  code?: string;
  message: string;
}

export interface FunctionsError {
  code?: string;
  message: string;
}

export interface ProfileUpdateObject {
  display_name: string;
  photo_url: string;
  color: string;
  border_color: string;
}
