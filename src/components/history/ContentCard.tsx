
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GeneratedContent } from '@/lib/data';

interface ContentCardProps {
  content: GeneratedContent;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getContentTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      resume: 'Resume',
      email: 'Cold Email',
      referral: 'Referral Request',
      linkedin: 'LinkedIn Message',
      cover: 'Cover Letter',
    };
    return typeLabels[type] || type;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    const filename = `${content.type}-${content.company || 'untitled'}.txt`;
    const blob = new Blob([content.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded",
      description: `File saved as ${filename}`,
    });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{content.company || 'Untitled'}</CardTitle>
            {content.role && (
              <p className="text-sm text-muted-foreground mt-1">{content.role}</p>
            )}
          </div>
          <Badge variant="outline">{getContentTypeLabel(content.type)}</Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Generated on {formatDate(content.dateGenerated)}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="border rounded-md p-3 h-[150px] overflow-auto whitespace-pre-line text-sm">
          {content.content}
        </div>
      </CardContent>
      <CardFooter className="pt-3 flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        <Button variant="default" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
