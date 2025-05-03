
export type JobStatus = 'applied' | 'interview' | 'offered' | 'rejected' | 'accepted';

export interface Job {
  id: string;
  company: string;
  role: string;
  appliedDate: string;
  status: JobStatus;
  notes?: string;
  resumeUploaded: boolean;
}

export interface Task {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  jobId?: string;
  company?: string;
}

export interface GeneratedContent {
  id: string;
  type: 'resume' | 'email' | 'referral' | 'linkedin' | 'cover';
  jobId?: string;
  company?: string;
  role?: string;
  dateGenerated: string;
  content: string;
}

// Mock data for jobs
export const jobs: Job[] = [
  {
    id: '1',
    company: 'TechCorp Inc.',
    role: 'Frontend Developer',
    appliedDate: '2025-04-28',
    status: 'interview',
    notes: 'Technical interview scheduled for May 10th',
    resumeUploaded: true,
  },
  {
    id: '2',
    company: 'Data Systems',
    role: 'Full Stack Engineer',
    appliedDate: '2025-04-25',
    status: 'applied',
    resumeUploaded: true,
  },
  {
    id: '3',
    company: 'InnovateSoft',
    role: 'UI/UX Developer',
    appliedDate: '2025-04-20',
    status: 'rejected',
    notes: 'Position filled internally',
    resumeUploaded: true,
  },
  {
    id: '4',
    company: 'Web Solutions',
    role: 'React Developer',
    appliedDate: '2025-05-01',
    status: 'applied',
    resumeUploaded: false,
  },
  {
    id: '5',
    company: 'Digital Future',
    role: 'Software Engineer',
    appliedDate: '2025-04-15',
    status: 'offered',
    notes: 'Offer received: $120K, reviewing contract',
    resumeUploaded: true,
  },
  {
    id: '6',
    company: 'CloudScale',
    role: 'DevOps Engineer',
    appliedDate: '2025-04-10',
    status: 'accepted',
    notes: 'Start date: May 15th',
    resumeUploaded: true,
  },
];

// Mock data for tasks
export const tasks: Task[] = [
  {
    id: '1',
    title: 'Prepare for TechCorp interview',
    date: '2025-05-10',
    completed: false,
    jobId: '1',
    company: 'TechCorp Inc.'
  },
  {
    id: '2',
    title: 'Follow up with Data Systems',
    date: '2025-05-04',
    completed: false,
    jobId: '2',
    company: 'Data Systems'
  },
  {
    id: '3',
    title: 'Upload resume to Web Solutions application',
    date: '2025-05-03',
    completed: false,
    jobId: '4',
    company: 'Web Solutions'
  },
  {
    id: '4',
    title: 'Review Digital Future offer',
    date: '2025-05-05',
    completed: false,
    jobId: '5',
    company: 'Digital Future'
  }
];

// Mock data for generated content
export const generatedContent: GeneratedContent[] = [
  {
    id: '1',
    type: 'resume',
    jobId: '1',
    company: 'TechCorp Inc.',
    role: 'Frontend Developer',
    dateGenerated: '2025-04-27',
    content: `# John Doe\n## Frontend Developer\n\n**Skills**\n- React/Redux\n- TypeScript\n- CSS/Tailwind\n- Responsive Design\n\n**Experience**\n**Senior Frontend Developer | WebTech | 2023-Present**\n- Implemented responsive web applications using React\n- Improved site performance by 45%\n\n**Frontend Developer | DataViz | 2020-2023**\n- Built interactive data visualization dashboards\n- Maintained component library using Storybook`
  },
  {
    id: '2',
    type: 'cover',
    jobId: '2',
    company: 'Data Systems',
    role: 'Full Stack Engineer',
    dateGenerated: '2025-04-24',
    content: `Dear Hiring Manager,\n\nI am writing to express my interest in the Full Stack Engineer position at Data Systems. With my background in both frontend and backend technologies, I believe I would be a valuable addition to your team.\n\nMy experience includes working with React, Node.js, and SQL databases on projects that required scalable solutions. In my current role, I've successfully implemented microservices architecture that improved system reliability by 30%.\n\nI'm particularly drawn to Data Systems' work on distributed systems and would be excited to contribute to your innovative solutions.\n\nThank you for considering my application.\n\nSincerely,\nJohn Doe`
  },
  {
    id: '3',
    type: 'email',
    jobId: '3',
    company: 'InnovateSoft',
    role: 'UI/UX Developer',
    dateGenerated: '2025-04-19',
    content: `Subject: UI/UX Developer Application - John Doe\n\nHello,\n\nI hope this email finds you well. I'm reaching out to apply for the UI/UX Developer position at InnovateSoft.\n\nAs a frontend developer with a strong focus on user experience, I've helped create intuitive interfaces for web applications in the finance and healthcare sectors. I'm particularly proud of my work redesigning a patient portal that increased user satisfaction by 40%.\n\nI'm drawn to InnovateSoft's user-centered approach to product development and would love to bring my skills to your team.\n\nMy portfolio is available at portfolio.johndoe.com, and I've attached my resume for your review.\n\nBest regards,\nJohn Doe`
  },
];

// Calculate statistics
export const getJobStats = () => {
  const total = jobs.length;
  const applied = jobs.filter(job => job.status === 'applied').length;
  const interview = jobs.filter(job => job.status === 'interview').length;
  const offered = jobs.filter(job => job.status === 'offered').length;
  const accepted = jobs.filter(job => job.status === 'accepted').length;
  const rejected = jobs.filter(job => job.status === 'rejected').length;
  
  return {
    total,
    applied,
    interview,
    offered,
    accepted,
    rejected
  };
};

export const getContentStats = () => {
  const total = generatedContent.length;
  const resume = generatedContent.filter(content => content.type === 'resume').length;
  const email = generatedContent.filter(content => content.type === 'email').length;
  const referral = generatedContent.filter(content => content.type === 'referral').length;
  const linkedin = generatedContent.filter(content => content.type === 'linkedin').length;
  const cover = generatedContent.filter(content => content.type === 'cover').length;
  
  return {
    total,
    resume,
    email,
    referral,
    linkedin,
    cover
  };
};
