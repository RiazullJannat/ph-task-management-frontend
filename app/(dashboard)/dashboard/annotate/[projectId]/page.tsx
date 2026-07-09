import Anotation from "@/components/pages/annotate/Anotation";
import PageHeader from "@/components/ui/PageHeader";
import { getProjectById } from "@/service/annotateService/annotate.service";

export default async function page({ params }: { params: Promise<{ projectId: string }> }) {
    const { projectId } = await params;
    const {data} = await getProjectById(projectId);
    return (
        <div>
            <PageHeader title={data?.title} subtitle={data?.description} />
            <Anotation images={data?.images} />
        </div>
    )
}