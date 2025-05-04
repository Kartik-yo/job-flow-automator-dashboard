
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/lib/data';
import { ContentType, generatedContentApi } from '@/lib/appwrite';
import { useAuth } from '@/hooks/use-auth-appwrite';
import { Navigate } from 'react-router-dom';

interface ContentFormProps {
  jobs: Job[];
  onGenerate?: (data: any) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({ jobs, onGenerate = () => {} }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [contentType, setContentType] = useState<string>('resume');
  const [selectedJob, setSelectedJob] = useState<string>('none');
  const [jobDescription, setJobDescription] = useState<string>('');

  // Redirect to auth page if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentType) {
      toast({
        title: "Error",
        description: "Please select a content type",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Error",
        description: "Please provide a job description",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const job = jobs.find(j => j.id === selectedJob);
      
      // Map the content type string to our Appwrite enum
      const contentTypeEnum = contentType as keyof typeof ContentType;
      
      // Call the Appwrite function to generate content
      const result = await generatedContentApi.generate(
        ContentType[contentTypeEnum],
        jobDescription
      );
      
      onGenerate({
        contentType,
        jobId: selectedJob,
        company: job?.company,
        role: job?.role,
        jobDescription,
        resultText: result.resultText
      });
      
      toast({
        title: "Content generated",
        description: `Your ${contentType} has been created successfully.`
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contentTypeOptions = [
    { value: 'resume', label: 'Resume' },
    { value: 'email', label: 'Cold Email' },
    { value: 'referral', label: 'Referral Request' },
    { value: 'linkedin', label: 'LinkedIn Message' },
    { value: 'cover', label: 'Cover Letter' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Content</CardTitle>
        <CardDescription>
          Create personalized content for your job applications
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleGenerate}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select 
              value={contentType} 
              onValueChange={setContentType}
            >
              <SelectTrigger id="content-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job">Related Job (Optional)</Label>
            <Select 
              value={selectedJob} 
              onValueChange={setSelectedJob}
            >
              <SelectTrigger id="job">
                <SelectValue placeholder="Select job" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {jobs.map(job => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.company} - {job.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea 
              id="job-description" 
              placeholder="Paste the job description here..." 
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Adding the job description helps tailor the content to match the requirements.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Generating
              </>
            ) : (
              'Generate Content'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContentForm;
