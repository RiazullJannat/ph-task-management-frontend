export type TCreateProjectPayload =
    {
        name: string,
        description: string
    }

// export type TUpdateProjectPayload =
//     {
//         name: string,
//         description: string
//     }



export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

interface WorkspaceMember {
  id: string;
  workspace_id: string;
  user_id: string;
  role: 'owner' | 'member' | 'admin';
  joined_at: string;
  user: WorkspaceUser;
}


interface WorkspaceCount {
  boards: number;
}
export interface Workspace {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: WorkspaceMember[];
  _count: WorkspaceCount;
}