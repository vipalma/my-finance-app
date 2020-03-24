import React from 'react'
import useGlobal from "../../store";
import { Button  } from 'semantic-ui-react'
import {setText} from '../../i18n/utils'



const Fechamento = () => {

  const [globalState, globalActions] = useGlobal();

  const { fechamentos, selectedDate, intl } = globalState;
  const { save } = globalActions.actFechamentos;
  

  const getText = (id) => {
   return  setText(intl, id);
  }

const disableButton = () => ( fechamentos.some(item => item.date === selectedDate)) ?  true :  false;

return ( <div className="pr3">
            <Button disabled={disableButton()} fluid positive onClick={save} >Fechar Mês</Button>
         </div> )

}

export default Fechamento