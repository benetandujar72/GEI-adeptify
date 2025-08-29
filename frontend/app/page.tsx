'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evitar hidratación incorrecta
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando...</div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ¡Bienvenido a GEI Adeptify!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Plataforma educativa con IA - Hola, {user.name}
            </p>
            <div className="space-x-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Ir al Dashboard
              </Link>
              <Link
                href="/dashboard/ai"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Asistente IA
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            GEI Adeptify
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Plataforma educativa con IA
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Registrarse
            </Link>
          </div>
          
          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Asistente IA</h3>
              <p className="text-gray-600">Obtén ayuda personalizada con inteligencia artificial</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Progreso Académico</h3>
              <p className="text-gray-600">Monitorea tu progreso y calificaciones</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎮</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gamificación</h3>
              <p className="text-gray-600">Gana puntos y logros mientras aprendes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
