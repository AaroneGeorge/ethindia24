import Link from "next/link"
import { ChevronDown } from 'lucide-react'

export function Nav() {
  return (
    <nav className="flex items-center justify-between p-4 border-b-2 border-black">
      <Link href="/" className="text-primary text-2xl font-bold">
        BEGEN
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/" className="nav-link">
          Home
        </Link>
        <Link href="/exchange" className="nav-link flex items-center gap-1">
          Exchange <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/marketplace" className="nav-link flex items-center gap-1">
          Marketplace <ChevronDown className="w-4 h-4" />
        </Link>
        <Link href="/treasury" className="nav-link flex items-center gap-1">
          Treasury <ChevronDown className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">tricedesign.eth</span>
        <div className="w-8 h-8 rounded-full bg-blue-500" />
      </div>
    </nav>
  )
}

