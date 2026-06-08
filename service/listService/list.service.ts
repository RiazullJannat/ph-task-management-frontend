import { createData, deleteData, patchData, readData } from "../apiService/crud";

// ─── Lists ───────────────────────────────────────────────────────────────────

export async function createList(boardId: string, data: { name: string }, projectId: string) {
    return await createData(`/boards/${boardId}/lists`, `/projects/${projectId}/${boardId}`, data)
}

export async function updateList(boardId: string, listId: string, data: { name: string }, projectId: string) {
    return patchData(`/boards/${boardId}/lists/${listId}`, `/projects/${projectId}/${boardId}`, data)
}

export async function deleteList(boardId: string, listId: string, projectId: string) {
    return deleteData(`/boards/${boardId}/lists/${listId}`, `/projects/${projectId}/${boardId}`)
}

// ─── Cards ────────────────────────────────────────────────────────────────────

export async function createCard(boardId: string, listId: string, data: object, projectId: string) {
    return await createData(`/boards/${boardId}/lists/${listId}/cards`, `/projects/${projectId}/${boardId}`, data)
}

export async function getCardDetails(boardId: string, cardId: string) {
    return readData(`/boards/${boardId}/cards/${cardId}`, [""])
}

export async function updateCard(boardId: string, cardId: string, data: object, projectId: string) {
    return patchData(`/boards/${boardId}/cards/${cardId}`, `/projects/${projectId}/${boardId}`, data)
}

export async function deleteCard(boardId: string, cardId: string, projectId: string) {
    return deleteData(`/boards/${boardId}/cards/${cardId}`, `/projects/${projectId}/${boardId}`)
}

export async function moveCard(boardId: string, cardId: string, data: { targetListId: string; position?: number }, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/move`, `/projects/${projectId}/${boardId}`, data)
}

export async function duplicateCard(boardId: string, cardId: string, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/duplicate`, `/projects/${projectId}/${boardId}`, undefined)
}

export async function toggleWatchCard(boardId: string, cardId: string, projectId: string) {
    return createData(`/boards/${boardId}/cards/${cardId}/watch`, `/projects/${projectId}/${boardId}`, undefined)
}

export async function addMemberToCard(boardId: string, cardId: string, userId: string, projectId: string) {
    return await createData(`/boards/${boardId}/cards/${cardId}/assign`, `/projects/${projectId}/${boardId}`, { userId })
}

export async function unassignMemberFromCard(boardId: string, cardId: string, userId: string, projectId: string) {
    return deleteData(`/boards/${boardId}/cards/${cardId}/assign/${userId}`, `/projects/${projectId}/${boardId}`)
}