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