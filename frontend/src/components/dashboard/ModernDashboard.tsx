'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { mockStudent } from '@/data/mockData';
import Link from 'next/link';

export default function ModernDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const student = mockStudent;

  const handleLogout = () => {
    logout();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Atrasado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">G</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GEI Adeptify</h1>
                  <p className="text-sm text-gray-500">Plataforma Educativa</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {student.notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {student.notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.grade}</p>
                </div>
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                />
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">¡Bienvenida, {student.name.split(' ')[0]}!</h2>
              <p className="text-blue-100 mb-4">Continúa tu viaje de aprendizaje con GEI Adeptify</p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{student.level}</div>
                  <div className="text-sm text-blue-100">Nivel</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{student.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">Puntos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{student.achievements.filter(a => a.unlocked).length}</div>
                  <div className="text-sm text-blue-100">Logros</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-6xl">🎓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Promedio General</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(student.subjects.reduce((acc, sub) => acc + sub.grade, 0) / student.subjects.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tareas Completadas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.subjects.reduce((acc, sub) => acc + sub.assignments.filter(a => a.status === 'completed').length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <span className="text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.subjects.reduce((acc, sub) => acc + sub.assignments.filter(a => a.status === 'pending').length, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <span className="text-2xl">🚨</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Atrasadas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {student.subjects.reduce((acc, sub) => acc + sub.assignments.filter(a => a.status === 'overdue').length, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Vista General', icon: '📊' },
                { id: 'subjects', name: 'Materias', icon: '📚' },
                { id: 'assignments', name: 'Tareas', icon: '📝' },
                { id: 'achievements', name: 'Logros', icon: '🏆' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actividad Reciente</h3>
                  <div className="space-y-4">
                    {student.recentActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{activity.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-xs text-gray-500">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(activity.timestamp).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Link
                      href="/dashboard/ai"
                      className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🤖</div>
                      <div className="text-sm font-medium">Asistente IA</div>
                    </Link>
                    <Link
                      href="/dashboard/progress"
                      className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-center hover:from-green-600 hover:to-green-700 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">📊</div>
                      <div className="text-sm font-medium">Ver Progreso</div>
                    </Link>
                    <Link
                      href="/dashboard/gamification"
                      className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">🎮</div>
                      <div className="text-sm font-medium">Logros</div>
                    </Link>
                    <Link
                      href="/dashboard/communications"
                      className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-center hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                    >
                      <div className="text-2xl mb-2">💬</div>
                      <div className="text-sm font-medium">Mensajes</div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {student.subjects.map((subject) => (
                  <div key={subject.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{subject.icon}</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-500">{subject.teacher}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{subject.grade}</div>
                        <div className="text-sm text-gray-500">Calificación</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progreso</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${subject.progress}%`,
                            backgroundColor: subject.color
                          }}
                        ></div>
                      </div>
                    </div>

                    {subject.nextExam && (
                      <div className="text-sm text-gray-600">
                        📅 Próximo examen: {new Date(subject.nextExam).toLocaleDateString('es-ES')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {student.subjects.flatMap(subject => 
                  subject.assignments.map(assignment => ({
                    ...assignment,
                    subjectName: subject.name,
                    subjectColor: subject.color
                  }))
                ).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: assignment.subjectColor }}
                        ></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                          <p className="text-sm text-gray-500">{assignment.subjectName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                          {getStatusText(assignment.status)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(assignment.dueDate).toLocaleDateString('es-ES')}
                        </span>
                        {assignment.grade && (
                          <span className="text-sm font-medium text-gray-900">
                            {assignment.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className={`border-2 rounded-lg p-6 transition-all duration-200 ${
                      achievement.unlocked 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm font-medium text-purple-600">
                            {achievement.points} puntos
                          </span>
                          {achievement.unlocked && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Desbloqueado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
