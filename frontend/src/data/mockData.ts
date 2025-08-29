export interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  grade: string;
  level: number;
  totalPoints: number;
  achievements: Achievement[];
  subjects: Subject[];
  recentActivities: Activity[];
  notifications: Notification[];
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
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
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
  grade?: number;
  type: 'exam' | 'homework' | 'project' | 'quiz';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  points: number;
  unlockedAt?: string;
}

export interface Activity {
  id: string;
  type: 'login' | 'assignment' | 'achievement' | 'exam' | 'study';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Datos mock realistas
export const mockStudent: Student = {
  id: '1',
  name: 'María García López',
  email: 'maria.garcia@estudiante.edu',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  grade: '3º ESO',
  level: 8,
  totalPoints: 2847,
  achievements: [
    {
      id: '1',
      name: 'Primer Paso',
      description: 'Completaste tu primera tarea',
      icon: '🎯',
      unlocked: true,
      points: 50,
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Estudiante Dedicado',
      description: '7 días consecutivos de estudio',
      icon: '🔥',
      unlocked: true,
      points: 100,
      unlockedAt: '2024-01-22'
    },
    {
      id: '3',
      name: 'Matemático',
      description: 'Completaste 10 ejercicios de matemáticas',
      icon: '📐',
      unlocked: false,
      points: 200
    },
    {
      id: '4',
      name: 'Lector Avanzado',
      description: 'Leíste 5 libros completos',
      icon: '📚',
      unlocked: false,
      points: 300
    }
  ],
  subjects: [
    {
      id: '1',
      name: 'Matemáticas',
      teacher: 'Prof. Rodríguez',
      grade: 8.5,
      progress: 75,
      color: '#3B82F6',
      icon: '📐',
      nextExam: '2024-02-15',
      assignments: [
        {
          id: '1',
          title: 'Ecuaciones cuadráticas',
          dueDate: '2024-02-10',
          status: 'pending',
          type: 'homework'
        },
        {
          id: '2',
          title: 'Examen Unidad 3',
          dueDate: '2024-02-15',
          status: 'pending',
          type: 'exam'
        }
      ]
    },
    {
      id: '2',
      name: 'Ciencias',
      teacher: 'Prof. Martínez',
      grade: 9.2,
      progress: 80,
      color: '#10B981',
      icon: '🔬',
      assignments: [
        {
          id: '3',
          title: 'Proyecto de Biología',
          dueDate: '2024-02-20',
          status: 'completed',
          grade: 9.5,
          type: 'project'
        }
      ]
    },
    {
      id: '3',
      name: 'Historia',
      teacher: 'Prof. López',
      grade: 7.8,
      progress: 65,
      color: '#F59E0B',
      icon: '📜',
      assignments: [
        {
          id: '4',
          title: 'Ensayo sobre la Revolución Industrial',
          dueDate: '2024-02-08',
          status: 'overdue',
          type: 'homework'
        }
      ]
    },
    {
      id: '4',
      name: 'Literatura',
      teacher: 'Prof. Sánchez',
      grade: 8.8,
      progress: 90,
      color: '#8B5CF6',
      icon: '📖',
      assignments: [
        {
          id: '5',
          title: 'Análisis de Don Quijote',
          dueDate: '2024-02-25',
          status: 'pending',
          type: 'homework'
        }
      ]
    }
  ],
  recentActivities: [
    {
      id: '1',
      type: 'achievement',
      title: '¡Nuevo logro desbloqueado!',
      description: 'Has ganado el logro "Estudiante Dedicado"',
      timestamp: '2024-01-22T10:30:00Z',
      icon: '🏆'
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Tarea completada',
      description: 'Proyecto de Biología entregado',
      timestamp: '2024-01-21T15:45:00Z',
      icon: '✅'
    },
    {
      id: '3',
      type: 'exam',
      title: 'Examen programado',
      description: 'Examen de Matemáticas en 3 días',
      timestamp: '2024-01-20T09:15:00Z',
      icon: '📝'
    }
  ],
  notifications: [
    {
      id: '1',
      type: 'warning',
      title: 'Tarea pendiente',
      message: 'El ensayo de Historia está atrasado',
      timestamp: '2024-01-22T08:00:00Z',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: '¡Excelente trabajo!',
      message: 'Has obtenido un 9.5 en el proyecto de Biología',
      timestamp: '2024-01-21T16:30:00Z',
      read: true
    },
    {
      id: '3',
      type: 'info',
      title: 'Nuevo material disponible',
      message: 'Se ha subido nuevo contenido para Matemáticas',
      timestamp: '2024-01-20T14:20:00Z',
      read: false
    }
  ]
};

export const mockTeachers = [
  {
    id: '1',
    name: 'Prof. Rodríguez',
    subject: 'Matemáticas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Prof. Martínez',
    subject: 'Ciencias',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Prof. López',
    subject: 'Historia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockMessages = [
  {
    id: '1',
    from: 'Prof. Rodríguez',
    subject: 'Recordatorio: Examen de Matemáticas',
    message: 'Hola María, te recuerdo que el próximo jueves tienes el examen de la Unidad 3. No olvides repasar las ecuaciones cuadráticas.',
    date: '2024-01-22T10:00:00Z',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    from: 'Sistema',
    subject: 'Nuevo logro desbloqueado',
    message: '¡Felicidades! Has desbloqueado el logro "Estudiante Dedicado" por estudiar 7 días consecutivos.',
    date: '2024-01-21T15:30:00Z',
    unread: false,
    avatar: '🤖'
  },
  {
    id: '3',
    from: 'Prof. Martínez',
    subject: 'Proyecto de Biología evaluado',
    message: 'Excelente trabajo en el proyecto. Has obtenido un 9.5. ¡Sigue así!',
    date: '2024-01-20T14:15:00Z',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  }
];
