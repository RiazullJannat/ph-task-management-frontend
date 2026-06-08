interface UserCount {
  card_assignments: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'project_manager' | 'team_member' | string;
  avatar_url: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  _count: UserCount;
}

export type UserList = User[];