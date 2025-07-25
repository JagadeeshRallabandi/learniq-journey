import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Star, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningPath {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  modules: number;
  skills: string[];
  progress: number;
  color: string;
}

interface LearningPathCardProps {
  path: LearningPath;
}

export const LearningPathCard = ({ path }: LearningPathCardProps) => {
  const [isStarted, setIsStarted] = useState(path.progress > 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-learning-success text-white';
      case 'intermediate':
        return 'bg-learning-warning text-white';
      case 'advanced':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleStart = () => {
    setIsStarted(true);
    // In a real app, this would update the user's progress
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-learning-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-learning-primary transition-colors">
              {path.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {path.description}
            </CardDescription>
          </div>
          <Badge className={getDifficultyColor(path.difficulty)}>
            {path.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        {isStarted && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{path.progress}%</span>
            </div>
            <Progress value={path.progress} className="h-2" />
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{path.duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{path.modules} modules</span>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-2">
          <span className="text-sm font-medium text-muted-foreground">Skills you'll learn:</span>
          <div className="flex flex-wrap gap-1">
            {path.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {!isStarted ? (
            <Button 
              onClick={handleStart}
              className="w-full bg-learning-primary hover:bg-learning-primary/90"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Learning Path
            </Button>
          ) : path.progress === 100 ? (
            <Button 
              variant="outline" 
              className="w-full border-learning-success text-learning-success"
              disabled
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full"
            >
              Continue Learning
            </Button>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground pt-2 border-t">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">4.8</span>
          <span>• 1,234 learners</span>
        </div>
      </CardContent>
    </Card>
  );
};