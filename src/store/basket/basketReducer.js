import { fetchApi } from "../../lib/fetchApi";


export const basketActionTypes ={
    ADD_ITEM_SUCESS:"ADD_ITEM_SUCESS",
    GET_BASKET_SUCCESS:"GET_BASKET_SUCCESS",
}

const  initialState = {
    items: [],
}

 const basketReducer = (state=initialState, action)=>{
    switch(action.type) {
        case basketActionTypes.GET_BASKET_SUCCESS:
             return{
                ...state,
                items: action.payload,
             }
        default:
            return state;
    }
}
 
export default basketReducer;

export const getBasket = () => async (dispatch) => {
    try {
      const { data  } = await fetchApi("basket");
     dispatch({
        type:basketActionTypes.GET_BASKET_SUCCESS,
         payload: data.items
     })
    } catch (error) {
      console.log(error);
    }
  };


  export const addToBasket =(newItem)=>async (dispatch)=>{
    try{
        await fetchApi(`foods/${newItem.id}/addToBasket`,{
        method: 'POST',
        body:{amount: newItem.amount },
       })
       dispatch(getBasket());
    }
    catch(error) {
        console.log(error);
    }
  }

  export const uptadeBasketItem = ({id, amount}) => async(dispatch)=>{
    try{
         await fetchApi(`basketItem/${id}/update`, {
            method: "PUT",
            body:{ amount },
         })
         dispatch(getBasket())
    }
    catch(error){
        console.log(error);
    }
  }

  export const deleteBasketItem = (id) => async (dispatch)=>{
      try{
           await fetchApi(`basketItem/${id}/delete`,{
            method: "DELETE",
           })
           dispatch(getBasket())
      }
      catch(error){
          console.log(error);
      }
  }