const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  userId: string;
  grade: string;
  level: number;
  totalPoints: number;
  subjects: Subject[];
  achievements: Achievement[];
  recentActivities: Activity[];
  notifications: Notification[];
}

export interface Subject {
  id: string;
  name: string;
  teacherId: string;
  teacherName: string;
  grade: number;
  progress: number;
  color: string;
  icon: string;
  nextExam?: string;
  assignments: Assignment[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  grade?: number;
  type: 'exam' | 'homework' | 'project' | 'quiz';
  subjectId: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
  unlockedAt?: string;
  studentId: string;
}

export interface Activity {
  id: string;
  type: 'login' | 'assignment' | 'achievement' | 'exam' | 'study';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  studentId: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  userId: string;
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Error en la petición',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión',
      };
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    const token = this.getToken();
    return this.request('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Student endpoints
  async getStudentProfile(): Promise<ApiResponse<Student>> {
    const token = this.getToken();
    return this.request('/students/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getStudentSubjects(): Promise<ApiResponse<Subject[]>> {
    const token = this.getToken();
    return this.request('/students/subjects', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getStudentAssignments(): Promise<ApiResponse<Assignment[]>> {
    const token = this.getToken();
    return this.request('/students/assignments', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getStudentAchievements(): Promise<ApiResponse<Achievement[]>> {
    const token = this.getToken();
    return this.request('/students/achievements', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getStudentActivities(): Promise<ApiResponse<Activity[]>> {
    const token = this.getToken();
    return this.request('/students/activities', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getNotifications(): Promise<ApiResponse<Notification[]>> {
    const token = this.getToken();
    return this.request('/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    const token = this.getToken();
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Assignment actions
  async completeAssignment(assignmentId: string): Promise<ApiResponse<void>> {
    const token = this.getToken();
    return this.request(`/assignments/${assignmentId}/complete`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async submitAssignment(assignmentId: string, submission: any): Promise<ApiResponse<void>> {
    const token = this.getToken();
    return this.request(`/assignments/${assignmentId}/submit`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submission),
    });
  }

  // AI Assistant
  async sendMessage(message: string): Promise<ApiResponse<{ response: string }>> {
    const token = this.getToken();
    return this.request('/ai/chat', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
  }

  // Utility methods
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const apiService = new ApiService();
