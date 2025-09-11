'use client'

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "@/components/ui/button"
import Link from "next/link"  
import { AllQuestions } from "@/components/all-questions"

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 32px;
  background-color: #1f2937; /* gris foncé */
  color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`

const HeaderButtons = styled.div`
  display: flex;
  gap: 12px;
`

const PageMiddle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 16px;
  padding: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  max-width: 600px;
  align-items: center;
  justify-content: center;
`

const QuestionnaireList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 16px;
`

const QuestionnaireButton = styled(Button)`
  background-color: white;
  color: #1f2937;
  &:hover {
    background-color: #1f2937;
    color: white;
  }
`

export default function Admin() {
  const [isOpen, setIsOpen] = useState(false)
  const [questionnaireName, setQuestionnaireName] = useState("")
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null)
  const [questionnaires, setQuestionnaires] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const apiBase = "http://127.0.0.1:8000/api/questionnaires"

  // --- GET all questionnaires ---
  useEffect(() => {
    const getAllQuestionnaires = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(apiBase)
        const data = await res.json()
        setQuestionnaires(data)
      } catch (err) {
        console.error("Erreur fetch:", err)
      } finally {
        setIsLoading(false)
      }
    }
    getAllQuestionnaires()
  }, [])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!questionnaireName.trim()) return

    try {
      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: questionnaireName }),
      })
      const data = await res.json()
      setQuestionnaires(prev => [...prev, data])
      setQuestionnaireName("")
      setSelectedQuestionnaire(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleEdit = async () => {
    if (!selectedQuestionnaire) return
    try {
      const res = await fetch(`${apiBase}/${selectedQuestionnaire.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: questionnaireName }),
      })
      const data = await res.json()
      setQuestionnaires(prev => prev.map(q => q.id === data.id ? data : q))
      setSelectedQuestionnaire(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!selectedQuestionnaire) return
    try {
      await fetch(`${apiBase}/${selectedQuestionnaire.id}`, { method: "DELETE" })
      setQuestionnaires(prev => prev.filter(q => q.id !== selectedQuestionnaire.id))
      setQuestionnaireName("")
      setSelectedQuestionnaire(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleSelectQuestionnaire = (q) => {
    setSelectedQuestionnaire(q)
    setQuestionnaireName(q.title)
    setIsOpen(true)
  }

  

  return (
    <PageContainer>
      {/* HEADER */}
      <Header>
        <HeaderTitle>Admin Panel</HeaderTitle>
        <HeaderButtons>
          {/* LISTE DES QUESTIONNAIRES */}
          <QuestionnaireList>
            {isLoading ? "Chargement..." : questionnaires.map(q => (
              <QuestionnaireButton key={q.id} onClick={() => handleSelectQuestionnaire(q)}>
                {q.title}
              </QuestionnaireButton>
            ))}
          </QuestionnaireList>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Fermer le formulaire" : "Créer un questionnaire"}
          </Button>
          <Link href="/"><Button>Retour</Button></Link>
        </HeaderButtons>
      </Header>

      {/* FORMULAIRE */}
      {isOpen && (
        <PageMiddle>
          <Form onSubmit={selectedQuestionnaire ? handleEdit : handleCreate}>
            <input
              type="text"
              placeholder="Nom du questionnaire"
              value={questionnaireName}
              onChange={(e) => setQuestionnaireName(e.target.value)}
            />
            <Button type="submit">{selectedQuestionnaire ? "Éditer" : "Créer"}</Button>
            {selectedQuestionnaire && <Button variant="destructive" onClick={handleDelete}>Supprimer</Button>}
          </Form>

          {/* QUESTIONS */}
          {selectedQuestionnaire && <AllQuestions idQuestionnaire={selectedQuestionnaire.id} />}
        </PageMiddle>
      )}
    </PageContainer>
  )
}
