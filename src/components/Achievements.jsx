import { useState } from 'react'
import { Trophy, Star, Target, Zap, BookOpen, Code, Brain, Award, Medal, Crown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Button } from '@/components/ui/button.jsx'

// Achievement definitions
const achievements = [
  {
    id: 'first_lesson',
    title: 'First Steps',
    description: 'Complete your first lesson',
    icon: BookOpen,
    category: 'Learning',
    points: 10,
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'fundamentals_master',
    title: 'AI Fundamentals Master',
    description: 'Complete all lessons in AI Fundamentals module',
    icon: Brain,
    category: 'Modules',
    points: 50,
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 4
  },
  {
    id: 'quiz_ace',
    title: 'Quiz Ace',
    description: 'Score 100% on any quiz',
    icon: Star,
    category: 'Assessment',
    points: 25,
    rarity: 'uncommon',
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'coding_ninja',
    title: 'Coding Ninja',
    description: 'Complete 5 interactive exercises',
    icon: Code,
    category: 'Practice',
    points: 75,
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Look up 20 terms in the glossary',
    icon: BookOpen,
    category: 'Exploration',
    points: 30,
    rarity: 'uncommon',
    unlocked: false,
    progress: 0,
    maxProgress: 20
  },
  {
    id: 'streak_warrior',
    title: 'Streak Warrior',
    description: 'Learn for 7 consecutive days',
    icon: Zap,
    category: 'Consistency',
    points: 100,
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'ml_expert',
    title: 'Machine Learning Expert',
    description: 'Complete all ML algorithm lessons',
    icon: Target,
    category: 'Modules',
    points: 75,
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 7
  },
  {
    id: 'ai_scholar',
    title: 'AI Scholar',
    description: 'Complete all learning modules',
    icon: Crown,
    category: 'Mastery',
    points: 200,
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  }
]

const rarityColors = {
  common: 'bg-gray-100 text-gray-800 border-gray-300',
  uncommon: 'bg-green-100 text-green-800 border-green-300',
  rare: 'bg-blue-100 text-blue-800 border-blue-300',
  epic: 'bg-purple-100 text-purple-800 border-purple-300',
  legendary: 'bg-yellow-100 text-yellow-800 border-yellow-300'
}

const categoryColors = {
  Learning: 'bg-blue-500',
  Modules: 'bg-green-500',
  Assessment: 'bg-yellow-500',
  Practice: 'bg-purple-500',
  Exploration: 'bg-teal-500',
  Consistency: 'bg-orange-500',
  Mastery: 'bg-red-500'
}

export function Achievements({ userProgress = {} }) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Calculate achievement progress based on user data
  const achievementsWithProgress = achievements.map(achievement => {
    let progress = 0
    let unlocked = false

    switch (achievement.id) {
      case 'first_lesson':
        const totalCompleted = Object.values(userProgress).reduce(
          (sum, moduleProgress) => sum + (moduleProgress.completedLessons?.length || 0), 0
        )
        progress = Math.min(totalCompleted, 1)
        unlocked = totalCompleted >= 1
        break
      
      case 'fundamentals_master':
        progress = userProgress.fundamentals?.completedLessons?.length || 0
        unlocked = progress >= 4
        break
      
      case 'ml_expert':
        progress = userProgress.algorithms?.completedLessons?.length || 0
        unlocked = progress >= 7
        break
      
      case 'ai_scholar':
        const completedModules = Object.values(userProgress).filter(
          moduleProgress => (moduleProgress.completedLessons?.length || 0) >= 4
        ).length
        progress = completedModules
        unlocked = progress >= 5
        break
      
      default:
        progress = achievement.progress
        unlocked = achievement.unlocked
    }

    return {
      ...achievement,
      progress,
      unlocked,
      progressPercentage: (progress / achievement.maxProgress) * 100
    }
  })

  const categories = ['All', ...new Set(achievements.map(a => a.category))]
  
  const filteredAchievements = selectedCategory === 'All' 
    ? achievementsWithProgress 
    : achievementsWithProgress.filter(a => a.category === selectedCategory)

  const unlockedCount = achievementsWithProgress.filter(a => a.unlocked).length
  const totalPoints = achievementsWithProgress
    .filter(a => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Achievements</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Track your learning milestones and unlock rewards as you progress
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{unlockedCount}</div>
            <div className="text-sm text-slate-600">Achievements Unlocked</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{totalPoints}</div>
            <div className="text-sm text-slate-600">Points Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Medal className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">
              {Math.round((unlockedCount / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Completion Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filters */}
      <Card>
        <CardContent className="p-4">
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
        </CardContent>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => {
          const IconComponent = achievement.icon
          const isUnlocked = achievement.unlocked
          
          return (
            <Card 
              key={achievement.id}
              className={`transition-all duration-300 ${
                isUnlocked 
                  ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' 
                  : 'opacity-75'
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${categoryColors[achievement.category]} rounded-lg flex items-center justify-center ${
                    isUnlocked ? 'shadow-lg' : 'opacity-50'
                  }`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={rarityColors[achievement.rarity]}>
                      {achievement.rarity}
                    </Badge>
                    {isUnlocked && <Award className="w-5 h-5 text-yellow-500" />}
                  </div>
                </div>
                <CardTitle className={`text-lg ${isUnlocked ? 'text-slate-900' : 'text-slate-600'}`}>
                  {achievement.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {achievement.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress} / {achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={achievement.progressPercentage} 
                      className={`h-2 ${isUnlocked ? 'bg-yellow-100' : ''}`}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">{achievement.points} points</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </div>
                  
                  {isUnlocked && (
                    <div className="text-center">
                      <Badge className="bg-green-100 text-green-800">
                        ✓ Unlocked!
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Progress Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Achievement Progress</span>
          </CardTitle>
          <CardDescription>
            Your overall achievement completion across all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{unlockedCount} of {achievements.length} achievements</span>
            </div>
            <Progress value={(unlockedCount / achievements.length) * 100} className="h-3" />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {Object.entries(categoryColors).map(([category, color]) => {
                const categoryAchievements = achievementsWithProgress.filter(a => a.category === category)
                const categoryUnlocked = categoryAchievements.filter(a => a.unlocked).length
                
                return (
                  <div key={category} className="text-center">
                    <div className={`w-8 h-8 ${color} rounded-lg mx-auto mb-2`}></div>
                    <div className="text-sm font-medium">{category}</div>
                    <div className="text-xs text-slate-600">
                      {categoryUnlocked}/{categoryAchievements.length}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
