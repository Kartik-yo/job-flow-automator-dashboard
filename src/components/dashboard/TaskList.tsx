
import React from 'react';
import { Task } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface TaskListProps {
  tasks: Task[];
  onComplete?: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete = () => {} }) => {
  // Sort tasks by date
  const sortedTasks = [...tasks].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 hover:bg-accent/50"
              >
                <div className="flex items-center space-x-3">
                  <Checkbox 
                    id={`task-${task.id}`} 
                    checked={task.completed}
                    onCheckedChange={() => onComplete(task.id)}
                  />
                  <div>
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.title}
                    </label>
                    {task.company && (
                      <p className="text-sm text-muted-foreground">{task.company}</p>
                    )}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{formatDate(task.date)}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">No upcoming tasks</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskList;
