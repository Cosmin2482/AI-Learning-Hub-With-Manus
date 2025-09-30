import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Brain, BookOpen, Code, Database, Zap, Search, Menu, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { ModuleViewer } from './components/ModuleViewer.jsx'
import { Glossary } from './components/Glossary.jsx'
import { InteractiveExercises } from './components/InteractiveExercises.jsx'
import { SearchResults } from './components/SearchResults.jsx'
import { Achievements } from './components/Achievements.jsx'
import { learningModules } from './data/learningContent.js'
import './App.css'

// Main Dashboard Component
function Dashboard({ onModuleSelect, userProgress }) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const modules = [
    {
      id: 'fundamentals',
      title: "AI Fundamentals",
      description: "Core concepts, history, and types of AI",
      icon: Brain,
      lessons: 4,
      color: "bg-blue-500"
    },
    {
      id: 'algorithms',
      title: "Machine Learning Algorithms",
      description: "Decision trees, random forests, clustering",
      icon: Code,
      lessons: 7,
      color: "bg-green-500"
    },
    {
      id: 'llms',
      title: "Large Language Models",
      description: "GPT, LLaMA, and transformer architecture",
      icon: BookOpen,
      lessons: 6,
      color: "bg-purple-500"
    },
    {
      id: 'advanced',
      title: "Advanced AI Concepts",
      description: "RAG, agentic workflows, AI integration",
      icon: Zap,
      lessons: 5,
      color: "bg-orange-500"
    },
    {
      id: 'data',
      title: "Data Management",
      description: "Data quality, medallion architecture",
      icon: Database,
      lessons: 6,
      color: "bg-teal-500"
    }
  ]

  // Calculate overall progress
  const totalLessons = modules.reduce((sum, module) => sum + module.lessons, 0)
  const completedLessons = Object.values(userProgress).reduce(
    (sum, moduleProgress) => sum + (moduleProgress.completedLessons?.length || 0), 0
  )
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">AI Learning Hub</h1>
                <p className="text-sm text-slate-600">Master AI Engineering</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search topics, terms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to Your AI Journey
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Master artificial intelligence from fundamentals to advanced concepts. 
              Interactive lessons, hands-on exercises, and comprehensive knowledge base.
            </p>
          </div>
          
          {/* Progress Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>Your Progress</span>
              </CardTitle>
              <CardDescription>
                Track your journey through AI engineering mastery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{Math.round(overallProgress)}% Complete</span>
                </div>
                <Progress value={overallProgress} className="h-2" />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>{completedLessons} of {totalLessons} lessons completed</span>
                  <span>Estimated time: 40+ hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Learning Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon
              const moduleProgress = userProgress[module.id]?.completedLessons?.length || 0
              const progressPercentage = (moduleProgress / module.lessons) * 100
              
              return (
                <Card 
                  key={module.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/60 backdrop-blur-sm"
                  onClick={() => onModuleSelect(module.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {module.lessons} lessons
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <Button className="w-full" variant="outline">
                        {progressPercentage === 0 ? 'Start Learning' : 
                         progressPercentage === 100 ? 'Review' : 'Continue'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onModuleSelect('glossary')}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Knowledge Base</span>
              </CardTitle>
              <CardDescription className="text-blue-100">
                Comprehensive glossary with 200+ AI terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                Explore Glossary
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onModuleSelect('exercises')}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Interactive Exercises</span>
              </CardTitle>
              <CardDescription className="text-green-100">
                Hands-on coding and practical applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">
                Start Coding
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedModule, setSelectedModule] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [userProgress, setUserProgress] = useState({
    fundamentals: { completedLessons: [] },
    algorithms: { completedLessons: [] },
    llms: { completedLessons: [] },
    advanced: { completedLessons: [] },
    data: { completedLessons: [] }
  })

  const handleModuleSelect = (moduleId) => {
    if (moduleId === 'glossary') {
      setCurrentView('glossary')
      setSelectedModule(null)
    } else if (moduleId === 'exercises') {
      setCurrentView('exercises')
      setSelectedModule(null)
    } else if (moduleId === 'achievements') {
      setCurrentView('achievements')
      setSelectedModule(null)
    } else {
      const module = learningModules[moduleId]
      setSelectedModule(module)
      setCurrentView('module')
    }
  }

  const handleLessonComplete = (moduleId, lessonId) => {
    setUserProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        completedLessons: [...(prev[moduleId]?.completedLessons || []), lessonId]
      }
    }))
  }

  const handleBackToDashboard = () => {
    setCurrentView('dashboard')
    setSelectedModule(null)
    setShowSearchResults(false)
    setSearchQuery('')
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    setShowSearchResults(query.length >= 2)
  }

  const handleSearchResult = (result) => {
    setShowSearchResults(false)
    setSearchQuery('')
    
    switch (result.type) {
      case 'glossary':
        setCurrentView('glossary')
        break
      case 'module':
        setSelectedModule(result.data)
        setCurrentView('module')
        break
      case 'lesson':
        setSelectedModule(result.data.module)
        setCurrentView('module')
        break
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleBackToDashboard}
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">AI Learning Hub</h1>
                    <p className="text-sm text-slate-600">Master AI Engineering</p>
                  </div>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    placeholder="Search topics, terms..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 w-64"
                  />
                  {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 z-50">
                      <SearchResults
                        query={searchQuery}
                        onResultSelect={handleSearchResult}
                        onClose={() => setShowSearchResults(false)}
                      />
                    </div>
                  )}
                </div>
                {currentView !== 'dashboard' && (
                  <Button variant="outline" size="sm" onClick={handleBackToDashboard}>
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleModuleSelect('achievements')}
                  className="hidden md:flex"
                >
                  🏆 Achievements
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>
          {currentView === 'dashboard' && (
            <Dashboard 
              onModuleSelect={handleModuleSelect}
              userProgress={userProgress}
            />
          )}
          {currentView === 'module' && selectedModule && (
            <ModuleViewer 
              module={selectedModule}
              onLessonComplete={handleLessonComplete}
              userProgress={userProgress}
            />
          )}
          {currentView === 'glossary' && <Glossary />}
          {currentView === 'exercises' && <InteractiveExercises />}
          {currentView === 'achievements' && <Achievements userProgress={userProgress} />}
        </main>
      </div>
    </Router>
  )
}

export default App
