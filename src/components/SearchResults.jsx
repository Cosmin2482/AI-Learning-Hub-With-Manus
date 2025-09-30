import { useState, useMemo } from 'react'
import { Search, BookOpen, Code, Brain, ArrowRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { learningModules, glossaryTerms } from '../data/learningContent.js'

export function SearchResults({ query, onResultSelect, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Search through all content
  const searchResults = useMemo(() => {
    if (!query || query.length < 2) return []

    const results = []
    const searchTerm = query.toLowerCase()

    // Search in glossary terms
    glossaryTerms.forEach(term => {
      if (
        term.term.toLowerCase().includes(searchTerm) ||
        term.definition.toLowerCase().includes(searchTerm) ||
        term.category.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'glossary',
          title: term.term,
          description: term.definition,
          category: term.category,
          relevance: calculateRelevance(term.term, term.definition, searchTerm),
          data: term
        })
      }
    })

    // Search in learning modules
    Object.values(learningModules).forEach(module => {
      if (
        module.title.toLowerCase().includes(searchTerm) ||
        module.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          type: 'module',
          title: module.title,
          description: module.description,
          category: 'Learning Module',
          relevance: calculateRelevance(module.title, module.description, searchTerm),
          data: module
        })
      }

      // Search in lessons
      module.lessons?.forEach(lesson => {
        if (
          lesson.title.toLowerCase().includes(searchTerm) ||
          lesson.content?.overview?.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            type: 'lesson',
            title: lesson.title,
            description: lesson.content?.overview || 'Lesson content',
            category: module.title,
            relevance: calculateRelevance(lesson.title, lesson.content?.overview || '', searchTerm),
            data: { lesson, module }
          })
        }
      })
    })

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance)
  }, [query])

  const filteredResults = useMemo(() => {
    if (selectedCategory === 'All') return searchResults
    return searchResults.filter(result => 
      result.category === selectedCategory || result.type === selectedCategory
    )
  }, [searchResults, selectedCategory])

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(searchResults.map(result => result.category))]
    return cats
  }, [searchResults])

  function calculateRelevance(title, description, searchTerm) {
    let score = 0
    const titleLower = title.toLowerCase()
    const descLower = description.toLowerCase()
    
    // Exact match in title gets highest score
    if (titleLower === searchTerm) score += 100
    else if (titleLower.includes(searchTerm)) score += 50
    
    // Match in description
    if (descLower.includes(searchTerm)) score += 25
    
    // Word boundary matches get bonus
    const wordBoundaryRegex = new RegExp(`\\b${searchTerm}\\b`, 'i')
    if (wordBoundaryRegex.test(title)) score += 30
    if (wordBoundaryRegex.test(description)) score += 15
    
    return score
  }

  const handleResultClick = (result) => {
    onResultSelect(result)
    onClose()
  }

  if (!query || query.length < 2) {
    return (
      <Card className="mt-2">
        <CardContent className="p-4 text-center text-slate-500">
          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>Start typing to search lessons, terms, and concepts...</p>
        </CardContent>
      </Card>
    )
  }

  if (searchResults.length === 0) {
    return (
      <Card className="mt-2">
        <CardContent className="p-4 text-center">
          <Search className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <h3 className="font-semibold text-slate-900 mb-1">No results found</h3>
          <p className="text-slate-500 text-sm">
            Try different keywords or check your spelling
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-2 max-h-96 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Search Results</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <span>{filteredResults.length} results for "{query}"</span>
        </div>
        
        {/* Category filters */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 5).map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="text-xs"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 max-h-64 overflow-y-auto">
        <div className="space-y-1">
          {filteredResults.slice(0, 10).map((result, index) => (
            <div
              key={index}
              className="p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
              onClick={() => handleResultClick(result)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {result.type === 'glossary' && <BookOpen className="w-4 h-4 text-blue-500" />}
                    {result.type === 'module' && <Brain className="w-4 h-4 text-green-500" />}
                    {result.type === 'lesson' && <Code className="w-4 h-4 text-purple-500" />}
                    <h4 className="font-medium text-slate-900 truncate">{result.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {result.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-1">
                    {result.description}
                  </p>
                  <div className="text-xs text-slate-500">
                    {result.category}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
        
        {filteredResults.length > 10 && (
          <div className="p-3 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Showing first 10 of {filteredResults.length} results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Enhanced search hook for the main app
export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchResult = (result) => {
    // Handle different types of search results
    switch (result.type) {
      case 'glossary':
        // Navigate to glossary with term selected
        return { type: 'glossary', data: result.data }
      case 'module':
        // Navigate to module
        return { type: 'module', data: result.data }
      case 'lesson':
        // Navigate to specific lesson
        return { type: 'lesson', data: result.data }
      default:
        return null
    }
  }

  return {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    handleSearchResult
  }
}
