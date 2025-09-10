'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import Link from "next/link"
import styled from "styled-components"
const PageMiddle=styled.div`
    display:flex
    flex-direction:column;
    align-items:center
    justify-content:center;
    width:100%;
`

export default function Admin() {
    // gestion de l'ouverture des sections
    const[isOpen,setIsOpen]=useState(false)
    const[isNewTache,setIsNewTache]=useState(false)

  return (
    <SidebarProvider>
      <div className="flex">
        <Sidebar>
          <SidebarHeader />
          <SidebarContent>
            <SidebarGroup>
              <p>Dashboard</p>
            </SidebarGroup>
            <SidebarGroup> 
              <button onClick={() => setIsOpen(!isOpen)}>Creer des questionnaires</button>
            </SidebarGroup>
            <SidebarGroup>
                <Link href="/accueil">Retour a la page d'accueil</Link>
            </SidebarGroup>

          </SidebarContent>
          <SidebarFooter />
        </Sidebar>

        <main className="flex-1 p-4 flex  gap-4">
          <SidebarTrigger /> {/* ✅ bouton pour ouvrir/fermer */}
          <PageMiddle>
                {isOpen?(
                    <>
                        <h1>La page est ouverte</h1>
                        
                    </>
                        
                    ):(
                        <h1>La page est fermé</h1>
                    )
                }
          </PageMiddle>
            
        </main>
      </div>
      
      
    </SidebarProvider>

  )
}
