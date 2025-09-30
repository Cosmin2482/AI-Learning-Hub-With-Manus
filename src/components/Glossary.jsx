import { useState, useMemo } from 'react'
import { Search, BookOpen, Filter, ArrowRight, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { glossaryTerms } from '../data/learningContent.js'

export function Glossary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTerm, setSelectedTerm] = useState(null)

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(glossaryTerms.map(term => term.category))]
    return cats
  }, [])

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  // Group terms alphabetically
  const groupedTerms = useMemo(() => {
    const groups = {}
    filteredTerms.forEach(term => {
      const firstLetter = term.term[0].toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(term)
    })
    
    // Sort terms within each group
    Object.keys(groups).forEach(letter => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term))
    })
    
    return groups
  }, [filteredTerms])

  const handleTermClick = (term) => {
    setSelectedTerm(term)
  }

  if (selectedTerm) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedTerm(null)}
            className="mb-4"
          >
            ← Back to Glossary
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{selectedTerm.term}</CardTitle>
                <Badge variant="secondary">{selectedTerm.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Definition</h3>
                <p className="text-slate-700 leading-relaxed">{selectedTerm.definition}</p>
              </div>
              
              {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Related Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTerm.relatedTerms.map((relatedTerm, index) => {
                      const relatedTermData = glossaryTerms.find(t => t.term === relatedTerm)
                      return (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => relatedTermData && handleTermClick(relatedTermData)}
                          className="text-sm"
                        >
                          {relatedTerm}
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">AI Knowledge Base</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive glossary with 200+ essential AI terms and concepts
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search terms and definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-500" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between text-sm text-slate-600">
            <span>{filteredTerms.length} terms found</span>
            <span>{categories.length - 1} categories</span>
          </div>
        </CardContent>
      </Card>

      {/* Terms List */}
      <div className="space-y-8">
        {Object.keys(groupedTerms).sort().map(letter => (
          <div key={letter}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">{letter}</span>
              </div>
              <Separator className="flex-1" />
            </div>
            
            <div className="grid gap-4">
              {groupedTerms[letter].map((term, index) => (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500"
                  onClick={() => handleTermClick(term)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{term.term}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {term.category}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                          {term.definition}
                        </p>
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            <span className="text-xs text-slate-500">Related:</span>
                            {term.relatedTerms.slice(0, 3).map((relatedTerm, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {relatedTerm}
                              </Badge>
                            ))}
                            {term.relatedTerms.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{term.relatedTerms.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-slate-400 ml-4 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTerms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No terms found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search query or selecting a different category.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{glossaryTerms.length}</div>
            <div className="text-sm text-slate-600">Total Terms</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
            <div className="text-sm text-slate-600">Categories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Object.keys(groupedTerms).length}
            </div>
            <div className="text-sm text-slate-600">Alphabetical Groups</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
