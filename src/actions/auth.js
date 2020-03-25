export const setFirebase = (store, fireBase) => {   
    store.setState( {fireBase} );   
    
    const {user} = fireBase;
    store.setState( {user} );  
};

