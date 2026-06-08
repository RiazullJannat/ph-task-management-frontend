/* eslint-disable @typescript-eslint/no-explicit-any */

// /dashboard/stats end points responce
export interface DashboardStatsData {
    boards: {
        total: number;
        active: number;
        completed: number;
    };
    cards: {
        total: number;
        completed: number;
        pending: number;
        inProgress: number;
        overdue: number;
        completionRate: number;
    };
}


interface MemberCardStats {
    total: number;
    completed: number;
    pending: number;
}
// /dashboard/workload end points responce
export interface MemberWorkload {
    id: string;
    name: string;
    avatar_url: string | null;
    role: 'admin' | 'team_member' | string;
    cards: MemberCardStats;
}


interface DashboardStatsDetail {
  total: number;
  active?: number;
  completed: number;
  pending?: number;
  inProgress?: number;
  overdue?: number;
  completionRate?: number;
}

interface DashboardStatsGroup {
  boards: DashboardStatsDetail;
  cards: DashboardStatsDetail;
}

interface StatusDistributionItem {
  status: 'todo' | 'in_progress' | 'completed' | 'done' | string;
  count: number;
}

interface PriorityBreakdownItem {
  priority: 'low' | 'medium' | 'high' | string;
  count: number;
}

interface WorkloadCardStats {
  total: number;
  completed: number;
  pending: number;
}

interface MemberWorkloadItem {
  id: string;
  name: string;
  avatar_url: string | null;
  role: string;
  cards: WorkloadCardStats;
}

interface TaskBoardInfo {
  id: string;
  name: string;
}

interface TaskMemberUser {
  id: string;
  name: string;
  avatar_url: string | null;
}

interface TaskMember {
  id: string;
  card_id: string;
  user_id: string;
  assigned_at: string;
  user: TaskMemberUser;
}

interface DashboardTaskItem {
  id: string;
  list_id: string;
  board_id: string;
  title: string;
  description: string;
  due_date: string | null;
  due_reminder: number | null;
  priority: 'low' | 'medium' | 'high' | string;
  status: string;
  position: number;
  is_archived: boolean;
  cover_color: string | null;
  cover_image_url: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  members: TaskMember[];
  board: TaskBoardInfo;
}

export interface RecentActivityItem {
  id: string;
  user_id: string;
  board_id: string;
  card_id: string | null;
  action_type: 'created' | 'updated' | 'deleted' | 'completed' | string;
  entity_type: 'card' | 'list' | 'checklist' | string;
  entity_id: string;
  description: string;
  metadata: any | null;
  created_at: string;
  user: TaskMemberUser;
  board: TaskBoardInfo;
}

interface ProjectSummaryItem {
  id: string;
  name: string;
  status: string;
  deadline: string | null;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  progress: number;
}

interface RecentCommentCardInfo {
  id: string;
  title: string;
  board: TaskBoardInfo;
}

interface RecentCommentItem {
  id: string;
  content: string;
  created_at: string;
  user: TaskMemberUser;
  card: RecentCommentCardInfo;
}

interface TeamProductivityItem {
  period: string;
  completedTasks: number;
}

// /dashbaord endpoints responce
export interface SystemDashboardData {
  stats: DashboardStatsGroup;
  statusDistribution: StatusDistributionItem[];
  priorityBreakdown: PriorityBreakdownItem[];
  memberWorkload: MemberWorkloadItem[];
  overdueTasks: DashboardTaskItem[];
  upcomingDeadlines: DashboardTaskItem[];
  recentActivity: RecentActivityItem[];
  projectSummaries: ProjectSummaryItem[];
  recentComments: RecentCommentItem[];
  highPriorityTasks: DashboardTaskItem[];
  teamProductivity: TeamProductivityItem[];
}

// /dashboard/activity end points responce
export type RecentActivityListResponse = RecentActivityItem[];