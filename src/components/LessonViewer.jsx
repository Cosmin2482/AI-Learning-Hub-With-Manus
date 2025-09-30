import { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Separator } from '@/components/ui/separator.jsx'

export function LessonViewer({ lesson, onComplete, onNext, onPrevious, isCompleted = false }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [sectionProgress, setSectionProgress] = useState({})

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Select a lesson to begin learning</p>
      </div>
    )
  }

  const handleSectionComplete = (sectionIndex) => {
    setSectionProgress(prev => ({
      ...prev,
      [sectionIndex]: true
    }))
  }

  const completedSections = Object.keys(sectionProgress).length
  const totalSections = lesson.content?.sections?.length || 0
  const progressPercentage = totalSections > 0 ? (completedSections / totalSections) * 100 : 0

  if (lesson.type === 'quiz') {
    return <QuizViewer lesson={lesson} onComplete={onComplete} />
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Lesson Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onPrevious} className="flex items-center space-x-2">
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{lesson.duration}</span>
          </Badge>
          <Button onClick={onNext} className="flex items-center space-x-2">
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">{lesson.title}</h1>
          <p className="text-lg text-slate-600">{lesson.content?.overview}</p>
        </div>

        {/* Progress Indicator */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lesson Progress</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>{completedSections} of {totalSections} sections completed</span>
                <span>{isCompleted ? 'Completed' : 'In Progress'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Navigation */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Sections</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {lesson.content?.sections?.map((section, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSection === index
                      ? 'bg-blue-100 text-blue-900 border border-blue-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {sectionProgress[index] ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {lesson.content?.sections?.[currentSection]?.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                {lesson.content?.sections?.[currentSection]?.content}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                    className="flex items-center space-x-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Section</span>
                  </Button>
                  
                  <Button
                    onClick={() => {
                      handleSectionComplete(currentSection)
                      if (currentSection < (lesson.content?.sections?.length || 0) - 1) {
                        setCurrentSection(currentSection + 1)
                      }
                    }}
                    className="flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.min((lesson.content?.sections?.length || 0) - 1, currentSection + 1))}
                    disabled={currentSection >= (lesson.content?.sections?.length || 0) - 1}
                    className="flex items-center space-x-2"
                  >
                    <span>Next Section</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Takeaways */}
          {lesson.content?.keyTakeaways && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Lesson Completion */}
          {progressPercentage === 100 && (
            <Card className="mt-6 bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">Lesson Complete!</h3>
                    <p className="text-green-700">Great job! You've completed all sections of this lesson.</p>
                  </div>
                  <Button onClick={onComplete} className="bg-green-600 hover:bg-green-700">
                    Mark Lesson Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// Quiz Viewer Component
function QuizViewer({ lesson, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleSubmitQuiz = () => {
    let correctAnswers = 0
    lesson.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setShowResults(true)
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
            <CardDescription>
              You scored {score} out of {lesson.questions.length} questions correctly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">
                {Math.round((score / lesson.questions.length) * 100)}%
              </div>
              <p className="text-slate-600">Overall Score</p>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              {lesson.questions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id]
                const isCorrect = userAnswer === question.correct
                
                return (
                  <div key={question.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="font-medium">Question {index + 1}</span>
                    </div>
                    <p className="text-sm text-slate-600">{question.explanation}</p>
                  </div>
                )
              })}
            </div>
            
            <Button onClick={onComplete} className="w-full">
              Complete Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = lesson.questions[currentQuestion]

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Badge variant="secondary">
              Question {currentQuestion + 1} of {lesson.questions.length}
            </Badge>
            <Badge variant="outline">Quiz</Badge>
          </div>
          <CardTitle className="text-xl">{lesson.title}</CardTitle>
          <Progress value={((currentQuestion + 1) / lesson.questions.length) * 100} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(question.id, index)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswers[question.id] === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswers[question.id] === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300'
                    }`}>
                      {selectedAnswers[question.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            {currentQuestion === lesson.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== lesson.questions.length}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={selectedAnswers[question.id] === undefined}
              >
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
