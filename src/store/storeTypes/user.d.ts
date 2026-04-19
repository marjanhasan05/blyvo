/**
 * Auth user payload (login / persisted). Fields optional where API is sparse.
 */
export type TUser = {
  id: string | number;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  city?: string;
  area?: string;
  password?: string;
  confirm_password?: string;
  email?: string;
  fullName?: string;
  /** API string role; null for super admin */
  role: string | null;
  is_super_admin?: boolean;
  is_staff?: boolean;
  isVerified?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  profilePhoto?: string;
};
