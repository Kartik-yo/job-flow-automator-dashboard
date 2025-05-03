
import React from 'react';
import Layout from '@/components/Layout';
import ContentCard from '@/components/history/ContentCard';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { generatedContent } from '@/lib/data';
import { Search } from 'lucide-react';

const History = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content History</h1>
          <p className="text-muted-foreground">Access and reuse your previously generated content.</p>
        </div>
        
        <div className="flex items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
            />
          </div>
          <div className="ml-4 space-x-2 hidden sm:flex">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>
        
        {generatedContent.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {generatedContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center p-6 text-center">
            <CardHeader>
              <CardTitle>No content found</CardTitle>
              <CardDescription>
                Generate new content to see it here.
              </CardDescription>
            </CardHeader>
            <Button asChild className="mt-4">
              <a href="/generate">Create Content</a>
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default History;
