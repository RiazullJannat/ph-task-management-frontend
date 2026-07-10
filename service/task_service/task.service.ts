import { CreateTaskPayload, UpdateTaskPayload } from "@/types/tasks/tasks.types";
import { createData, deleteData, patchData, readData } from "../apiService/crud";
import { Query } from "@/types/shared/shared.types";
import { CreateAnnotationPayload, UpdateAnnotationPayload } from "@/types/annotate/annotate.types";

export async function getUserTasks(query: Query) {
    return await readData("/tasks/", [''], query)
}

export async function createTasks(data: CreateTaskPayload) {
    return await createData("/tasks/", "/dashboard/tasks", data)
}

export async function updateTask(data: UpdateTaskPayload, id: string | number) {
    return await patchData(`/tasks/${id}/`, "/dashboard/tasks", data)
}

export async function deleteTask(id: string | number) {
    return await deleteData(`/tasks/${id}/`, "/dashboard/tasks")
}

export async function createAnnotation(data: CreateAnnotationPayload) {
    return await createData("/annotations/annotations/", "/dashboard/annotate", data)
}

export async function updateAnnotation(annotationId: string | number, data: UpdateAnnotationPayload) {
    return await patchData(`/annotations/annotations/${annotationId}/`, "/dashboard/annotate", data)
}

export async function deleteAnnotation(annotationId: string | number) {
    return await deleteData(`/annotations/annotations/${annotationId}/`, "/dashboard/annotate")
}