import { createData, readData } from "../apiService/crud";

export async function getCardComments(boardId: string, cardId: string) {
    return readData(`/boards/${boardId}/cards/${cardId}/comments`, [""])
}

export async function createComment(boardId: string, cardId: string, data: { content: string; parentId?: string }, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/comments`, `/projects/${projectId}/${boardId}`, data)
}
