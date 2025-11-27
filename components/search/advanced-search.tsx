'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, X } from 'lucide-react'

interface SearchFilter {
  field: string
  operator: 'AND' | 'OR' | 'NOT'
  value: string
}

export function AdvancedSearch() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilter[]>([])

  const addFilter = (field: string, operator: 'AND' | 'OR' | 'NOT', value: string) => {
    setFilters(prev => [...prev, { field, operator, value }])
  }

  const removeFilter = (index: number) => {
    setFilters(prev => prev.filter((_, i) => i !== index))
  }

  const buildQuery = () => {
    let searchQuery = query
    filters.forEach(filter => {
      searchQuery += ` ${filter.operator} ${filter.field}:${filter.value}`
    })
    return searchQuery.trim()
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="Search with Boolean operators (AND, OR, NOT)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Examples: "video AND tutorial", "audio OR music NOT background", "type:video size:&gt;10MB"
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {filter.operator} {filter.field}:{filter.value}
              <button onClick={() => removeFilter(index)}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="text-sm">
        <strong>Final Query:</strong> {buildQuery() || 'No search query'}
      </div>
    </div>
  )
}
