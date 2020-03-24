import React from "react";
import useGlobal from "../store";
import { setText } from "../i18n/utils";

const MessageArea = () => {
  const [globalState] = useGlobal();

  const { intl, fechamentos, selectedDate } = globalState;

  const getText = (id) => {
    return setText(intl, id);
  }
  
  const messageBox = () => {
    return (

    <div className="ui visible green message">
        <p>{getText('mesFechado')}</p>
    </div> 

    )
  }
  

  const build = () => ( fechamentos.some(item => item.date === selectedDate)) ? messageBox() : '';
  
  return (              
    <>{build()}</>
  );
};

export default MessageArea;
