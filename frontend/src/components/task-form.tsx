'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TaskAPI, Task, CreateTaskInput } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onTaskAdded: (task: Task) => void;
  categories: string[];
}

export function TaskForm({ onTaskAdded, categories }: TaskFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      setIsSubmitting(true);

      // If a new category is being added, use that instead
      if (showNewCategoryInput && newCategory) {
        data.category = newCategory;
      }

      const taskInput: CreateTaskInput = {
        title: data.title,
        description: data.description,
        category: data.category,
        completed: false,
      };

      const createdTask = await TaskAPI.createTask(taskInput);
      onTaskAdded(createdTask);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
      reset();
      setNewCategory('');
      setShowNewCategoryInput(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowNewCategoryInput(true);
      setValue('category', '');
    } else {
      setShowNewCategoryInput(false);
      setValue('category', value);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">Task Title</Label>
        <Input 
          id="title" 
          {...register('title')} 
          placeholder="Enter task title"
          className="rounded-lg border-input focus-visible:ring-primary"
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Description (Optional)</Label>
        <Input 
          id="description" 
          {...register('description')} 
          placeholder="Enter task description"
          className="rounded-lg border-input focus-visible:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">Category (Optional)</Label>
        {showNewCategoryInput ? (
          <div className="flex space-x-2">
            <Input
              id="new-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category"
              className="rounded-lg border-input focus-visible:ring-primary"
              autoFocus
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowNewCategoryInput(false);
                setNewCategory('');
              }}
              className="rounded-lg"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <select
              id="category"
              {...register('category')}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="new">+ Add new category</option>
            </select>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting} 
        className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 mt-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </>
        )}
      </Button>
    </form>
  );
}