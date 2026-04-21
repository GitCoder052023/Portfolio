import PublicationsProject from "@/app/ui/sections/PublicationsProject";
import ExamBazarProject from "@/app/ui/sections/ExamBazarProject";

export const MEGA_PROJECTS = [
  { 
    id: "publications", 
    component: PublicationsProject, 
    name: "Publications Platform",
    type: "Backend Focused"
  },
  { 
    id: "exam-bazar", 
    component: ExamBazarProject, 
    name: "Exam Bazar",
    type: "Enterprise E-commerce"
  },
];
