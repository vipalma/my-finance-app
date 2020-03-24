
export const setOpen = (store, value) => {   

        const drawer = store.state.drawer;
        drawer.open = value;

        store.setState( {drawer} );       
};

export const getOpen = (store) => {
    try {
        return store.state.drawer.open;    
    } catch (error) {
         return null;   
    }
    
   
};