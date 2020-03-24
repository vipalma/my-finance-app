import React from 'react'
import useGlobal from "../../store/index.js";
import {convertToNumber, setIcon, setColor} from '../../helpers/general'
import './resume.css';
import { setText } from "../../i18n/utils";



const Resume = () => { 
    const [globalState] = useGlobal();

    const { saldoTotal, intl } = globalState;

    const getText = (id) => {
        return  setText(intl, id);
       }

    const total = () => { 

        try {
            
            return saldoTotal.map( (saldo, i) => {
                let icon = setIcon(convertToNumber(saldo.saldototal));
                let color= setColor(convertToNumber(saldo.saldototal));
                
                return (  <div key={i} className='to-right'>                                                    
                            <div  className='f4'>
                                <span className='mr2'>{getText('saldoAtual')}:</span>
                                <span className={color}>{saldo.saldototal}</span>
                                <i className={icon}></i>
                            </div>
                            </div> )
            });
        } catch (error) {
            console.log(error);
            return '';
        }

    }
    
    return (    
            <div className='flex bg-near-white bb b--dark-blue bw2 mb3 .shadow-5 '>            
                    {/* {tipo()}    */}
                    {total()}
            </div>
)
}

export default Resume;