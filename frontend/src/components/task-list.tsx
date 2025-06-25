'use client';

import { useState } from 'react';
import { Task, TaskAPI } from '@/lib/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { formatDate } from '@/lib/utils';
import { Pencil, Trash2, Loader2, ListTodo, PlusCircle } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: number) => void;
  loading: boolean;
}

export function TaskList({
  tasks,
  onTaskUpdated,
  onTaskDeleted,
  loading,
}: TaskListProps) {
  const { toast } = useToast();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description || '');
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    if (!editingTask) return;

    try {
      const updatedTask = await TaskAPI.updateTask(editingTask.id, {
        ...editingTask,
        title: editedTitle,
        description: editedDescription,
      });

      onTaskUpdated(updatedTask);
      toast({ title: 'Task updated successfully' });
    } catch (error) {
      toast({ title: 'Failed to update task' });
    } finally {
      setIsEditing(false);
      setEditingTask(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTaskId) return;

    try {
      await TaskAPI.deleteTask(deleteTaskId);
      onTaskDeleted(deleteTaskId);
      toast({ title: 'Task deleted successfully' });
    } catch (error) {
      toast({ title: 'Failed to delete task' });
    } finally {
      setIsDeleting(false);
      setDeleteTaskId(null);
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-muted-foreground text-center space-y-2">
          <ListTodo className="mx-auto h-8 w-8" />
          <p>No tasks available. Create a new one!</p>
        </div>
      ) : (
        tasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-4 flex items-start justify-between space-x-4">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">{task.title}</h3>
                {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}
                <div className="flex items-center space-x-2 text-xs">
                  {task.category && (
                    <span className="category-pill">
                      {task.category}
                    </span>
                  )}
                  <span>{formatDate(new Date(task.createdAt))}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost" onClick={() => handleEditClick(task)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    setDeleteTaskId(task.id);
                    setIsDeleting(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Edit Task Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this task?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
