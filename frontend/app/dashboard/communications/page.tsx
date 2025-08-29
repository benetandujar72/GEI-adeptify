'use client';

import React from 'react';
import Link from 'next/link';

export default function CommunicationsPage() {
  const mockMessages = [
    { id: 1, from: 'Prof. García', subject: 'Recordatorio: Examen de Matemáticas', date: 'Hoy', unread: true },
    { id: 2, from: 'Sistema', subject: 'Nuevo logro desbloqueado', date: 'Ayer', unread: false },
    { id: 3, from: 'Prof. López', subject: 'Tarea de Ciencias entregada', date: '2 días', unread: false },
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
              <h1 className="text-2xl font-bold text-gray-900">Comunicaciones</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium text-gray-900">Mensajes</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockMessages.map((message) => (
              <div key={message.id} className={`p-6 ${message.unread ? 'bg-blue-50' : ''}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-gray-900">{message.from}</span>
                      {message.unread && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{message.subject}</p>
                  </div>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
