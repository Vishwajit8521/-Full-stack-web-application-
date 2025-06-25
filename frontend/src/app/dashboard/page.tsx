'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Task, TaskAPI } from '@/lib/api';
import { TaskList } from '@/components/task-list';
import { TaskForm } from '@/components/task-form';
import { TaskProgress } from '@/components/task-progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenerateTasksForm } from '@/components/generate-tasks-form';
import { CheckCircle, ListTodo, PlusCircle, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // In your loadTasks function:
  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await TaskAPI.getTasks();
      setTasks(tasks);
    } catch (error) {
      setError('Failed to load tasks. Please try again.');
      toast({
        title: 'Error',
        description: 'Failed to load tasks. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // Update a task
  const updateTask = async (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task
  const deleteTask = async (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Filter tasks by category
  const filteredTasks = activeCategory
    ? tasks.filter((task) => task.category === activeCategory)
    : tasks;

  // ✅ Get unique categories (fixed to exclude falsy values)
  const categories = Array.from(
    new Set(
      tasks
        .map((task) => task.category)
        .filter((cat): cat is string => typeof cat === 'string' && !!cat)
    )
  );

  // Calculate completion percentage
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage =
    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
          <div>
            <h1 className="text-4xl font-bold gradient-heading mb-2">Welcome, {user?.firstName}!</h1>
            <p className="text-muted-foreground">Manage your tasks and boost your productivity</p>
          </div>
          <div className="hidden md:block bg-card p-3 rounded-full shadow-md">
            {user?.imageUrl && (
              <img 
                src={user.imageUrl} 
                alt={user.firstName || 'User'} 
                className="w-16 h-16 rounded-full"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Task Progress</CardTitle>
              </div>
              <CardDescription>Track your task completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskProgress
                completedTasks={completedTasks}
                totalTasks={tasks.length}
                percentage={completionPercentage}
              />
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-secondary" />
                <CardTitle>Add New Task</CardTitle>
              </div>
              <CardDescription>Create a new task to track</CardDescription>
            </CardHeader>
            <CardContent>
              <TaskForm onTaskAdded={addTask} categories={categories} />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 rounded-xl">
            <TabsTrigger value="tasks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-l-xl">
              <ListTodo className="mr-2 h-4 w-4" />
              My Tasks
            </TabsTrigger>
            <TabsTrigger value="generate" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground rounded-r-xl">
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="mt-6 animate-slide-up">
            <Card className="card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center">
                    <ListTodo className="mr-2 h-5 w-5 text-primary" />
                    My Tasks
                  </CardTitle>
                  <CardDescription>Manage and track your tasks</CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={activeCategory === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveCategory(null)}
                    className="rounded-full"
                  >
                    All
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={activeCategory === category ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => setActiveCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={filteredTasks}
                  onTaskUpdated={updateTask}
                  onTaskDeleted={deleteTask}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="mt-6 animate-slide-up">
            <Card className="card-hover bg-gradient-to-br from-background to-secondary/5">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-secondary" />
                  <CardTitle>Generate Tasks with AI</CardTitle>
                </div>
                <CardDescription>Let AI help you create task lists based on your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <GenerateTasksForm onTasksGenerated={addTask} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
