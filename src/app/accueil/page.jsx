"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useEffect, useState } from "react"
import Link from "next/link"
export default function Accueil() {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  async function fetchData(url) {
    try {
      setIsLoading(true)
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Erreur lors du chargement :", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData("http://127.0.0.1:8000/api/questionnaires")
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center sm:text-left">
          CRAZY METRE
        </h1>
        <img src="/crazymetre.png" alt="CrazyMetre"  className="w-36 h-36 object-contain"/>
        <Link
          href="/admin"
          className="mt-4 sm:mt-0 inline-block rounded-lg border border-blue-600 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          Page Admin
        </Link>
      </header>

      {/* Loader */}
      {isLoading ? (
        <p className="text-center text-lg text-gray-500 animate-pulse">Chargement...</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {data.map((item, index) => (
            <Card
              key={index}
              className="relative w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center py-6">
                <Link
                  href={`/questionnaires/${item.id}`}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                >
                  🚀 Jouer
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  )
}
