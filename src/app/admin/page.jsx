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
// import de composant 
import QuestionEditor from "../question-editor/page"
import useDebugConsoleLog from "@/hooks/use-debug-console"

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
    const[isNewQuestion,setIsNewQuestion]=useState(false)
    const[newQuestion,setNewQuestion]=useState([])
    const[question,setQuestion]=useState("")
    const [reponse,setReponse]=useState("")
    function HandleSubmitTask(){

    }


    function handleOpenFormTask(){
      setIsNewQuestion(true)
      console.log(newQuestion)
    }

    function cancelTask(){
      setIsNewQuestion(false)
    }

    async function postQuestionnaire(){
      
    }

    useDebugConsoleLog(isNewQuestion,"isNewQuestion")
  return (
    

        <main className="flex-1 p-4 flex  gap-4">
          <button onClick={()=>setIsOpen(!isOpen)}> Creer un questionnaire</button>

          <PageMiddle>
                {isOpen?(
                    <>
                        <QuestionEditor
                          isNewQuestion={isNewQuestion}
                          HandleOpenFormTask={handleOpenFormTask}
                          setQuestion={setQuestion}
                          setReponse={setReponse}
                          HandleSubmitTask={HandleSubmitTask}
                          question={question}
                          reponse={reponse}
                          cancel={cancelTask}
                        />
                        
                    </>
                        
                    ):(
                        <h1>La page est fermé</h1>
                    )
                }
          </PageMiddle>
            
        </main>

  )
}
