/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Download, Bell } from "lucide-react";
import { getSystemDashboardData, getRecentActivityList } from "@/service/dashboardService/dashboard.service";
import { SystemDashboardData, RecentActivityItem } from "@/types/dashbaordType/dashboard.type";

import DashboardKPIs from "@/components/pages/shared/dashboard/components/DashboardKPIs";
import DashboardStatusDistribution from "@/components/pages/shared/dashboard/components/DashboardStatusDistribution";
import DashboardPriorityBreakdown from "@/components/pages/shared/dashboard/components/DashboardPriorityBreakdown";
import DashboardTeamWorkload from "@/components/pages/shared/dashboard/components/DashboardTeamWorkload";
import DashboardOverdueTasks from "@/components/pages/shared/dashboard/components/DashboardOverdueTasks";
import DashboardUpcomingDeadlines from "@/components/pages/shared/dashboard/components/DashboardUpcomingDeadlines";
import DashboardProjectSummaries from "@/components/pages/shared/dashboard/components/DashboardProjectSummaries";
import DashboardTeamProductivity from "@/components/pages/shared/dashboard/components/DashboardTeamProductivity";
import DashboardRecentActivity from "@/components/pages/shared/dashboard/components/DashboardRecentActivity";
import DashboardRecentComments from "@/components/pages/shared/dashboard/components/DashboardRecentComments";
import DashboardHighPriorityTasks from "@/components/pages/shared/dashboard/components/DashboardHighPriorityTasks";

export default function DashboardPage() {
    const [data, setData] = useState<SystemDashboardData | null>(null);
    const [activities, setActivities] = useState<RecentActivityItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [dashRes, actRes] = await Promise.all([
                    getSystemDashboardData(),
                    getRecentActivityList()
                ]);

                if (dashRes.success) {
                    setData(dashRes.data);
                } else {
                    console.error("Failed to fetch dashboard stats", dashRes.message);
                }

                if (actRes.success) {
                    setActivities(actRes.data || []);
                } else if (dashRes.success && dashRes.data?.recentActivity) {
                    setActivities(dashRes.data.recentActivity);
                }
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Helper to format dates nicely
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    // Helper to calculate relative time
    const getRelativeTime = (dateStr: string) => {
        const now = new Date();
        const past = new Date(dateStr);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.max(Math.floor(diffMs / 60000), 1);
        if (diffMins < 60) return `${diffMins}m ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}h ago`;
        return formatDate(dateStr);
    };

    // Fallbacks
    const statsBoards = data?.stats?.boards || { total: 24, active: 18, completed: 6 };
    const statsCards = data?.stats?.cards || { total: 342, completed: 128, pending: 156, inProgress: 42, overdue: 16, completionRate: 62 };
    const overdueCount = data?.overdueTasks?.length || 15;
    const highPriorityCount = data?.highPriorityTasks?.length || 28;

    const statusDist = data?.statusDistribution && data.statusDistribution.length > 0 
        ? data.statusDistribution 
        : [
            { status: "To Do", count: 128 },
            { status: "In Progress", count: 42 },
            { status: "Completed", count: 128 },
            { status: "Done", count: 44 }
          ];

    const priorityBreakdown = data?.priorityBreakdown && data.priorityBreakdown.length > 0
        ? data.priorityBreakdown
        : [
            { priority: "High", count: 85 },
            { priority: "Medium", count: 176 },
            { priority: "Low", count: 81 }
          ];

    const workloadList = data?.memberWorkload && data.memberWorkload.length > 0
        ? data.memberWorkload
        : [
            { id: "1", name: "Sarah Johnson", avatar_url: null, role: "Member", cards: { total: 24, completed: 16, pending: 8 } },
            { id: "2", name: "Mike Chen", avatar_url: null, role: "Member", cards: { total: 20, completed: 12, pending: 8 } },
            { id: "3", name: "Emily Davis", avatar_url: null, role: "Member", cards: { total: 18, completed: 10, pending: 8 } },
            { id: "4", name: "David Wilson", avatar_url: null, role: "Member", cards: { total: 16, completed: 8, pending: 8 } },
            { id: "5", name: "Lisa Anderson", avatar_url: null, role: "Member", cards: { total: 14, completed: 7, pending: 7 } }
          ];

    const projectSummaries = data?.projectSummaries && data.projectSummaries.length > 0
        ? data.projectSummaries
        : [
            { id: "p1", name: "Website Redesign", status: "In Progress", deadline: "2024-05-30", totalTasks: 28, completedTasks: 21, overdueTasks: 0, progress: 75 },
            { id: "p2", name: "Mobile App Launch", status: "In Progress", deadline: "2024-06-15", totalTasks: 19, completedTasks: 11, overdueTasks: 0, progress: 60 },
            { id: "p3", name: "Marketing Campaign", status: "Planning", deadline: "2024-06-20", totalTasks: 14, completedTasks: 3, overdueTasks: 0, progress: 25 },
            { id: "p4", name: "Dev Platform", status: "In Progress", deadline: "2024-07-01", totalTasks: 10, completedTasks: 4, overdueTasks: 0, progress: 40 },
            { id: "p5", name: "E-commerce Upgrade", status: "Planning", deadline: "2024-07-10", totalTasks: 10, completedTasks: 1, overdueTasks: 0, progress: 15 }
          ];

    const overdueTasksList = data?.overdueTasks && data.overdueTasks.length > 0
        ? data.overdueTasks
        : [
            { id: "ot1", title: "Fix login issue", due_date: "2024-05-10", priority: "High", board: { name: "Website Redesign" } },
            { id: "ot2", title: "Update API documentation", due_date: "2024-05-09", priority: "Medium", board: { name: "Dev Platform" } },
            { id: "ot3", title: "Email notification bug", due_date: "2024-05-08", priority: "High", board: { name: "Marketing Site" } },
            { id: "ot4", title: "Mobile UI improvements", due_date: "2024-05-07", priority: "Low", board: { name: "Mobile App" } },
            { id: "ot5", title: "Security vulnerability fix", due_date: "2024-05-05", priority: "High", board: { name: "Dev Platform" } }
          ];

    const upcomingDeadlinesList = data?.upcomingDeadlines && data.upcomingDeadlines.length > 0
        ? data.upcomingDeadlines
        : [
            { id: "ud1", title: "User onboarding flow", due_date: "2024-05-22", priority: "High", board: { name: "Product Roadmap" } },
            { id: "ud2", title: "Payment gateway integration", due_date: "2024-05-25", priority: "High", board: { name: "E-commerce" } },
            { id: "ud3", title: "Design system update", due_date: "2024-05-28", priority: "Medium", board: { name: "UI/UX Library" } },
            { id: "ud4", title: "Performance optimization", due_date: "2024-05-30", priority: "Medium", board: { name: "Mobile App" } },
            { id: "ud5", title: "Marketing campaign launch", due_date: "2024-06-02", priority: "Low", board: { name: "Marketing" } }
          ];

    const activityList = activities.length > 0
        ? activities
        : [
            { id: "act1", user: { name: "Sarah Johnson", avatar_url: null }, description: "completed the card 'Design landing page'", created_at: new Date(Date.now() - 2 * 60000).toISOString(), entity_type: "Entity" },
            { id: "act2", user: { name: "Mike Chen", avatar_url: null }, description: "updated the card 'API integration'", created_at: new Date(Date.now() - 15 * 60000).toISOString(), entity_type: "Entity" },
            { id: "act3", user: { name: "Emily Davis", avatar_url: null }, description: "created a new card 'User onboarding flow'", created_at: new Date(Date.now() - 60 * 60000).toISOString(), entity_type: "Entity" },
            { id: "act4", user: { name: "David Wilson", avatar_url: null }, description: "moved card to 'In Progress'", created_at: new Date(Date.now() - 120 * 60000).toISOString(), entity_type: "Entity" },
            { id: "act5", user: { name: "Lisa Anderson", avatar_url: null }, description: "completed the card 'Fix navigation bug'", created_at: new Date(Date.now() - 180 * 60000).toISOString(), entity_type: "Entity" }
          ];

    const commentsList = data?.recentComments && data.recentComments.length > 0
        ? data.recentComments
        : [
            { id: "c1", user: { name: "Sarah Johnson", avatar_url: null }, content: "Great work on the new design!", card: { title: "Design landing page", id: "1", board: { id: "1", name: "Board" } }, created_at: new Date(Date.now() - 2 * 60000).toISOString() },
            { id: "c2", user: { name: "Mike Chen", avatar_url: null }, content: "Can we update the API endpoint?", card: { title: "API integration", id: "2", board: { id: "1", name: "Board" } }, created_at: new Date(Date.now() - 45 * 60000).toISOString() },
            { id: "c3", user: { name: "Emily Davis", avatar_url: null }, content: "This looks good to me.", card: { title: "User onboarding flow", id: "3", board: { id: "1", name: "Board" } }, created_at: new Date(Date.now() - 60 * 60000).toISOString() },
            { id: "c4", user: { name: "David Wilson", avatar_url: null }, content: "Please check the mobile view.", card: { title: "Mobile UI improvements", id: "4", board: { id: "1", name: "Board" } }, created_at: new Date(Date.now() - 120 * 60000).toISOString() }
          ];

    const teamProductivityList = data?.teamProductivity && data.teamProductivity.length > 0
        ? data.teamProductivity
        : [];

    const highPriorityTasksList = data?.highPriorityTasks && data.highPriorityTasks.length > 0
        ? data.highPriorityTasks
        : [];

    return (
        <div className="space-y-6 p-6 min-h-screen text-white">
            {/* Header section matching Trello / Screenshot style */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
                    <p className="text-xs text-slate-400 mt-1">Overview of your projects and team productivity</p>
                </div>
                
                {/* Header Action Controls */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-[#121826] border border-white/5 hover:bg-[#1E293B] px-3.5 py-2 rounded-lg cursor-pointer transition select-none">
                        <CalendarIcon size={14} className="text-slate-400" />
                        <span>May 12 – May 18, 2024</span>
                        <span className="text-[9px]">▼</span>
                    </div>

                    <button className="flex items-center gap-1.5 bg-[#121826] border border-white/5 hover:bg-[#1E293B] px-3.5 py-2 rounded-lg text-xs font-bold text-slate-300 transition">
                        <Download size={14} className="text-slate-400" />
                        Export
                    </button>

                    <button className="relative p-2 bg-[#121826] border border-white/5 rounded-lg text-slate-400 hover:text-white transition">
                        <Bell size={16} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    </button>

                    <div className="border-l border-white/10 h-8 mx-1"></div>

                    {/* Profile */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-700 border border-white/10 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left hidden md:block">
                            <span className="text-xs font-bold block leading-none text-white">John Doe</span>
                            <span className="text-[9px] text-slate-500 block font-medium mt-0.5">Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main grid containing Main stats & Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left Area (takes 3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Top KPI Cards Row */}
                    <DashboardKPIs 
                        boards={statsBoards}
                        cards={statsCards as any}
                        overdueCount={overdueCount}
                        highPriorityCount={highPriorityCount}
                    />

                    {/* Middle Distributions & Team Workload Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <DashboardStatusDistribution statusDistribution={statusDist} />
                        <DashboardPriorityBreakdown priorityBreakdown={priorityBreakdown} />
                        <DashboardTeamWorkload memberWorkload={workloadList} />
                    </div>

                    {/* Overdue Tasks & Upcoming Deadlines Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <DashboardOverdueTasks 
                            overdueTasksList={overdueTasksList}
                            formatDate={formatDate}
                        />
                        <DashboardUpcomingDeadlines 
                            upcomingDeadlines={upcomingDeadlinesList}
                            formatDate={formatDate}
                        />
                    </div>

                    {/* Project Summaries & Team Productivity */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <DashboardProjectSummaries 
                            projectSummaries={projectSummaries}
                            formatDate={formatDate}
                        />
                        <DashboardTeamProductivity teamProductivity={teamProductivityList} />
                    </div>

                </div>

                {/* Right Area (takes 1 col) - Activity, comments and high priority list */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Recent Activity */}
                    <DashboardRecentActivity 
                        activityList={activityList as any}
                        getRelativeTime={getRelativeTime}
                    />

                    {/* Recent Comments */}
                    <DashboardRecentComments 
                        commentsList={commentsList as any}
                        getRelativeTime={getRelativeTime}
                    />

                    {/* High Priority Tasks List */}
                    <DashboardHighPriorityTasks 
                        highPriorityTasks={highPriorityTasksList as any}
                        formatDate={formatDate}
                    />
                </div>

            </div>
        </div>
    );
}
