
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import TaskList from '@/components/dashboard/TaskList';
import { jobs, tasks, getJobStats } from '@/lib/data';
import { Briefcase, Calendar, CheckCircle, XCircle } from 'lucide-react';

const Index = () => {
  const [taskList, setTaskList] = useState(tasks);
  const stats = getJobStats();

  const handleTaskComplete = (taskId: string) => {
    setTaskList(taskList.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your job applications and upcoming tasks.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Applications" 
            value={stats.total} 
            icon={<Briefcase className="h-5 w-5" />}
          />
          <StatCard 
            title="Interview Stage" 
            value={stats.interview} 
            className="border-warning"
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatCard 
            title="Offers" 
            value={stats.offered + stats.accepted} 
            className="border-success"
            icon={<CheckCircle className="h-5 w-5" />} 
          />
          <StatCard 
            title="Rejections" 
            value={stats.rejected}
            className="border-destructive"
            icon={<XCircle className="h-5 w-5" />}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Recent Applications</h2>
            <div className="space-y-4">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{job.company}</h3>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium status-${job.status}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{job.role}</p>
                  {job.notes && <p className="text-sm">{job.notes}</p>}
                </div>
              ))}
            </div>
          </div>
          
          <TaskList tasks={taskList} onComplete={handleTaskComplete} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
