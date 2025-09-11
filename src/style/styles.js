import styled ,{keyframes}from "styled-components"

// Animation
export const ZoomIn = keyframes`
    from {
        opacity: 0.5;
        transform: scale(0.95);
    } to {
        opacity: 1;
        transform: scale(1);
    }
`;

// Fond général
export const PagesStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height:100vh;
  height: auto;
  background: #f4f6f9; 
  padding: 20px;
  font-family: Arial, sans-serif;
`;

// Titre
export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
export const Titre = styled.h1`
  color: #333;
`;

// Page modèle
export const ModelPages = styled.div`
  background: #fff;
  margin: 20px auto;
  padding: 30px;
  width: 80%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  animation: ${ZoomIn} 0.5s ease-out;
`;

// Liste des tâches
export const LiTache = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  background: #fafafa;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

// Conteneur colonne pour organiser contenu et boutons
export const DivListeDisplayColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Boutons
export const Button = styled.button`
  background: ${props => props.$danger ? "#e74c3c" : props.$cancel ? "#95a5a6" : "#3498db"};
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 5px;
  transition: 0.3s;

  &:hover {
    background: ${props => props.$danger ? "#c0392b" :props.$cancel ? "#7f8c8d" :"#2980b9"};
  }
`;

export const PrimaryButton = styled(Button)`
  margin: 20px auto;
  display: block;
`;
 export const ModelButton = styled(Button)`
    width: 20%;
 `
 export const DivAlignSpaceAround = styled.div`
    display:flex;
    justify-content:space-Around;
 `
// Inputs
export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  transition: 0.2s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 4px rgba(52,152,219,0.5);
  }
`;

// Formulaire
export const FormNewTask = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
`;

// Conteneur bouton nouveau modèle
export const DivNouveauModel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 20px;
`;

// Affichage des différents model

// Carte qui contient un modèle existant
export const DispositionCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  gap: 20px;
  margin: 20px 0;
`;
export const ModelCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 20px;
  margin: 20px auto;
  width: 70%;
  max-width: 700px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

// Header de la carte (titre + date alignés)
export const ModelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

// Titre du modèle
export const ModelTitle = styled.h2`
  margin: 0;
  color: #2c3e50;
`;

// Date du modèle
export const ModelDate = styled.span`
  color: #7f8c8d;
  font-size: 14px;
`;

// Liste des tâches dans un modèle existant
export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 15px 0;
`;

// Élément tâche affiché dans un modèle existant
export const TaskItem = styled.li`
  background: #f9f9f9;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

// Zone boutons Modifier/Supprimer sous chaque modèle
export const ModelActions = styled.div`
  display: flex;
  justify-content:space-between;
  gap: 10px;
`;
export const ModelActionsMiddle=styled.div`
  display: flex;
  justify-content:center;
`
export const ErrorMessage =styled.div`
  text-align:center;
  width:100%;
  color:red;
`
// Style pour la page de lancement de Ronde

export const ModelColumn= styled.div`
  display:flex;
  flex-direction:column;
  gap:20px;
  width:100%;
`
export const AlignMiddle=styled.div`
  display:flex;
  justify-content:center;
  align-item:center;

`