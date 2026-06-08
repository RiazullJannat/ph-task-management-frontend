import { readData } from "../apiService/crud";

export async function globalSearch(query: string) {
    return readData(`/search`, [""], { q: query })
}
