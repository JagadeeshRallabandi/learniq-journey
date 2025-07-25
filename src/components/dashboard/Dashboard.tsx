import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Clock, TrendingUp, Sparkles, User, LogOut } from "lucide-react";
import { LearningPathCard } from "./LearningPathCard";
import { GoalsForm } from "./GoalsForm";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  learningGoals: string[];
  completedPaths: number;
  totalHours: number;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard = ({ user, onLogout }: DashboardProps) => {
  const [showGoalsForm, setShowGoalsForm] = useState(false);
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGoalsSubmit = async (goals: string[]) => {
    setIsGenerating(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      const simulatedPaths = generateLearningPaths(goals);
      setLearningPaths(simulatedPaths);
      
      // Update user data
      const updatedUser = { ...user, learningGoals: goals };
      localStorage.setItem('learningUser', JSON.stringify(updatedUser));
      
      toast({
        title: "Learning paths generated!",
        description: `Created ${simulatedPaths.length} personalized learning paths based on your goals.`,
      });
      
      setIsGenerating(false);
      setShowGoalsForm(false);
    }, 2000);
  };

  const generateLearningPaths = (goals: string[]) => {
    const pathTemplates = [
      {
        title: "Frontend Development Mastery",
        description: "Complete guide to modern frontend development",
        difficulty: "Intermediate",
        duration: "12 weeks",
        modules: 8,
        skills: ["React", "TypeScript", "CSS", "JavaScript"],
        progress: 0,
        color: "bg-learning-primary"
      },
      {
        title: "AI & Machine Learning Fundamentals",
        description: "Introduction to AI concepts and practical applications",
        difficulty: "Beginner",
        duration: "10 weeks",
        modules: 6,
        skills: ["Python", "TensorFlow", "Data Science", "ML"],
        progress: 0,
        color: "bg-learning-secondary"
      },
      {
        title: "Full Stack Development",
        description: "End-to-end web development with modern technologies",
        difficulty: "Advanced",
        duration: "16 weeks",
        modules: 12,
        skills: ["Node.js", "Database", "API", "DevOps"],
        progress: 0,
        color: "bg-learning-accent"
      },
      {
        title: "Data Analysis & Visualization",
        description: "Transform data into meaningful insights",
        difficulty: "Intermediate",
        duration: "8 weeks",
        modules: 5,
        skills: ["Python", "Pandas", "Matplotlib", "SQL"],
        progress: 0,
        color: "bg-learning-success"
      }
    ];

    return pathTemplates.slice(0, Math.min(goals.length + 1, 4));
  };

  useEffect(() => {
    if (user.learningGoals.length > 0 && learningPaths.length === 0) {
      setLearningPaths(generateLearningPaths(user.learningGoals));
    }
  }, [user.learningGoals]);

  if (showGoalsForm) {
    return <GoalsForm onSubmit={handleGoalsSubmit} onBack={() => setShowGoalsForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-learning-primary/2 to-learning-accent/2">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-learning-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-learning-primary to-learning-accent bg-clip-text text-transparent">
              Wise Learning Navigator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-learning-primary" />
                <span className="text-sm font-medium text-muted-foreground">Goals Set</span>
              </div>
              <p className="text-2xl font-bold mt-2">{user.learningGoals.length}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-learning-secondary" />
                <span className="text-sm font-medium text-muted-foreground">Paths Completed</span>
              </div>
              <p className="text-2xl font-bold mt-2">{user.completedPaths}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-learning-accent" />
                <span className="text-sm font-medium text-muted-foreground">Learning Hours</span>
              </div>
              <p className="text-2xl font-bold mt-2">{user.totalHours}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-learning-success" />
                <span className="text-sm font-medium text-muted-foreground">Progress</span>
              </div>
              <p className="text-2xl font-bold mt-2">85%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {learningPaths.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Sparkles className="h-16 w-16 text-learning-primary mx-auto mb-6" />
              <CardTitle className="mb-4">Ready to start your learning journey?</CardTitle>
              <CardDescription className="mb-6 max-w-md mx-auto">
                Tell us about your learning goals and interests, and our AI will create personalized learning paths just for you.
              </CardDescription>
              <Button 
                onClick={() => setShowGoalsForm(true)}
                className="bg-learning-primary hover:bg-learning-primary/90"
                size="lg"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Set Learning Goals
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Your Learning Paths</h2>
                <p className="text-muted-foreground mt-2">
                  AI-generated personalized learning recommendations
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowGoalsForm(true)}
                disabled={isGenerating}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Update Goals
              </Button>
            </div>

            {isGenerating ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="animate-spin h-12 w-12 border-4 border-learning-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                  <CardTitle className="mb-2">Generating Learning Paths</CardTitle>
                  <CardDescription>Our AI is analyzing your goals and creating personalized recommendations...</CardDescription>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningPaths.map((path, index) => (
                  <LearningPathCard key={index} path={path} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};