import { readData } from "../apiService/crud";

export async function getDashboardStats() {
    return readData("/dashboard/stats", ["/dashboard"])
}

export async function getDashboardWorkload() {
    return readData("/dashboard/workload", ["/dashboard"])
}

export async function getOverdueCards() {
    return readData("/dashboard/overdue", ["/dashboard"])
}

export async function getSystemDashboardData() {
    return readData("/dashboard", ["/dashboard"])
}

export async function getRecentActivityList() {
    return readData("/dashboard/activity", ["/dashboard"])
}
