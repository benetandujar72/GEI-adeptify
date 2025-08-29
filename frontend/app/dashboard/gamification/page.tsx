'use client';

import React from 'react';
import Link from 'next/link';

export default function GamificationPage() {
  const mockAchievements = [
    { id: 1, name: 'Primer Paso', description: 'Completaste tu primera tarea', icon: '🎯', unlocked: true, points: 50 },
    { id: 2, name: 'Estudiante Dedicado', description: '7 días consecutivos de estudio', icon: '🔥', unlocked: true, points: 100 },
    { id: 3, name: 'Matemático', description: 'Completaste 10 ejercicios de matemáticas', icon: '📐', unlocked: false, points: 200 },
    { id: 4, name: 'Lector Avanzado', description: 'Leíste 5 libros completos', icon: '📚', unlocked: false, points: 300 },
  ];

  const mockStats = {
    totalPoints: 1250,
    level: 8,
    achievementsUnlocked: 12,
    totalAchievements: 25,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                ← Volver al Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gamificación</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">{mockStats.totalPoints}</div>
            <div className="text-sm text-gray-600">Puntos Totales</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">Nivel {mockStats.level}</div>
            <div className="text-sm text-gray-600">Nivel Actual</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-green-600">{mockStats.achievementsUnlocked}</div>
            <div className="text-sm text-gray-600">Logros Desbloqueados</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600">{mockStats.totalAchievements}</div>
            <div className="text-sm text-gray-600">Logros Totales</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso al siguiente nivel</span>
            <span className="text-sm text-gray-500">1250 / 1500 puntos</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: '83%' }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Te faltan 250 puntos para alcanzar el nivel 9</p>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Logros Disponibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockAchievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                  achievement.unlocked 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${
                      achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <div className="flex justify-between items-center mt-2">
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
        </div>

        {/* Daily Challenges */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Desafíos Diarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-medium text-blue-900 mb-2">Estudiar 30 minutos</h3>
              <p className="text-sm text-blue-700 mb-3">Completa una sesión de estudio</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Completar (+25 pts)
              </button>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-medium text-green-900 mb-2">Resolver 5 ejercicios</h3>
              <p className="text-sm text-green-700 mb-3">Practica con ejercicios</p>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Completar (+50 pts)
              </button>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="font-medium text-purple-900 mb-2">Leer un capítulo</h3>
              <p className="text-sm text-purple-700 mb-3">Lee material de estudio</p>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                Completar (+30 pts)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
