import styled from "styled-components";
import Button from '@mui/material/Button';
import BarPo from "./BarPO";
import { useAuth } from "../../context/AuthContext";




const machine = localStorage.getItem('selectedMachine');
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

const PSG1 = () => {

const {user} = useAuth();

  return (
    <Box>
      <Menu>
        <Button variant="outlined">Proukcja: {machine}</Button>
        <Button variant="outlined">Wydarzenia</Button>
        <Button variant="outlined">Zmień ZP</Button>
      </Menu>

      <PackiotInfo>
    <div><h1>Packiot: 52988</h1>
      <p>Operator: {user?.name}</p>
    </div>
    <div><h1>Klient: PAEDI</h1>
     <p>Zp: ZP/10/05/2025/WDT</p> 
     </div>
      </PackiotInfo>
  
     <BarPo />

      {/* ... zawartość ... */}
      </Box>
  );
};

export default PSG1;
