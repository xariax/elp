import { useParams } from "react-router-dom";
import BarPo from "../components/UserComponents/BarPO"; // popraw ścieżkę jeśli plik jest gdzie indziej
import styled from "styled-components";
import Button from '@mui/material/Button';
import { useAuth } from "../context/AuthContext";





const Box = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
width:100%;
height:100%;
`
const Menu = styled.div`
display:flex;
gap:10px;
margin-top:20px;
`
const PackiotInfo = styled.div`
display:flex;
flex-direction:row;
align-items: center;
justify-content:space-between;
width:100%;
`
const machinesData = {
  psg1: { orders: [100000], done: [12000], waste: [2000] },
  psg2: { orders: [50000], done: [30000], waste: [500] },
  psg3: { orders: [70000], done: [50000], waste: [700] }
};

const UserMachineHome = () => {
  const {user} = useAuth();
  const { machine } = useParams();
  const machineName = localStorage.getItem('selectedMachine');
  const data = machinesData[machine?.toLowerCase()] || { orders: [0], done: [0], waste: [0] };

  return (
 <Box>
      <Menu>
        <Button variant="outlined">Proukcja: {machineName}</Button>
        <Button variant="outlined">Wydarzenia</Button>
      </Menu>

      <PackiotInfo>
    <div><h1>Packiot: 52988</h1>
      <p>Operator: {user?.name}</p>
    </div>
    <div><h1>Klient: PAEDI</h1>
     <p>Zp: ZP/10/05/2025/WDT</p> 
     </div>
      </PackiotInfo>
  
     <BarPo data={data}/>

      {/* ... zawartość ... */}
      </Box>
  );
};

export default UserMachineHome;
