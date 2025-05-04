
import { Account, Avatars, Client, Databases, Functions, ID, Query, Storage } from 'appwrite';

// Initialize the Appwrite client
export const client = new Client();

client
  .setEndpoint('http://localhost/v1') // Your Appwrite endpoint
  .setProject('YOUR_PROJECT_ID'); // Replace with your project ID after creating it in Appwrite console

// Initialize Appwrite services
export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// Database and collection IDs (set these after creating in Appwrite console)
export const DATABASE_ID = 'jobFlowDB';
export const JOB_APPLICATIONS_COLLECTION_ID = 'jobApplications';
export const GENERATED_CONTENT_COLLECTION_ID = 'generatedContent';
export const RESUMES_BUCKET_ID = 'resumes';

// Status enum for job applications
export enum JobStatus {
  APPLIED = 'Applied',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  OFFER = 'Offer'
}

// Content type enum for generated content
export enum ContentType {
  RESUME = 'Resume',
  COLD_EMAIL = 'ColdEmail',
  REFERRAL = 'Referral',
  LINKEDIN = 'LinkedIn',
  COVER_LETTER = 'CoverLetter'
}

// Helper functions for job applications
export const jobApplicationsApi = {
  // Create a new job application
  create: async (company: string, role: string, appliedDate: Date, status: JobStatus, notes?: string) => {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        ID.unique(),
        {
          company,
          role,
          appliedDate: appliedDate.toISOString(),
          status,
          notes: notes || ''
        }
      );
    } catch (error) {
      console.error('Error creating job application:', error);
      throw error;
    }
  },

  // List job applications with optional filters
  list: async (queries: any[] = [Query.limit(100)]) => {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.error('Error listing job applications:', error);
      throw error;
    }
  },

  // Get a job application by ID
  get: async (id: string) => {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.error(`Error getting job application with ID ${id}:`, error);
      throw error;
    }
  },

  // Update a job application
  update: async (id: string, data: Partial<{
    company: string;
    role: string;
    appliedDate: string;
    status: JobStatus;
    notes: string;
  }>) => {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        id,
        data
      );
    } catch (error) {
      console.error(`Error updating job application with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a job application
  delete: async (id: string) => {
    try {
      return await databases.deleteDocument(
        DATABASE_ID,
        JOB_APPLICATIONS_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.error(`Error deleting job application with ID ${id}:`, error);
      throw error;
    }
  }
};

// Helper functions for generated content
export const generatedContentApi = {
  // Create new generated content
  create: async (contentType: ContentType, inputData: string, resultText: string) => {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        GENERATED_CONTENT_COLLECTION_ID,
        ID.unique(),
        {
          contentType,
          inputData,
          resultText,
          createdAt: new Date().toISOString()
        }
      );
    } catch (error) {
      console.error('Error creating generated content:', error);
      throw error;
    }
  },

  // List generated content with optional filters
  list: async (queries: any[] = [Query.limit(50), Query.orderDesc('createdAt')]) => {
    try {
      return await databases.listDocuments(
        DATABASE_ID,
        GENERATED_CONTENT_COLLECTION_ID,
        queries
      );
    } catch (error) {
      console.error('Error listing generated content:', error);
      throw error;
    }
  },

  // Get generated content by ID
  get: async (id: string) => {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        GENERATED_CONTENT_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.error(`Error getting generated content with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete generated content
  delete: async (id: string) => {
    try {
      return await databases.deleteDocument(
        DATABASE_ID,
        GENERATED_CONTENT_COLLECTION_ID,
        id
      );
    } catch (error) {
      console.error(`Error deleting generated content with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Generate content via Appwrite function and store it
  generate: async (contentType: ContentType, inputData: string) => {
    try {
      // Call Appwrite function
      const execution = await functions.createExecution(
        'generateContent', // Function ID (set this after creating the function in Appwrite console)
        JSON.stringify({
          contentType,
          inputData
        })
      );
      
      if (execution.status === 'completed' && execution.response) {
        const resultText = execution.response;
        
        // Store the generated content
        return await generatedContentApi.create(contentType, inputData, resultText);
      } else {
        throw new Error(`Function execution failed: ${execution.stderr}`);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  }
};

// Helper functions for resume storage
export const resumesApi = {
  // Upload a resume file
  upload: async (file: File) => {
    try {
      return await storage.createFile(
        RESUMES_BUCKET_ID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error('Error uploading resume:', error);
      throw error;
    }
  },

  // List all resumes
  list: async () => {
    try {
      return await storage.listFiles(
        RESUMES_BUCKET_ID
      );
    } catch (error) {
      console.error('Error listing resumes:', error);
      throw error;
    }
  },

  // Get a resume download URL
  getFileView: async (fileId: string) => {
    try {
      return storage.getFileView(
        RESUMES_BUCKET_ID,
        fileId
      );
    } catch (error) {
      console.error(`Error getting resume file view with ID ${fileId}:`, error);
      throw error;
    }
  },

  // Delete a resume
  delete: async (fileId: string) => {
    try {
      return await storage.deleteFile(
        RESUMES_BUCKET_ID,
        fileId
      );
    } catch (error) {
      console.error(`Error deleting resume with ID ${fileId}:`, error);
      throw error;
    }
  }
};

// Authentication helpers
export const authApi = {
  // Create a new account
  createAccount: async (email: string, password: string, name: string) => {
    try {
      return await account.create(ID.unique(), email, password, name);
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Login with email and password
  login: async (email: string, password: string) => {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Get the current user
  getCurrentUser: async () => {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error getting current user:', error);
      return null; // User is not logged in
    }
  },

  // Logout
  logout: async () => {
    try {
      return await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
};
