'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  name: string
  email: string
}

interface MentionsTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  users?: User[]
}

export function MentionsTextarea({ 
  value, 
  onChange, 
  placeholder = "Type @ to mention someone...",
  users = []
}: MentionsTextareaProps) {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    onChange(newValue)

    // Check for @ mentions
    const lastAtIndex = newValue.lastIndexOf('@')
    if (lastAtIndex !== -1) {
      const query = newValue.slice(lastAtIndex + 1)
      if (query.length > 0 && !query.includes(' ')) {
        setMentionQuery(query)
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    } else {
      setShowSuggestions(false)
    }
  }

  const insertMention = (user: User) => {
    const lastAtIndex = value.lastIndexOf('@')
    const beforeMention = value.slice(0, lastAtIndex)
    const afterMention = value.slice(lastAtIndex + mentionQuery.length + 1)
    const newValue = `${beforeMention}@${user.name} ${afterMention}`
    
    onChange(newValue)
    setShowSuggestions(false)
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  )

  return (
    <div className="relative">
      <Textarea
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="min-h-[100px]"
      />
      
      {showSuggestions && filteredUsers.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
          {filteredUsers.slice(0, 5).map((user) => (
            <button
              key={user.id}
              className="w-full px-3 py-2 text-left hover:bg-muted"
              onClick={() => insertMention(user)}
            >
              <div className="font-medium">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
