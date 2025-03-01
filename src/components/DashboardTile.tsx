export default function DashboardTile({ item }: { item:
     { title: string; description: string; icon: React.ReactNode; redirection: React.ReactNode; } }) {
    return (
        <div key={item.title} className="glass-card rounded-xl p-6 flex flex-col gap-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">{item.icon}{item.title}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.redirection}
        </div>
    )
}