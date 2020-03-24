import React from "react";
import Movimentos from '../components/Movimentos'
import ModalMoviments from '../components/extrato/ModalMoviment'

const Extrato = () => {
  return (  
      <div>
          <Movimentos></Movimentos>
          <ModalMoviments></ModalMoviments>

      </div>
  );
};

export default Extrato;