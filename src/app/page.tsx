"use client"

import { Suspense } from "react"
import Navbar from "@/components/dashboard/navbar"
import TravelStoriesOverview from "@/components/dashboard/travel-stories-overview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-auto p-6 bg-gray-50">
            <Suspense
              fallback={
                <div className="max-w-7xl mx-auto animate-fade-in">
                  <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-4 w-96 bg-gray-200 rounded animate-pulse mb-8"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={`skeleton-stat-${i}`}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                      >
                        <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <TravelStoriesOverview />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
