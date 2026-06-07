
export default async function page({
    params,
}: {
    params: Promise<{ id: string, boardId: string }>;
}) {
    const { id, boardId } = await params
    console.log(id, boardId)
    return (
        <div>page {boardId}</div>
    )
}
