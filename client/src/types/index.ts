export type User = {
    id: number;
    name: string;
    email: string;
    createdAt: string;
  };
  
  export type LoginResponse = {
    token: string;
  };
  
  export type LeadStage =
    | "new"
    | "contacted"
    | "qualified"
    | "proposal"
    | "won"
    | "lost";
  
  export type Company = {
    id: number;
    name: string;
    website: string | null;
    industry: string | null;
    createdAt: string;
    updatedAt: string;
    _count?: {
      leads: number;
    };
  };
  
  export type Note = {
    id: number;
    content: string;
    leadId: number;
    createdAt: string;
  };
  
  export type Lead = {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    stage: LeadStage;
    value: number | null;
    company: Company | null;
    notes: Note[];
    createdAt: string;
    updatedAt: string;
  };
  
  export type DashboardSummary = {
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    wonLeads: number;
    lostLeads: number;
    pipelineValue: number;
  };