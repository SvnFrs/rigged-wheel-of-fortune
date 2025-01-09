import CircularWheel from '../components/CircularWheel';
import React from 'react';
import './page.css'
export default function Home() {
  return (
    <main className="min-h-screen bg-purple-900">
      <h1 className="text-3xl font-bold text-center mb-8">Fcoder hên xui</h1>
      <CircularWheel />
    </main>
  );
}