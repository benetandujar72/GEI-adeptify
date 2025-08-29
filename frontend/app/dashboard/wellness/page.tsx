'use client';

import React from 'react';
import Link from 'next/link';

export default function WellnessPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
                ← Volver al Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Salud y Bienestar</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Estado de Ánimo</h2>
            <div className="text-center">
              <div className="text-4xl mb-2">😊</div>
              <p className="text-gray-600">Buen estado de ánimo</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Nivel de Estrés</h2>
            <div className="text-center">
              <div className="text-4xl mb-2">😌</div>
              <p className="text-gray-600">Bajo nivel de estrés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
