'use client';

import React from 'react';
import Link from 'next/link';

export default function ProgressPage() {
  const mockProgress = [
    { subject: 'Matemáticas', grade: 85, progress: 75 },
    { subject: 'Ciencias', grade: 92, progress: 80 },
    { subject: 'Historia', grade: 78, progress: 65 },
    { subject: 'Literatura', grade: 88, progress: 90 },
  ];

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
              <h1 className="text-2xl font-bold text-gray-900">Progreso Académico</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Cards */}
          <div className="space-y-6">
            {mockProgress.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.subject}</h3>
                  <span className="text-2xl font-bold text-green-600">{item.grade}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Progreso: {item.progress}%</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resumen General</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">85.8%</div>
                  <div className="text-sm text-gray-600">Promedio General</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Materias Activas</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Próximas Evaluaciones</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Matemáticas - Examen Final</span>
                  <span className="text-sm font-medium text-red-600">En 3 días</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ciencias - Proyecto</span>
                  <span className="text-sm font-medium text-yellow-600">En 1 semana</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
