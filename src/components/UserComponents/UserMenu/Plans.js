import { useParams } from "react-router-dom";



const Plans = () => {

const {machine} = useParams();

  return (
  <div>
    <h2>Witaj w panelu użytkownika Maszyny: {machine}</h2>
    <p>Wybierz plany sekcję z menu powyżej.</p>
  </div>
  )
};

export default Plans;