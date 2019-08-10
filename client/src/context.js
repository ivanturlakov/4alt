import { createContext } from 'react';

const Context = createContext({
    currentUser: null,
    isAuth: false,
    draft: null,
    items: [],
    currentItem: null
});

export default Context;