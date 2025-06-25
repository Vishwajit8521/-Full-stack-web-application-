import { Progress } from '@/components/ui/progress';

interface TaskProgressProps {
  completedTasks: number;
  totalTasks: number;
  percentage: number;
}

export function TaskProgress({
  completedTasks,
  totalTasks,
  percentage,
}: TaskProgressProps) {
  // Determine the progress color based on percentage
  const getProgressColor = () => {
    if (percentage >= 75) return 'bg-gradient-to-r from-primary to-secondary';
    if (percentage >= 50) return 'bg-gradient-to-r from-secondary to-accent';
    if (percentage >= 25) return 'bg-secondary';
    return 'bg-primary/50';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {completedTasks} of {totalTasks} tasks completed
        </div>
        <div className="text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
          {Math.round(percentage)}%
        </div>
      </div>
      <Progress 
        value={percentage} 
        className={`h-3 rounded-full ${getProgressColor()}`} 
      />
      <div className="grid grid-cols-2 gap-6 pt-4">
        <div className="flex flex-col items-center justify-center rounded-xl border p-4 card-hover bg-gradient-to-br from-background to-primary/5">
          <div className="text-3xl font-bold gradient-heading">{totalTasks}</div>
          <div className="text-xs text-muted-foreground mt-1">Total Tasks</div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl border p-4 card-hover bg-gradient-to-br from-background to-secondary/5">
          <div className="text-3xl font-bold gradient-heading">{completedTasks}</div>
          <div className="text-xs text-muted-foreground mt-1">Completed</div>
        </div>
      </div>
    </div>
  );
}