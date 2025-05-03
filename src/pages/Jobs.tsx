
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import JobTable from '@/components/jobs/JobTable';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { jobs as initialJobs, JobStatus } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Jobs = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const { toast } = useToast();

  const handleStatusChange = (jobId: string, status: JobStatus) => {
    setJobs(jobs.map((job) => 
      job.id === jobId ? { ...job, status } : job
    ));

    toast({
      title: "Status updated",
      description: `Job status has been updated to ${status}.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
            <p className="text-muted-foreground">Manage and track your job applications.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
        </div>

        <JobTable jobs={jobs} onStatusChange={handleStatusChange} />
      </div>
    </Layout>
  );
};

export default Jobs;
