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

import { useEffect, useState } from "react"
import Link from "next/link"

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
    
    return(
        <>
            <Link href="/admin" ><h1>Page admin</h1></Link>
            {
                isLoading?(
                    <h1>chargement...</h1>
                ):(<>
                    { data.map((item,index)=>{
                            return(
                            <Card bgColor="bg-white" key={index}>
                                <CardHeader>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardDescription>Card Description</CardDescription>
                                    <CardAction>Card Action</CardAction>
                                </CardHeader>
                                <CardContent>
                                    <p>Card Content</p>
                                </CardContent>
                                <CardFooter>
                                    <p>Card Footer</p>
                                </CardFooter>
                            </Card>
                            )
                            
                            
                            })}
                            {/* <Link href="/admin">Page Admin</Link> */}
                    </>
                    
                )

            }
            
        </>
        
    )
}