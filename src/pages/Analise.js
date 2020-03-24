import React from "react";
import AnaliseProjReal from "../components/analise/index";
import CardAnalise from "../components/analise/CardAnalise";
import Fechamento from "../components/analise/Fechamento";

const Analise = () => {
  return (  
      <div className='flex'>
        <div className='w-20 pl3'>
            <Fechamento />
            <CardAnalise />
        </div>

        <div className="w-80 ml3">
          <AnaliseProjReal />      
        </div>
      </div>
      
  );
};

export default Analise;
