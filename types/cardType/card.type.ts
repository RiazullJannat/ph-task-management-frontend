/* eslint-disable @typescript-eslint/no-explicit-any */
interface CardMemberUser {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface CardMember {
  id: string;
  card_id: string;
  user_id: string;
  assigned_at: string;
  user: CardMemberUser;
}

export interface TCardDetails {
  id: string;
  list_id: string;
  board_id: string;
  title: string;
  description: string;
  due_date: string | null;
  due_reminder: number | null;
  priority: 'low' | 'medium' | 'high' | string;
  status: 'todo' | 'in_progress' | 'done' | string;
  position: number;
  is_archived: boolean;
  cover_color: string | null;
  cover_image_url: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: CardMember[];
  labels: any[];
  custom_values: any[];
  isWatching: boolean;
  commentsCount: number;
  checklistsCount: number;
  attachmentsCount: number;
}

interface CardMemberUser {
  id: string;
  name: string;
  avatar_url: string | null;
  email: string;
}

interface CardMember {
  id: string;
  card_id: string;
  user_id: string;
  assigned_at: string;
  user: CardMemberUser;
}

interface CardLabel {
  id: string;
  board_id: string;
  name: string;
  color: string;
}

interface ChecklistItem {
  id: string;
  checklist_id: string;
  title: string;
  is_completed: boolean;
  completed_at: string | null;
  due_date: string | null;
  assigned_to: string | null;
  position: number;
  created_at: string;
  updated_at: string;
  assignee: any | null;
}

interface ChecklistProgress {
  completed: number;
  total: number;
  percent: number;
}

interface CardChecklist {
  id: string;
  card_id: string;
  title: string;
  position: number;
  items: ChecklistItem[];
  progress: ChecklistProgress;
}

interface CardCreator {
  id: string;
  name: string;
  avatar_url: string | null;
}

export interface TComplexCardDetails {
  id: string;
  list_id: string;
  board_id: string;
  title: string;
  description: string;
  due_date: string | null;
  due_reminder: number | null;
  priority: 'low' | 'medium' | 'high' | string;
  status: 'todo' | 'in_progress' | 'done' | string;
  position: number;
  is_archived: boolean;
  cover_color: string | null;
  cover_image_url: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: CardMember[];
  watchers: any[];
  labels: CardLabel[];
  checklists: CardChecklist[];
  attachments: any[];
  creator: CardCreator;
  custom_values: any[];
  isWatching: boolean;
  commentsCount: number;
}