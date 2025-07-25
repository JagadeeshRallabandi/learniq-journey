import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, X, Sparkles } from "lucide-react";

interface GoalsFormProps {
  onSubmit: (goals: string[]) => void;
  onBack: () => void;
}

export const GoalsForm = ({ onSubmit, onBack }: GoalsFormProps) => {
  const [goals, setGoals] = useState<string[]>([]);
  const [currentGoal, setCurrentGoal] = useState("");
  const [interests, setInterests] = useState("");
  const [experience, setExperience] = useState("");

  const suggestedGoals = [
    "Learn React and modern frontend development",
    "Master Python for data science",
    "Build full-stack web applications",
    "Understand machine learning fundamentals",
    "Develop mobile apps with React Native",
    "Learn cloud computing and DevOps",
    "Master database design and management",
    "Build AI-powered applications",
  ];

  const addGoal = (goal: string) => {
    if (goal.trim() && !goals.includes(goal.trim())) {
      setGoals([...goals, goal.trim()]);
      setCurrentGoal("");
    }
  };

  const removeGoal = (goalToRemove: string) => {
    setGoals(goals.filter(goal => goal !== goalToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (goals.length > 0) {
      onSubmit(goals);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-learning-primary/2 to-learning-accent/2 p-4">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-learning-primary" />
              Set Your Learning Goals
            </CardTitle>
            <CardDescription>
              Tell us what you want to learn, and our AI will create personalized learning paths for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Goals */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Your Learning Goals</Label>
                {goals.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {goals.map((goal, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1 px-3">
                        {goal}
                        <button
                          type="button"
                          onClick={() => removeGoal(goal)}
                          className="ml-2 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a learning goal..."
                    value={currentGoal}
                    onChange={(e) => setCurrentGoal(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addGoal(currentGoal);
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => addGoal(currentGoal)}
                    disabled={!currentGoal.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Suggested Goals */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Popular Learning Goals</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {suggestedGoals.map((goal, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="ghost"
                      className="justify-start h-auto p-3 text-left"
                      onClick={() => addGoal(goal)}
                      disabled={goals.includes(goal)}
                    >
                      <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{goal}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="interests">Areas of Interest (optional)</Label>
                  <Textarea
                    id="interests"
                    placeholder="Tell us about your interests, hobbies, or specific technologies you're curious about..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Current Experience Level (optional)</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe your current skills and experience level..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-learning-primary hover:bg-learning-primary/90"
                size="lg"
                disabled={goals.length === 0}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Learning Paths ({goals.length} goals)
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};