
export default function PageHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
    return (
        <div className="">
            {title && <h1 className="text-2xl font-bold mb-4">{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
        </div>
    )
}
