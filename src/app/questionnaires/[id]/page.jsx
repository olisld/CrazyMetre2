'use client'
import { use, useEffect, useState } from "react"

export default function QuestionnairePage({ params }) {
  const { id } = use(params)

  const [data, setData] = useState(null)
  const [dataQuestion, setDataQuestion] = useState([])
  const [reponses, setReponses] = useState({})
  const [checked, setChecked] = useState([])
  const [result, setResult] = useState("")
  const [openResult, setOpenResult] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/questionnaires/${id}`)
        const result = await response.json()

        const responseQuestion = await fetch(`http://127.0.0.1:8000/api/${id}/questions`)
        const resultQuestion = await responseQuestion.json()

        setData(result)
        setDataQuestion(resultQuestion)

        resultQuestion.forEach(async (q) => {
          const res = await fetch(`http://127.0.0.1:8000/api/questions/${q.id}/reponses`)
          const resData = await res.json()
          setReponses((prev) => ({ ...prev, [q.id]: resData }))
        })
      } catch (err) {
        console.error("Erreur de fetch :", err)
      }
    }
    fetchData()
  }, [id])

  function handleSelectedAnswer(idQuestion, valeurReponse) {
    setChecked((prev) => ({
      ...prev,
      [idQuestion]: valeurReponse
    }))
  }

  function HandleResults() {
    let valeurs = 0
    for (const key in checked) {
      valeurs += checked[key]
    }
    const ratio = calculMaxRep()
    const results = `Score : ${valeurs} / ${ratio}`
    setOpenResult(true)
    setResult(results)
  }

  function calculMaxRep() {
    let totalMax = 0
    for (const key in reponses) {
      const maxQuestion = Math.max(...reponses[key].map((r) => r.valeur))
      totalMax += maxQuestion
    }
    return totalMax
  }

  function closeResults(){
    setOpenResult(false)
    setChecked([])
  }

  if (!data) return <p className="text-center mt-10 text-gray-500">Chargement...</p>

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {openResult ? (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center animate-fade-in">
            <h1 className="text-3xl font-bold text-green-600 mb-6">Résultat</h1>
            <p className="text-xl font-medium mb-6">{result}</p>
            <button
              onClick={closeResults}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
            >
              Rejouer le questionnaire
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
              {data.title}
            </h1>

            {dataQuestion.map((question) => (
              <div
                key={question.id}
                className="mb-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  {question.title}
                </h2>

                <ul className="space-y-3">
                  {reponses[question.id] ? (
                    reponses[question.id].map((rep) => (
                      <li
                        key={rep.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="radio"
                          id={rep.id}
                          value={rep.id}
                          name={`question${question.id}`}
                          onChange={() =>
                            handleSelectedAnswer(question.id, rep.valeur)
                          }
                          className="h-4 w-4 text-blue-600 cursor-pointer"
                        />
                        <label
                          htmlFor={rep.id}
                          className="cursor-pointer text-gray-700"
                        >
                          {rep.label}
                        </label>
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      Chargement des réponses...
                    </p>
                  )}
                </ul>
              </div>
            ))}

            {Object.keys(checked).length === dataQuestion.length && (
              <div className="text-center">
                <button
                  onClick={() => HandleResults()}
                  className="mt-6 px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow hover:bg-green-700 transition"
                >
                  Afficher le résultat
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
