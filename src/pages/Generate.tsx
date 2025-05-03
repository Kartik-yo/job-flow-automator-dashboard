
import React from 'react';
import Layout from '@/components/Layout';
import ContentForm from '@/components/generate/ContentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { jobs } from '@/lib/data';
import { toast } from 'sonner';

const Generate = () => {
  const handleGenerate = (data: any) => {
    console.log('Generated content with data:', data);
    // In a real app, this would make an API call to an AI service
  };

  const handleSample = (type: string) => {
    toast(`Sample ${type} template loaded`, {
      description: "The template has been applied to the form."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Generate Content</h1>
          <p className="text-muted-foreground">Create AI-powered content for your job applications.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ContentForm jobs={jobs} onGenerate={handleGenerate} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates</CardTitle>
                <CardDescription>
                  Start with pre-made templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <button 
                  onClick={() => handleSample('resume')}
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-accent"
                >
                  <div className="font-medium">ATS-optimized Resume</div>
                  <div className="text-sm text-muted-foreground">
                    Clean format for ATS systems
                  </div>
                </button>
                <button 
                  onClick={() => handleSample('email')}
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-accent"
                >
                  <div className="font-medium">Cold Email Template</div>
                  <div className="text-sm text-muted-foreground">
                    Direct outreach to hiring managers
                  </div>
                </button>
                <button 
                  onClick={() => handleSample('cover')}
                  className="block w-full text-left px-4 py-2 rounded-md hover:bg-accent"
                >
                  <div className="font-medium">Cover Letter Format</div>
                  <div className="text-sm text-muted-foreground">
                    Professional cover letter structure
                  </div>
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h3 className="font-medium mb-1">Be specific</h3>
                  <p className="text-muted-foreground">
                    Include the exact job description to get more tailored results.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Review AI output</h3>
                  <p className="text-muted-foreground">
                    Always review and personalize AI-generated content before sending.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Highlight your strengths</h3>
                  <p className="text-muted-foreground">
                    Add specific achievements or skills you want to emphasize.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Generate;
