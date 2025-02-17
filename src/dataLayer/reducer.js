

export const initialState = {
    basket: [],
    user: null
};

export const getBasketTotal = (basket) =>
    basket?.reduce((amount,item)=>(item.price+amount), 0 )

const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        default:
            return state;
        
            case 'SET_USER':
                return{
                    ...state,
                    user: action.user
                }
    }
}

export default reducer