'use client'

import { useState, useEffect } from "react"
import styled from "styled-components"
import { Button } from "@/components/ui/button"

const ReponsesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const ReponseItem = styled.div`
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
`

const ReponseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

export function AllReponses({ questionId }) {
  const [reponses, setReponses] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const apiBase = `http://127.0.0.1:8000/api/questions/${questionId}/reponses`

  useEffect(() => {
    if (!questionId) return

    const fetchReponses = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(apiBase)
        if (!res.ok) throw new Error("Erreur serveur")
        const data = await res.json()
        setReponses(data)
      } catch (err) {
        console.error("Erreur fetch réponses:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReponses()
  }, [questionId])

  return (
    <ReponsesContainer>
      <h3 className="text-lg font-semibold">Réponses</h3>
      {isLoading ? (
        <p>Chargement...</p>
      ) : reponses.length === 0 ? (
        <p>Aucune réponse pour cette question.</p>
      ) : (
        reponses.map((r) => (
          <ReponseItem key={r.id}>
            <ReponseContent>
              <span className="font-medium">{r.label}</span>
              {r.url_image && (
                <img
                  src={r.url_image}
                  alt={r.label}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <small className="text-gray-500">Valeur : {r.valeur}</small>
            </ReponseContent>

            <ButtonsWrapper>
              <Button variant="outline" size="sm">Modifier</Button>
              <Button variant="destructive" size="sm">Supprimer</Button>
            </ButtonsWrapper>
          </ReponseItem>
        ))
      )}
    </ReponsesContainer>
  )
}
