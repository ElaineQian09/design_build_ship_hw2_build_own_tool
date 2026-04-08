interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 text-sm text-slate-500">{description}</p>
      )}
    </div>
  );
}
