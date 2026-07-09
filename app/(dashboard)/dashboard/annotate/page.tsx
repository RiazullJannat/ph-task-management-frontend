import AllProjects from "@/components/pages/annotate/AllProjects";
import PageHeader from "@/components/ui/PageHeader";
import { getAllProjects } from "@/service/annotateService/annotate.service";
import { Query, TSearchParams } from "@/types/shared/shared.types";

export default async function page({
    searchParams,
}: {
    searchParams?: TSearchParams;
}) {
    const query = await searchParams
    const response = await getAllProjects(query as Query)

    return (
        <div>
            <PageHeader title="Annote your image" subtitle="Upload your image to annotate" />
            <AllProjects projects={response?.data || []} />
        </div>
    )
}