import { createData, readData } from "../apiService/crud";

export async function createList(boardId: string, data: { name: string }, projectId: string) {
    return await createData(`/boards/${boardId}/lists`, `/projects/${projectId}/${boardId}`, data)
}