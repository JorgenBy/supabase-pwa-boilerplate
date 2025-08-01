import { UserDb, UserInfo, AppUser } from '../types/types';

export function mapUserDbToUserInfo(db: UserDb): UserInfo {
  return {
    uid: db.uid,
    displayName: db.display_name,
    email: db.email,
    isAdmin: db.is_admin,
    isApproved: db.is_approved,
    photoURL: db.photo_url,
    color: db.color,
    borderColor: db.border_color,
    queuePosition: db.queue_position,
  };
}

export function mapUserInfoToUserDb(info: UserInfo): UserDb {
  return {
    uid: info.uid!,
    display_name: info.displayName ?? info.email,
    email: info.email,
    is_admin: info.isAdmin,
    is_approved: info.isApproved,
    photo_url: info.photoURL,
    color: info.color,
    border_color: info.borderColor,
    queue_position: info.queuePosition,
  };
}

export function mapUserDbToAppUser(db: UserDb[]): AppUser[] {
  return db.map((user) => ({
    id: user.uid,
    displayname: user.display_name,
    email: user.email,
    isAdmin: user.is_admin,
    isApproved: user.is_approved,
  }));
}
