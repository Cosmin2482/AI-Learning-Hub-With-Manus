import { useState } from 'react'
import { Code, Play, CheckCircle, Clock, Star, ArrowRight, Zap, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { practicalExercises } from '../data/learningContent.js'

// Sample interactive exercises data
const exercises = [
  {
    id: 'decision-tree-builder',
    title: 'Build Your First Decision Tree',
    description: 'Interactive exercise to create and visualize a decision tree classifier using a simple dataset',
    module: 'Machine Learning Algorithms',
    difficulty: 'Beginner',
    estimatedTime: '30 min',
    type: 'Interactive Demo',
    skills: ['Decision Trees', 'Classification', 'Data Visualization'],
    completed: false
  },
  {
    id: 'clustering-demo',
    title: 'K-Means Clustering Visualization',
    description: 'Explore how k-means clustering groups data points and experiment with different parameters',
    module: 'Machine Learning Algorithms',
    difficulty: 'Beginner',
    estimatedTime: '25 min',
    type: 'Interactive Demo',
    skills: ['Clustering', 'Unsupervised Learning', 'Data Analysis'],
    completed: false
  },
  {
    id: 'neural-network-playground',
    title: 'Neural Network Playground',
    description: 'Build and train a simple neural network to understand how layers and neurons work',
    module: 'Deep Learning',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    type: 'Hands-on Coding',
    skills: ['Neural Networks', 'Deep Learning', 'Backpropagation'],
    completed: false
  },
  {
    id: 'llm-api-integration',
    title: 'Integrate with a Language Model API',
    description: 'Build a simple application using GPT or similar LLM API to generate text responses',
    module: 'Large Language Models',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    type: 'Hands-on Coding',
    skills: ['API Integration', 'LLMs', 'Text Generation'],
    completed: false
  },
  {
    id: 'rag-system-builder',
    title: 'Build a RAG System',
    description: 'Create a retrieval-augmented generation system using vector databases and embeddings',
    module: 'Advanced AI Concepts',
    difficulty: 'Advanced',
    estimatedTime: '60 min',
    type: 'Project',
    skills: ['RAG', 'Vector Databases', 'Embeddings', 'Information Retrieval'],
    completed: false
  },
  {
    id: 'data-pipeline-design',
    title: 'Design a Data Pipeline',
    description: 'Create a complete data pipeline from bronze to gold layer using medallion architecture',
    module: 'Data Management',
    difficulty: 'Advanced',
    estimatedTime: '50 min',
    type: 'Project',
    skills: ['Data Engineering', 'ETL', 'Data Quality', 'Pipeline Design'],
    completed: false
  }
]

const difficultyColors = {
  'Beginner': 'bg-green-100 text-green-800',
  'Intermediate': 'bg-yellow-100 text-yellow-800',
  'Advanced': 'bg-red-100 text-red-800'
}

const typeColors = {
  'Interactive Demo': 'bg-blue-100 text-blue-800',
  'Hands-on Coding': 'bg-purple-100 text-purple-800',
  'Project': 'bg-orange-100 text-orange-800'
}

export function InteractiveExercises() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedExercise, setSelectedExercise] = useState(null)

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']
  const types = ['All', 'Interactive Demo', 'Hands-on Coding', 'Project']

  const filteredExercises = exercises.filter(exercise => {
    const matchesDifficulty = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty
    const matchesType = selectedType === 'All' || exercise.type === selectedType
    return matchesDifficulty && matchesType
  })

  const completedCount = exercises.filter(ex => ex.completed).length
  const totalCount = exercises.length
  const progressPercentage = (completedCount / totalCount) * 100

  if (selectedExercise) {
    return <ExerciseViewer exercise={selectedExercise} onBack={() => setSelectedExercise(null)} />
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
          <Code className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Interactive Exercises</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Hands-on coding exercises and interactive demos to reinforce your AI learning
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>Your Exercise Progress</span>
          </CardTitle>
          <CardDescription>
            Track your hands-on learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-slate-600">
              <span>{completedCount} of {totalCount} exercises completed</span>
              <span>Keep practicing to master AI concepts!</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">Difficulty:</span>
              <div className="flex gap-2">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-700">Type:</span>
              <div className="flex gap-2">
                {types.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-slate-600">
            {filteredExercises.length} exercises available
          </div>
        </CardContent>
      </Card>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise) => (
          <Card 
            key={exercise.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => setSelectedExercise(exercise)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {exercise.title}
                    </CardTitle>
                    {exercise.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {exercise.description}
                  </CardDescription>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className={difficultyColors[exercise.difficulty]}>
                  {exercise.difficulty}
                </Badge>
                <Badge className={typeColors[exercise.type]}>
                  {exercise.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{exercise.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-4 h-4" />
                    <span>{exercise.module}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">Skills you'll practice:</div>
                  <div className="flex flex-wrap gap-1">
                    {exercise.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full" variant={exercise.completed ? "outline" : "default"}>
                  <Play className="w-4 h-4 mr-2" />
                  {exercise.completed ? 'Practice Again' : 'Start Exercise'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {exercises.filter(ex => ex.difficulty === 'Beginner').length}
            </div>
            <div className="text-sm text-slate-600">Beginner</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {exercises.filter(ex => ex.difficulty === 'Intermediate').length}
            </div>
            <div className="text-sm text-slate-600">Intermediate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {exercises.filter(ex => ex.difficulty === 'Advanced').length}
            </div>
            <div className="text-sm text-slate-600">Advanced</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{totalCount}</div>
            <div className="text-sm text-slate-600">Total Exercises</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Exercise Viewer Component
function ExerciseViewer({ exercise, onBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  // Sample exercise steps - in a real app, these would be loaded dynamically
  const exerciseSteps = [
    {
      title: "Introduction",
      content: `Welcome to the ${exercise.title} exercise! In this hands-on session, you'll learn by doing.`,
      type: "info"
    },
    {
      title: "Setup",
      content: "Let's set up the environment and understand the problem we're solving.",
      type: "setup"
    },
    {
      title: "Implementation",
      content: "Now it's time to write some code! Follow the instructions below.",
      type: "code"
    },
    {
      title: "Testing",
      content: "Test your implementation and see the results.",
      type: "test"
    },
    {
      title: "Conclusion",
      content: "Great job! You've completed the exercise. Let's review what you learned.",
      type: "summary"
    }
  ]

  const handleComplete = () => {
    setIsCompleted(true)
    // In a real app, this would update the user's progress
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          ← Back to Exercises
        </Button>
        <div className="flex items-center space-x-2">
          <Badge className={difficultyColors[exercise.difficulty]}>
            {exercise.difficulty}
          </Badge>
          <Badge className={typeColors[exercise.type]}>
            {exercise.type}
          </Badge>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900">{exercise.title}</h1>
        <p className="text-lg text-slate-600">{exercise.description}</p>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Exercise Progress</span>
              <span>Step {currentStep + 1} of {exerciseSteps.length}</span>
            </div>
            <Progress value={((currentStep + 1) / exerciseSteps.length) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Exercise Content */}
      <Card>
        <CardHeader>
          <CardTitle>{exerciseSteps[currentStep].title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-700">{exerciseSteps[currentStep].content}</p>
          
          {exerciseSteps[currentStep].type === 'code' && (
            <div className="bg-slate-900 rounded-lg p-4">
              <pre className="text-green-400 text-sm">
{`# Sample code for ${exercise.title}
import numpy as np
import matplotlib.pyplot as plt

# Your code here
def build_model():
    # Implement your solution
    pass

# Test your implementation
model = build_model()
print("Model created successfully!")`}
              </pre>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>
            
            {currentStep === exerciseSteps.length - 1 ? (
              <Button onClick={handleComplete} disabled={isCompleted}>
                {isCompleted ? 'Completed!' : 'Complete Exercise'}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(Math.min(exerciseSteps.length - 1, currentStep + 1))}
              >
                Next Step
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Skills Practice */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skills You're Practicing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {exercise.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {isCompleted && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">Exercise Completed!</h3>
            <p className="text-green-700 mb-4">
              Great job! You've successfully completed this exercise and practiced key AI concepts.
            </p>
            <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
