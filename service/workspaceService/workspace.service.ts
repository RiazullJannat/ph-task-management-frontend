import { TCreateProjectPayload } from "@/types/projectType/project.type"
import { createData, deleteData, patchData, readData } from "../apiService/crud"

export const createWorkspace = async (data: TCreateProjectPayload) => {
    return createData("/workspaces", "/dashboard/projects", data)
}

export const getAllWorkspaces = async () => {
    return readData("/workspaces", ["/workspaces"])
}

export const getWorkspaceById = async (id: string) => {
    return readData(`/workspaces/${id}`, ["/workspaces"])
}

export const updateWorkspace = async (workspaceId: string, data: Partial<TCreateProjectPayload>) => {
    return patchData(`/workspaces/${workspaceId}`, `/projects/${workspaceId}`, data)
}

export const deleteWorkspace = async (workspaceId: string) => {
    return deleteData(`/workspaces/${workspaceId}`, `/dashboard/projects`)
}

export const addMemberToWorkspace = async (workspaceId: string, payload: { email: string; role: string }) => {
    return await createData(`/workspaces/${workspaceId}/members`, `/projects/${workspaceId}`, payload);
};

export const updateWorkspaceMemberRole = async (workspaceId: string, userId: string, data: { role: string }) => {
    return patchData(`/workspaces/${workspaceId}/members/${userId}`, `/projects/${workspaceId}`, data)
}

export const removeWorkspaceMember = async (workspaceId: string, userId: string) => {
    return deleteData(`/workspaces/${workspaceId}/members/${userId}`, `/projects/${workspaceId}`)
}
