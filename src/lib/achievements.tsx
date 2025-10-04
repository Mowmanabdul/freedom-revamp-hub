import {
  Award,
  Book,
  Brain,
  Calendar,
  Flame,
  Heart,
  Shield,
  Star,
  Swords,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { Achievement } from "@/types/quest";

export const allAchievements: Achievement[] = [
  {
    id: "quests_1",
    name: "First Step",
    description: "Complete your first quest.",
    tier: "bronze",
    icon: "Star",
  },
  {
    id: "quests_10",
    name: "Quest Novice",
    description: "Complete 10 quests.",
    tier: "bronze",
    icon: "Award",
  },
  {
    id: "quests_50",
    name: "Quest Adept",
    description: "Complete 50 quests.",
    tier: "silver",
    icon: "Trophy",
  },
  {
    id: "quests_100",
    name: "Quest Master",
    description: "Complete 100 quests.",
    tier: "gold",
    icon: "Shield",
  },
  {
    id: "streak_7",
    name: "Week of Fire",
    description: "Maintain a 7-day streak.",
    tier: "silver",
    icon: "Flame",
  },
  {
    id: "streak_30",
    name: "Month of Dedication",
    description: "Maintain a 30-day streak.",
    tier: "gold",
    icon: "Calendar",
  },
  {
    id: "level_5",
    name: "Level Up!",
    description: "Reach level 5.",
    tier: "bronze",
    icon: "Zap",
  },
  {
    id: "level_10",
    name: "Powering Up",
    description: "Reach level 10.",
    tier: "silver",
    icon: "Zap",
  },
  {
    id: "level_25",
    name: "True Potential",
    description: "Reach level 25.",
    tier: "gold",
    icon: "Zap",
  },
  {
    id: "category_fitness_10",
    name: "Fitness Fanatic",
    description: "Complete 10 quests in the 'Fitness' category.",
    tier: "silver",
    icon: "Heart",
  },
  {
    id: "category_work_10",
    name: "Workhorse",
    description: "Complete 10 quests in the 'Work' category.",
    tier: "silver",
    icon: "Swords",
  },
  {
    id: "category_learning_10",
    name: "Bookworm",
    description: "Complete 10 quests in the 'Learning' category.",
    tier: "silver",
    icon: "Book",
  },
];

export const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Star":
      return <Star className="w-full h-full" />;
    case "Award":
      return <Award className="w-full h-full" />;
    case "Trophy":
      return <Trophy className="w-full h-full" />;
    case "Shield":
      return <Shield className="w-full h-full" />;
    case "Flame":
      return <Flame className="w-full h-full" />;
    case "Calendar":
      return <Calendar className="w-full h-full" />;
    case "Zap":
      return <Zap className="w-full h-full" />;
    case "Heart":
      return <Heart className="w-full h-full" />;
    case "Swords":
      return <Swords className="w-full h-full" />;
    case "Book":
      return <Book className="w-full h-full" />;
    default:
      return <Star className="w-full h-full" />;
  }
};
