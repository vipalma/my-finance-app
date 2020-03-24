import React from 'react'
import useGlobal from "../../store";
import { Card  } from 'semantic-ui-react'
import {convertToMoney, setColor, setIcon} from '../../helpers/general';
import {setText} from '../../i18n/utils'



const CardAnalise = () => {

  const [globalState] = useGlobal();

  const { prediction, selectedDate, intl } = globalState;

  const getText = (id) => {
   return  setText(intl, id);
  }

  const genCard = () => {
    
     
    const filtered = prediction.filter( item => item.date === selectedDate );
    
    return filtered.map( (item) => {
      
      return Object.keys(item).map((key, index) => {
            return (key !== 'date') ?
              (
                <Card color={setColor(item[key])} key={index}>
                <Card.Content header={<h3 className='black'>{getText(key)}</h3>} />
                <Card.Content >
                  <i className={setIcon(item[key])}></i>
                  <span className='f4'>{convertToMoney(item[key])}</span>
                </Card.Content>
              </Card> ) : '';

        });

    })
    
    
  };

return ( <>
            {genCard()}
        </> )

}

export default CardAnalise