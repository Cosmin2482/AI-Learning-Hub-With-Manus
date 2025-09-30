import { useState } from 'react'
import { Brain, Code, BookOpen, Zap, Database, Play, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { LessonViewer } from './LessonViewer.jsx'

const iconMap = {
  Brain,
  Code,
  BookOpen,
  Zap,
  Database
}

export function ModuleViewer({ module, onLessonComplete, userProgress = {} }) {
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  if (!module) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Select a module to begin learning</p>
      </div>
    )
  }

  const IconComponent = iconMap[module.icon] || Brain
  const completedLessons = module.lessons?.filter(lesson => 
    userProgress[module.id]?.completedLessons?.includes(lesson.id)
  ).length || 0
  const totalLessons = module.lessons?.length || 0
  const moduleProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  const handleLessonSelect = (lesson, index) => {
    setSelectedLesson(lesson)
    setCurrentLessonIndex(index)
  }

  const handleLessonComplete = (lessonId) => {
    onLessonComplete(module.id, lessonId)
    // Auto-advance to next lesson if available
    if (currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1]
      setSelectedLesson(nextLesson)
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handleNextLesson = () => {
    if (currentLessonIndex < module.lessons.length - 1) {
      const nextLesson = module.lessons[currentLessonIndex + 1]
      setSelectedLesson(nextLesson)
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = module.lessons[currentLessonIndex - 1]
      setSelectedLesson(prevLesson)
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  if (selectedLesson) {
    return (
      <LessonViewer
        lesson={selectedLesson}
        onComplete={() => handleLessonComplete(selectedLesson.id)}
        onNext={handleNextLesson}
        onPrevious={handlePreviousLesson}
        isCompleted={userProgress[module.id]?.completedLessons?.includes(selectedLesson.id)}
      />
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Module Header */}
      <div className="text-center space-y-4">
        <div className={`w-20 h-20 ${module.color} rounded-2xl flex items-center justify-center mx-auto`}>
          <IconComponent className="w-10 h-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{module.title}</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">{module.description}</p>
        </div>
        
        {/* Module Stats */}
        <div className="flex justify-center space-x-8 text-sm text-slate-600">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{totalLessons} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{module.estimatedHours} hours</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>{completedLessons} completed</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>Your Progress</span>
          </CardTitle>
          <CardDescription>
            Track your progress through this module
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Module Progress</span>
              <span>{Math.round(moduleProgress)}% Complete</span>
            </div>
            <Progress value={moduleProgress} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>{completedLessons} of {totalLessons} lessons completed</span>
              <span>
                {moduleProgress === 100 ? 'Module Complete!' : 
                 moduleProgress > 0 ? 'In Progress' : 'Not Started'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Lessons</h2>
        <div className="grid gap-4">
          {module.lessons?.map((lesson, index) => {
            const isCompleted = userProgress[module.id]?.completedLessons?.includes(lesson.id)
            const isLocked = index > 0 && !userProgress[module.id]?.completedLessons?.includes(module.lessons[index - 1].id)
            
            return (
              <Card 
                key={lesson.id} 
                className={`transition-all duration-200 ${
                  isLocked 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-md cursor-pointer'
                } ${isCompleted ? 'border-green-200 bg-green-50' : ''}`}
                onClick={() => !isLocked && handleLessonSelect(lesson, index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        ) : isLocked ? (
                          <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                            <span className="text-slate-500 font-semibold">{index + 1}</span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-slate-900">{lesson.title}</h3>
                          <Badge variant={lesson.type === 'quiz' ? 'destructive' : 'secondary'}>
                            {lesson.type === 'quiz' ? 'Quiz' : 'Lesson'}
                          </Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-2">
                          {lesson.content?.overview || 'Test your knowledge with this quiz'}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                          {lesson.type === 'quiz' && (
                            <div className="flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>{lesson.questions?.length || 0} questions</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isLocked && (
                        <Badge variant="outline" className="text-xs">
                          Complete previous lesson
                        </Badge>
                      )}
                      {!isLocked && (
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Module Completion */}
      {moduleProgress === 100 && (
        <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Module Complete!</h3>
            <p className="text-green-100 mb-6">
              Congratulations! You've completed all lessons in this module. 
              You're ready to move on to the next challenge.
            </p>
            <Button variant="secondary" size="lg">
              Continue to Next Module
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalLessons}</div>
            <div className="text-sm text-slate-600">Total Lessons</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedLessons}</div>
            <div className="text-sm text-slate-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{module.estimatedHours}h</div>
            <div className="text-sm text-slate-600">Est. Time</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
