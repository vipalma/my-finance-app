
export const setUser = (store, user) => {   
    if (typeof user !== 'undefined')
        store.setState( {user} );    
   
};

export const getEmail = (store) => {
    try {
        return store.state.user.email;    
    } catch (error) {
         return null;   
    }
    
   
};