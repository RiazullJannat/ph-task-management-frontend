import { TCreateProjectPayload } from "@/types/projectType/project.type"
import { createData, readData } from "../apiService/crud"

export const createWorkspace = async (data: TCreateProjectPayload) => {
    return createData("/workspaces", "/dashboard/projects", data)
}

export const getAllWorkspaces = async () => {
    return readData("/workspaces", ["/workspaces"])
}

export const getWorkspaceById = async (id: string) => {
    return readData(`/workspaces/${id}`, ["/workspaces"])
}

export const addMemberToWorkspace = async (workspaceId: string, payload: { email: string; role: string }) => {
    return await createData(`/workspaces/${workspaceId}/members`, `/projects/${workspaceId}`, payload);
};
