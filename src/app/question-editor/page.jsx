import{
    ModelPages,
    LiTache,
    DivListeDisplayColumn,
    Button,
    PrimaryButton,
    FormNewTask,
    Input,
    DivAlignSpaceAround,
    ModelButton,
    ErrorMessage
}from "@/style/styles"


export default function QuestionEditor({
    isNewQuestion,
    HandleOpenFormTask,
    setQuestion,
    setReponse,
    HandleSubmitTask,
    question,
    reponse,
    cancel


}){
return(
    <>
            <ModelPages>
                <form action="" method="POST" onSubmit={handleCreateQuestionnaire}>
                    <input type="text" placeholder="titre"/>
                    <input type="Submit"/>
                </form>
                <h1 style={{textAlign:"center"}}>Nouveau Modèle</h1>

                {/* <ul style={{padding: "0", listStyle:"none"}}>
                    {newQuestion.map((tache,index)=>{
                        // if (isEditing && indexEditing === index) return null;
                        return(
                            <LiTache key={index}>
                                <DivListeDisplayColumn>
                                    <div>{tache.content}</div>
                                    <div style={{color:"#666", fontSize:"14px"}}>{tache.equipement}</div>
                                </DivListeDisplayColumn>
                                <DivListeDisplayColumn>
                                    <Button $danger onClick={()=>DeleteTask(index)}>Supprimer</Button>
                                    <Button onClick={()=>UpdateTask(index)}>Modifier</Button>
                                </DivListeDisplayColumn>
                            </LiTache>
                        )
                    })}  
                </ul> */}

{/* Bouton Pour ajouter une tâche */}
                
                    <PrimaryButton onClick={HandleOpenFormTask}>
                         Nouvelle Question
                    </PrimaryButton>
            
{/* Formulaire de création de Tache afficher lors du clique sur le bouton "Nouvelle Tache" ou lors de la modification d'une tâche avec le bouton modifier */}
                {isNewQuestion && (
                    <>
                        <FormNewTask onSubmit={HandleSubmitTask}>
                            <Input 
                                type="text" 
                                placeholder="Contenu de la tâche" 
                                value={question}
                                onChange={(e)=>setQuestion(e.target.value)}
                            />
                            <Input 
                                type="text"
                                placeholder="Équipement de la tâche" 
                                value={reponse}
                                onChange={(e)=>setReponse(e.target.value)}
                            />
                            <Button type="submit">Creer la question</Button>
                            <Button $cancel onClick={cancel}>Annuler</Button>
                            {/* {!isEditing && (
                                <Button  type="button" onClick={CancelTask}>Annuler</Button>
                            )} */}
                        </FormNewTask>
                    </>
                )}
            </ModelPages>
            {/* <DivAlignSpaceAround>
                <ModelButton type="Button" onClick={HandleSaveModel}>Enregistrer le modèle</ModelButton>
                <ModelButton  $cancel type="Button" onClick={CancelModel}>Annuler</ModelButton>
            </DivAlignSpaceAround>     */}

        
        </>
)
}