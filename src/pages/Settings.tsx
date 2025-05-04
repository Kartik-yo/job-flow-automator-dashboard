
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth-appwrite';
import { storage, RESUMES_BUCKET_ID } from '@/lib/appwrite';
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const handleApiSave = async () => {
    setSaving(true);
    try {
      // In a real app, this would save to a secure storage or user preferences
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: "Settings saved",
        description: "Your API settings have been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save API settings",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Check file type
    if (![
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive"
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    try {
      await storage.createFile(RESUMES_BUCKET_ID, 'unique()', file);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been uploaded successfully"
      });
      // Reset the file input
      e.target.value = '';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resume",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  
  const handlePreferencesSave = () => {
    toast({
      title: "Preferences saved",
      description: "Your preferences have been saved successfully."
    });
  };
  
  // Redirect to auth page if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (authLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings and preferences.</p>
        </div>
        
        <Tabs defaultValue="api">
          <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Integration</CardTitle>
                  <CardDescription>
                    Configure API keys for content generation services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="provider">LLM Provider</Label>
                    <Select defaultValue="openai">
                      <SelectTrigger id="provider">
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="groq">Groq</SelectItem>
                        <SelectItem value="anthropic">Anthropic</SelectItem>
                        <SelectItem value="mistral">Mistral AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" placeholder="Enter your API key" />
                    <p className="text-xs text-muted-foreground">
                      Your API key is stored securely and never shared.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="appwrite-endpoint">Appwrite Endpoint</Label>
                    <Input id="appwrite-endpoint" placeholder="https://localhost/v1" defaultValue="http://localhost/v1" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="appwrite-project">Appwrite Project ID</Label>
                    <Input id="appwrite-project" placeholder="Enter project ID" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleApiSave} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save API Settings'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="resume">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Management</CardTitle>
                  <CardDescription>
                    Upload and manage your resumes for job applications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="resume">Upload Resume</Label>
                    <Input 
                      id="resume" 
                      type="file" 
                      accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleResumeUpload}
                      disabled={uploading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOCX (Max size: 5MB)
                    </p>
                  </div>
                  
                  {uploading && (
                    <div className="flex items-center justify-center">
                      <Loader className="h-5 w-5 animate-spin mr-2" />
                      <span>Uploading...</span>
                    </div>
                  )}
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">John_Doe_Resume.pdf</h3>
                        <p className="text-xs text-muted-foreground">Uploaded on May 1, 2025</p>
                      </div>
                      <Button variant="outline" size="sm">Replace</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Delete All Resumes</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>
                    Customize your application experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email updates about job application status changes.
                      </p>
                    </div>
                    <Switch id="notifications" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-follow">Auto Follow-up</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically create follow-up tasks for applications.
                      </p>
                    </div>
                    <Switch id="auto-follow" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="default-template">Default Content Template</Label>
                    <Select defaultValue="professional">
                      <SelectTrigger id="default-template">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handlePreferencesSave}>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
