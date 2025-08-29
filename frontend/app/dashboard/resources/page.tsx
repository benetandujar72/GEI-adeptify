'use client';

import React from 'react';
import Link from 'next/link';

export default function ResourcesPage() {
  const mockResources = [
    { id: 1, name: 'Guía de Matemáticas', type: 'PDF', subject: 'Matemáticas', size: '2.5 MB' },
    { id: 2, name: 'Videos de Ciencias', type: 'Video', subject: 'Ciencias', size: '15 MB' },
    { id: 3, name: 'Ejercicios de Historia', type: 'Documento', subject: 'Historia', size: '1.2 MB' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                ← Volver al Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Recursos</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-900">Materiales Disponibles</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockResources.map((resource) => (
              <div key={resource.id} className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">{resource.name}</h3>
                    <p className="text-sm text-gray-600">{resource.subject} • {resource.type}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{resource.size}</span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                      Descargar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
