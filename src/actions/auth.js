export const setFirebase = (store, fireBase, firebaseAppAuth) => {   
    
    store.setState( {fireBase} );    
    store.setState( {firebaseAppAuth} );    
    const {user} = fireBase;
    store.setState( {user} );  
    
};

