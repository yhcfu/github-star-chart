import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export function HeroSection({ children }: PropsWithChildren) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-purple-700
        to-indigo-600 px-4 py-32 text-center md:px-6"
    >
      <div className="bg-grid-white/[0.05] absolute inset-0 bg-[size:60px_60px]" />
      <div className="prose prose-invert relative z-10 mx-auto max-w-5xl">
        <h1
          className="animate-fade-down animate-once animate-duration-1000
            animate-delay-300 animate-ease-in-out mb-6 text-4xl font-extrabold
            leading-tight text-white md:text-6xl"
        >
          リポジトリの成長率を可視化
        </h1>
        <p
          className="animate-fade-up animate-once animate-duration-1000
            animate-delay-500 animate-ease-in-out mx-auto mb-12 max-w-2xl
            text-lg text-purple-100 md:text-xl"
        >
          任意のGitHubリポジトリのスター履歴を追跡・分析し、プロジェクトの成長を把握
        </p>
        <div
          className="animate-fade-in animate-once animate-duration-1000
            animate-delay-700 animate-ease-in-out mx-auto mb-12 h-32 w-64"
        >
          <svg className="h-full w-full" viewBox="0 0 100 50">
            <title>Growth Chart</title>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#A5B4FC" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polyline
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,50 20,30 40,40 60,20 80,35 100,15"
              className="animate-draw-line"
              filter="url(#glow)"
            />
          </svg>
        </div>
        <div
          className="animate-fade-up animate-once animate-duration-700
            animate-delay-500"
        >
          {children}
        </div>
      </div>
    </section>
  );
}
