import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useQuest } from '@/contexts/QuestContext';
import { PlusCircle } from 'lucide-react';

const CATEGORIES = ['Work', 'Fitness', 'Learning', 'Creative', 'Social', 'Chores', 'Health'];

export const AddQuestForm = () => {
  const { addQuest } = useQuest();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [xp, setXp] = useState([50]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addQuest({
      name: name.trim(),
      category,
      priority,
      xp: xp[0],
      dueDate: dueDate || null,
    });

    setName('');
    setDueDate('');
    setXp([50]);
  };

  return (
    <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" />
          Create New Quest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quest-name">Quest Name</Label>
            <Input
              id="quest-name"
              placeholder="Enter quest name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
                <SelectTrigger id="priority">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due-date">Due Date (optional)</Label>
            <Input
              id="due-date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>XP Reward: {xp[0]}</Label>
            <Slider
              value={xp}
              onValueChange={setXp}
              min={10}
              max={200}
              step={10}
              className="py-4"
            />
          </div>

          <Button type="submit" className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Quest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
