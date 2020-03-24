import Dinero from 'dinero.js';
import crypto from "crypto-js";

const SECRET_KEY = 'D55FB2B867EBD5BD756ADF29B5740DA6A0DA0B34AAC6EC25CCF52CBCEB623F5D';

export const remove_first_character = (element) => {      
  return element.replace('$', '')
  }
  
  export   const remove_character = (str_to_remove, str) => {
    
    let reg = new RegExp(str_to_remove)
    const ret = str.replace(reg, '');
    
    return ret
  }

  export  const convertToNumber = (value) => {
    try {
      
      return (typeof value === 'number') ? value : remove_character(',', remove_first_character(value));
    } catch (error) {
      console.log(error);
      return 0;
    } 
    
  }

  export   const setIcon = (value) => {
    return (value >= 0 ) ? 'green angle up icon' : 'red angle down icon';
  }
  
  export   const setColor = (value) => {
  return (value >= 0 ) ? 'green' : 'red';
}
  
export const convertToMoney = (value) => {     
  try {
    
    const inteiro = Math.round(value * 100);
    return Dinero({ amount: Number(inteiro), currency: 'EUR' }).toFormat('$0,0.00');    
  } catch (error) {
    console.log(value);
    console.log(error);
    return 0;
    
  }

}

export const roundNumber = (value) => {         
  try {
    
    const inteiro = Math.round(value * 100);
    return Dinero({ amount: Number(inteiro) }).toFormat('0,0.00');    
  } catch (error) {
    console.log(value);
    console.log(error);
    return 0;
    
  }
}

String.prototype.replaceAll = function (stringToFind, stringToReplace) {
  if (stringToFind === stringToReplace) return this;
  var temp = this;
  var index = temp.indexOf(stringToFind);
  while (index != -1) {
      temp = temp.replace(stringToFind, stringToReplace);
      index = temp.indexOf(stringToFind);
  }
  return temp;
};

export const encrypt = (object) => {  
  const cryptEmail = crypto.AES.encrypt(object, SECRET_KEY);
  const replaced = cryptEmail.toString().replaceAll('+','xMl3Jk').replaceAll('/','Por21Ld').replaceAll('=','Ml32');
  return replaced;
}
