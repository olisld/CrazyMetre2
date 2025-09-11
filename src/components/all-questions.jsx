'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AllReponses } from "./all-reponses"

export function AllQuestions({ idQuestionnaire }) {
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState("")

  const apiBase = `http://127.0.0.1:8000/api/${idQuestionnaire}/questions`

  // Charger les questions
  useEffect(() => {
    if (!idQuestionnaire) return

    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(apiBase)
        if (!res.ok) throw new Error("Erreur serveur")
        const data = await res.json()
        setQuestions(data)
      } catch (err) {
        console.error("Erreur fetch questions:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [idQuestionnaire, apiBase])

  // Activer le mode édition
  const startEdit = (question) => {
    setEditingId(question.id)
    setEditValue(question.title)
  }

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingId(null)
    setEditValue("")
  }

  // Sauvegarder les modifications
  const saveEdit = async (idQuestion) => {
    if (!editValue.trim()) return

    try {
      console.log(`Modification question ${idQuestion}:`, { title: editValue.trim() })
      
      const res = await fetch(`${apiBase}/${idQuestion}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editValue.trim() }),
      })
      
      console.log("Réponse serveur:", res.status, res.statusText)
      
      if (!res.ok) {
        const errorText = await res.text()
        console.error("Erreur serveur:", errorText)
        throw new Error(`Erreur ${res.status}: ${errorText}`)
      }
      
      const data = await res.json()
      console.log("Données reçues:", data)
      
      setQuestions((prev) =>
        prev.map((q) => (q.id === data.id ? data : q))
      )
      cancelEdit()
    } catch (err) {
      console.error("Erreur édition :", err)
      alert(`Erreur lors de la modification: ${err.message}`)
    }
  }

  // Supprimer une question
  const handleDelete = async (idQuestion) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return

    try {
      const res = await fetch(`${apiBase}/${idQuestion}`, { method: "DELETE" })
      
      if (!res.ok) throw new Error("Erreur lors de la suppression")
      
      setQuestions((prev) => prev.filter((q) => q.id !== idQuestion))
    } catch (err) {
      console.error("Erreur suppression :", err)
    }
  }

  if (isLoading) {
    return <div className="p-4">Chargement...</div>
  }

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold">Questions du questionnaire</h3>
      
      {questions.length === 0 ? (
        <p className="text-gray-500">Aucune question pour ce questionnaire.</p>
      ) : (
        <div className="space-y-3">
          {questions.map((question) => (
            <div key={question.id}>
                <div
                className="p-4 border border-gray-200 rounded-lg flex items-center justify-between gap-4"
                >
                <div className="flex-1 flex items-center gap-2">
                    <Input
                    type="text"
                    value={editingId === question.id ? editValue : question.title}
                    onChange={(e) => {
                        if (editingId === question.id) {
                        setEditValue(e.target.value)
                        } else {
                        // Activer le mode édition automatiquement quand on clique dans l'input
                        startEdit(question)
                        setEditValue(e.target.value)
                        }
                    }}
                    onFocus={() => {
                        if (editingId !== question.id) {
                        startEdit(question)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(question.id)
                        if (e.key === "Escape") cancelEdit()
                    }}
                    className="flex-1"
                    placeholder="Titre de la question"
                    />
                    
                    {editingId === question.id && (
                    <div className="flex gap-2">
                        <Button 
                        size="sm" 
                        onClick={() => saveEdit(question.id)}
                        disabled={!editValue.trim()}
                        >
                        Sauver
                        </Button>
                        <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={cancelEdit}
                        >
                        Annuler
                        </Button>
                    </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(question.id)}
                    >
                    Supprimer
                    </Button>
                </div>
                </div>
                <AllReponses questionId={question.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}