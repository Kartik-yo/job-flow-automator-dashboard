
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, MoreHorizontal, X } from 'lucide-react';
import { Job, JobStatus } from '@/lib/data';
import { cn } from '@/lib/utils';

interface JobTableProps {
  jobs: Job[];
  onStatusChange?: (jobId: string, status: JobStatus) => void;
}

const JobTable: React.FC<JobTableProps> = ({ jobs, onStatusChange = () => {} }) => {
  // State for sorting
  const [sortField, setSortField] = useState<keyof Job>('appliedDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Handle sort
  const handleSort = (field: keyof Job) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort jobs
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Status badge
  const renderStatus = (status: JobStatus) => {
    const statusConfig = {
      applied: { label: 'Applied', className: 'status-applied' },
      interview: { label: 'Interview', className: 'status-interview' },
      offered: { label: 'Offered', className: 'status-offered' },
      rejected: { label: 'Rejected', className: 'status-rejected' },
      accepted: { label: 'Accepted', className: 'status-accepted' },
    };

    const config = statusConfig[status];
    
    return (
      <Badge className={cn("font-medium", config.className)}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('company')}
            >
              Company
              {sortField === 'company' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('role')}
            >
              Role
              {sortField === 'role' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('appliedDate')}
            >
              Applied Date
              {sortField === 'appliedDate' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead 
              className="cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
              {sortField === 'status' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.company}</TableCell>
              <TableCell>{job.role}</TableCell>
              <TableCell>{formatDate(job.appliedDate)}</TableCell>
              <TableCell>{renderStatus(job.status)}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {job.notes || '—'}
              </TableCell>
              <TableCell>
                {job.resumeUploaded ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <X className="h-4 w-4 text-destructive" />
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onStatusChange(job.id, 'applied')}>
                      Mark as Applied
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(job.id, 'interview')}>
                      Mark as Interview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(job.id, 'offered')}>
                      Mark as Offered
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(job.id, 'rejected')}>
                      Mark as Rejected
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onStatusChange(job.id, 'accepted')}>
                      Mark as Accepted
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {jobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No job applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;
