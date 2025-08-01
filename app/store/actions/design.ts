import * as api from '../../api'
import {Product } from '../../types/Product'

export const postDesign = (post : Product) => async (dispatch) => {
    try {
      console.log('Post data being sent:', post);  // Log the post data to check if it's formatted correctly
      const { data } = await api.postDesign(post); 
      dispatch({ type: 'POST_PRODUCT', payload: data });
    } catch (error) {
      console.log('Error in action:', error.message); // Log the error message
    }
  };

  export const getDesign = (page : number , limit : number)=> async(dispatch : any) =>{
    try {
      const { data } = await api.getDesign(page , limit);
      dispatch({type : 'FETCH_ALL_PRODUCTS' , payload : data})
    }catch (err){
      console.log('error in action : ', err.message)
    }
  }
  export const deleteDesign = (id : string) => async (dispatch) => {
  try {
    console.log(id)
    await api.deleteDesign(id); // Send DELETE request
    dispatch({ type: 'DELETE_PRODUCT', payload: id }); // Optionally update the Redux state
  } catch (err) {
    console.log('Error deleting product:', err.message);
  }
};

export const createOrder = (items : Product[]) => async (dispatch) => {
  try {
    console.log('creating order...', items);
    const { data } = await api.createOrder(items);
    dispatch({ type: 'CREATE_ORDER', payload: data });
    return data.url;
  } catch (err) {
    console.log('create-order error', err);
    // Optionally dispatch an error action here
  }
};
