import { type Project, type InsertProject, type Message, type InsertMessage } from "@shared/schema";

export interface IStorage {
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, content: string): Promise<Project | undefined>;
  getMessages(projectId: number): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private messages: Map<number, Message[]>;
  private currentProjectId: number;
  private currentMessageId: number;

  constructor() {
    this.projects = new Map();
    this.messages = new Map();
    this.currentProjectId = 1;
    this.currentMessageId = 1;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      versions: [],
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, content: string): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updated = {
      ...project,
      content,
      versions: [...project.versions, { content, timestamp: new Date() }],
    };
    this.projects.set(id, updated);
    return updated;
  }

  async getMessages(projectId: number): Promise<Message[]> {
    return this.messages.get(projectId) || [];
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
    };

    const messages = this.messages.get(insertMessage.projectId) || [];
    messages.push(message);
    this.messages.set(insertMessage.projectId, messages);

    return message;
  }
}

export const storage = new MemStorage();
