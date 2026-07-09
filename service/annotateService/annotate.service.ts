import { CreateProjectPayload, UpdateProjectPayload } from "@/types/annotate/annotate.types";
import { createData, deleteData, patchData, readData, uploadFile } from "../apiService/crud";
import { Query } from "@/types/shared/shared.types";

export async function getAllProjects(query: Query) {
    return await readData("/annotations/projects/", [''], query)
}
export async function getProjectById(id: string | number) {
    return await readData(`/annotations/projects/${id}/`, [''])
}

export async function createProject(data: FormData) {
    return await uploadFile("/annotations/projects/", "/dashboard/annotate", data)
}

export async function updateProject(data: UpdateProjectPayload, id: string | number) {
    return await patchData(`/annotations/projects/${id}/`, "/dashboard/annotate", data)
}

export async function deleteProject(id: string | number) {
    return await deleteData(`/annotations/projects/${id}/`, "/dashboard/annotate")
}