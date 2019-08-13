export default function reducer(state, { type, payload }) {
    switch(type) {
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: payload
            };
        case "IS_LOGGED_IN":
            return {
                ...state,
                isAuth: payload
            };
        case "SIGNOUT_USER":
            return {
                ...state,
                isAuth: false,
                currentUser: null
            };
        case "CREATE_DRAFT":
            return {
                ...state,
                currentItem: null,
                draft: {
                    latitude: 0,
                    longitude: 0
                }
            };
        case "UPDATE_DRAFT_LOCATION":
            return {
                ...state,
                draft: payload
            };
        case "DELETE_DRAFT":
                return {
                    ...state,
                    draft: null
                };
        case "GET_ITEMS":
            return {
                ...state,
                items: payload
            };
        case "CREATE_ITEM":
            const newItem = payload;
            const prevItems = state.items.filter(item => item._id !== newItem._id);
            return {
                ...state,
                items: [...prevItems, newItem]
            }; 
        case "SET_ITEM":
            return {
                ...state,
                currentItem: payload,
                draft: null
            };
        case "DELETE_CURRENT_ITEM":
            return {
                ...state,
                currentItem: null
            };    
        case "DELETE_ITEM":
            const deletedItem = payload;
            const filteredItems = state.items.filter(item => item._id !== deletedItem._id);
            if(state.currentItem) {
                const isCurrentItem = deletedItem._id === state.currentItem._id;
                if(isCurrentItem) {
                    return {
                        ...state,
                        items: filteredItems,
                        currentItem: null
                    } 
                }
            };
            return {
                ...state,
                items: filteredItems,
            };
        case "CREATE_COMMENT":
            const updatedCurrentItem = payload;
            //find and replace
            const updatedItems = state.items.map(item =>
                item._id === updatedCurrentItem._id ? updatedCurrentItem : item
            )
            return {
                ...state,
                items: updatedItems,
                currentItem: updatedCurrentItem
            } 
        default:
            return state;
    }
}