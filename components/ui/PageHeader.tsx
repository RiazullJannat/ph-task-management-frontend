
export default function PageHeader({ title, subtitle }: { title?: string, subtitle?: string }) {
    return (
        <div className="mb-6 lg:mb-8">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>}
            {subtitle && <p className="text-sm md:text-base text-[#9B98AE]">{subtitle}</p>}
        </div>
    )
}
