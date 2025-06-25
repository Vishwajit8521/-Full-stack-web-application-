'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GeminiAPI, TaskAPI, Task } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const generateTasksSchema = z.object({
  topic: z.string().min(1, 'Topic is required'),
});

type GenerateTasksFormValues = z.infer<typeof generateTasksSchema>;

interface GenerateTasksFormProps {
  onTasksGenerated: (task: Task) => void;
}

export function GenerateTasksForm({ onTasksGenerated }: GenerateTasksFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<{ title: string }[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateTasksFormValues>({
    resolver: zodResolver(generateTasksSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit = async (data: GenerateTasksFormValues) => {
    try {
      setIsGenerating(true);
      setGeneratedTasks([]);
      setSelectedTasks({});

      const tasks = await GeminiAPI.generateTasks(data.topic);
      setGeneratedTasks(tasks);

      // Initialize all tasks as selected
      const initialSelectedState: { [key: string]: boolean } = {};
      tasks.forEach((task, index) => {
        initialSelectedState[index] = true;
      });
      setSelectedTasks(initialSelectedState);

      toast({
        title: 'Success',
        description: `Generated ${tasks.length} tasks for "${data.topic}"`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleTaskSelection = (index: number) => {
    setSelectedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const saveSelectedTasks = async () => {
    try {
      setIsSubmitting(true);

      // Filter selected tasks
      const tasksToSave = generatedTasks
        .filter((_, index) => selectedTasks[index])
        .map((task) => ({
          title: task.title,
          completed: false,
        }));

      if (tasksToSave.length === 0) {
        toast({
          title: 'Warning',
          description: 'Please select at least one task to save.',
          variant: 'destructive',
        });
        return;
      }

      // Save tasks in bulk
      const savedTasks = await TaskAPI.createMultipleTasks(tasksToSave);

      // Notify parent component about each new task
      savedTasks.forEach((task) => {
        onTasksGenerated(task);
      });

      // Reset form state
      setGeneratedTasks([]);
      setSelectedTasks({});

      toast({
        title: 'Success',
        description: `Saved ${savedTasks.length} tasks to your list`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-sm font-medium">Topic or Project</Label>
          <div className="relative">
            <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary opacity-70" />
            <Input
              id="topic"
              {...register('topic')}
              placeholder="e.g., Website Redesign, Home Renovation, Learning Spanish"
              className="pl-10 rounded-lg border-input focus-visible:ring-secondary"
            />
          </div>
          {errors.topic && (
            <p className="text-sm text-destructive mt-1">{errors.topic.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={isGenerating}
          className="w-full rounded-lg bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Tasks
            </>
          )}
        </Button>
      </form>

      {generatedTasks.length > 0 && (
        <div className="space-y-4">
          <div className="rounded-md border p-4">
            <h3 className="font-medium mb-2">Generated Tasks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Select the tasks you want to add to your list:
            </p>
            <div className="space-y-2">
              {generatedTasks.map((task, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`task-${index}`}
                    checked={selectedTasks[index] || false}
                    onChange={() => toggleTaskSelection(index)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`task-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {task.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={saveSelectedTasks}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Selected Tasks'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}