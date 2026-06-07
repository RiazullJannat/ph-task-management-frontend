import { createData, readData } from "../apiService/crud";

export async function createList(boardId: string, data: { name: string }, projectId: string) {
    return await createData(`/boards/${boardId}/lists`, `/projects/${projectId}/${boardId}`, data)
}

export async function createCard(boardId:string,listId:string,data:object,projectId:string){
    return await createData(`/boards/${boardId}/lists/${listId}/cards`, `/projects/${projectId}/${boardId}`, data)
}


export async function addMemberToCard(boardId: string, cardId: string, userId: string, projectId: string) {
     return await createData(`/boards/${boardId}/cards/${cardId}/assign`, `/projects/${projectId}/${boardId}`, {userId})
}