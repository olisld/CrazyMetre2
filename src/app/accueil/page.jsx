'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import styled from "styled-components"
import { useEffect, useState } from "react"
import Link from "next/link"


const GapDiv=styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;

`
export default function Accueil(){
    const[isLoading,setIsLoading]=useState(false)
    const[data,setData]=useState([])

    async function fetchData(url){
        try{
            setIsLoading(true)
            const response= await fetch(`${url}`)
            const data= await response.json()
            setData(data)
            response.json
        }
        catch{

        }
        finally{
            setIsLoading(false)
            console.log(data)
        }
        return data
    }

    useEffect(()=>{
        fetchData("http://127.0.0.1:8000/api/questionnaires")
    },[])
    function HandleOpenQuestionnaire(){

    }
    
    return(
        <>
           <main className="min-h-screen bg-gray-50 py-12 px-6">
            {/* Header */}
            <header className="flex items-center justify-between max-w-6xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-gray-800">
                Liste des questionnaires
                </h1>
                <Link
                href="/admin"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                Page Admin
                </Link>
            </header>

            {/* Loader */}
            {isLoading ? (
                <p className="text-center text-gray-500">Chargement...</p>
            ) : (
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {data.map((item, index) => (
                    <Card
                    key={index}
                    className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
                    >
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                        {item.title}
                        </CardTitle>
                        
                        
                    </CardHeader>
                    <CardContent className="text-center">
                        <Link
                        className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all"
                        href={`/questionnaires/${item.id}`}
                        >
                        Jouer
                        </Link>
                    </CardContent>
                    </Card>
                ))}
                </section>
            )}
            </main>
        </>
        
    )
}