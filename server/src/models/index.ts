export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    socialId?: string;
    provider: "local" | "google";
    subscriptionStatus: string// "active" or "inactive"
   stripeCustomerId?: string // Stripe Customer ID
    projects: IProject[];
    teams: ITeamMember[];
    assignedTasks: ITask[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface IProject {
    id: string;
    name: string;
    description: string;
    teamId: string;
    tasks: ITask[];
    owner: IUser;
    team: ITeam;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ITask {
    id: string;
    title: string;
    status: "pending" | "in-progress" | "completed";
    description?: string;
    projectId: string;
    assignedToId?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ITeam {
    id: string;
    name: string;
    members: ITeamMember[];
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface ITeamMember {
    id: string;
    userId: string;
    teamId: string;
    role: "Owner" | "Member";
  }
  