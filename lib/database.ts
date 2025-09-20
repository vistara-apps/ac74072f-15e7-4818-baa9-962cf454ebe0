import fs from 'fs';
import path from 'path';
import { User, Project, Task, Resource, Activity } from './types';

const DB_PATH = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DB_PATH, 'users.json');
const PROJECTS_FILE = path.join(DB_PATH, 'projects.json');
const TASKS_FILE = path.join(DB_PATH, 'tasks.json');
const RESOURCES_FILE = path.join(DB_PATH, 'resources.json');
const ACTIVITIES_FILE = path.join(DB_PATH, 'activities.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize empty JSON files if they don't exist
const initializeFile = (filePath: string, defaultData: any[] = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initializeFile(USERS_FILE, []);
initializeFile(PROJECTS_FILE, []);
initializeFile(TASKS_FILE, []);
initializeFile(RESOURCES_FILE, []);
initializeFile(ACTIVITIES_FILE, []);

// Generic database operations
class Database {
  private readFile<T>(filePath: string): T[] {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${filePath}:`, error);
      return [];
    }
  }

  private writeFile<T>(filePath: string, data: T[]): void {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(`Error writing ${filePath}:`, error);
      throw error;
    }
  }

  // Users
  getUsers(): User[] {
    return this.readFile<User>(USERS_FILE);
  }

  getUserById(userId: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.userId === userId) || null;
  }

  getUserByFarcasterId(farcasterId: string): User | null {
    const users = this.getUsers();
    return users.find(user => user.farcasterId === farcasterId) || null;
  }

  createUser(user: Omit<User, 'userId'>): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    users.push(newUser);
    this.writeFile(USERS_FILE, users);
    return newUser;
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const index = users.findIndex(user => user.userId === userId);
    if (index === -1) return null;

    users[index] = { ...users[index], ...updates };
    this.writeFile(USERS_FILE, users);
    return users[index];
  }

  // Projects
  getProjects(): Project[] {
    return this.readFile<Project>(PROJECTS_FILE);
  }

  getProjectById(projectId: string): Project | null {
    const projects = this.getProjects();
    return projects.find(project => project.projectId === projectId) || null;
  }

  getProjectsByUser(userId: string): Project[] {
    const projects = this.getProjects();
    return projects.filter(project => project.assignedUsers.includes(userId));
  }

  createProject(project: Omit<Project, 'projectId'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      projectId: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    projects.push(newProject);
    this.writeFile(PROJECTS_FILE, projects);
    return newProject;
  }

  updateProject(projectId: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const index = projects.findIndex(project => project.projectId === projectId);
    if (index === -1) return null;

    projects[index] = { ...projects[index], ...updates };
    this.writeFile(PROJECTS_FILE, projects);
    return projects[index];
  }

  // Tasks
  getTasks(): Task[] {
    return this.readFile<Task>(TASKS_FILE);
  }

  getTaskById(taskId: string): Task | null {
    const tasks = this.getTasks();
    return tasks.find(task => task.taskId === taskId) || null;
  }

  getTasksByProject(projectId: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.projectId === projectId);
  }

  getTasksByUser(userId: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => task.assignedUserId === userId);
  }

  createTask(task: Omit<Task, 'taskId'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      taskId: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    tasks.push(newTask);
    this.writeFile(TASKS_FILE, tasks);
    return newTask;
  }

  updateTask(taskId: string, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.taskId === taskId);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...updates };
    this.writeFile(TASKS_FILE, tasks);
    return tasks[index];
  }

  // Resources
  getResources(): Resource[] {
    return this.readFile<Resource>(RESOURCES_FILE);
  }

  getResourceById(resourceId: string): Resource | null {
    const resources = this.getResources();
    return resources.find(resource => resource.resourceId === resourceId) || null;
  }

  createResource(resource: Omit<Resource, 'resourceId'>): Resource {
    const resources = this.getResources();
    const newResource: Resource = {
      ...resource,
      resourceId: `resource_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    resources.push(newResource);
    this.writeFile(RESOURCES_FILE, resources);
    return newResource;
  }

  updateResource(resourceId: string, updates: Partial<Resource>): Resource | null {
    const resources = this.getResources();
    const index = resources.findIndex(resource => resource.resourceId === resourceId);
    if (index === -1) return null;

    resources[index] = { ...resources[index], ...updates };
    this.writeFile(RESOURCES_FILE, resources);
    return resources[index];
  }

  // Activities
  getActivities(limit: number = 50): Activity[] {
    const activities = this.readFile<Activity>(ACTIVITIES_FILE);
    return activities.slice(-limit).reverse(); // Return most recent first
  }

  createActivity(activity: Omit<Activity, 'id'>): Activity {
    const activities = this.readFile<Activity>(ACTIVITIES_FILE);
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    activities.push(newActivity);
    this.writeFile(ACTIVITIES_FILE, activities);
    return newActivity;
  }

  // Analytics helpers
  getTasksByStatus(): Record<string, number> {
    const tasks = this.getTasks();
    return tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  getProjectProgress(): Array<{ projectId: string; progress: number; name: string }> {
    const projects = this.getProjects();
    const tasks = this.getTasks();

    return projects.map(project => {
      const projectTasks = tasks.filter(task => task.projectId === project.projectId);
      if (projectTasks.length === 0) return { projectId: project.projectId, progress: 0, name: project.projectName };

      const completedTasks = projectTasks.filter(task => task.status === 'completed').length;
      const progress = (completedTasks / projectTasks.length) * 100;

      return { projectId: project.projectId, progress, name: project.projectName };
    });
  }

  getResourceUtilization(): Array<{ resourceId: string; utilization: number; name: string }> {
    const resources = this.getResources();
    return resources.map(resource => ({
      resourceId: resource.resourceId,
      utilization: resource.availability,
      name: resource.resourceName
    }));
  }
}

export const db = new Database();

