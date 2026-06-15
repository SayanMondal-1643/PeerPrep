import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface NavItem {
  id: string
  name: string
  href: string
}

interface SidebarNavProps {
  items: NavItem[]
  title: string
  activeId?: string
}

export function SidebarNav({ items, title, activeId }: SidebarNavProps) {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-20">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">{title}</h3>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = item.id === activeId
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                <span>{item.name}</span>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
