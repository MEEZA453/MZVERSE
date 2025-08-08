import axios from 'axios' 
const url = 'https://meeza-in-8.onrender.com/' 
//  const url  = 'http://localhost:8080/'
export const registerUser = (user) =>
  axios.post(`${url}user/register`, user);
export const getProductById = (handle)=> axios.get(`${url}user/getProductById/${handle}`)
export const loginUser = (user) =>
  axios.post(`${url}user/login`, user);
export const googleLogin = (token) =>
  axios.post(`${url}user/google-login`,  {token} );
export const postDesign = (newPost, token) => {
  return axios.post(`${url}post`, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const setUserHandle = (userId, handle, token) =>
  axios.post(
  `${url}/handle`,
    { userId, handle },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
export const updateUserProfile = (userId, profileData , token) =>
  axios.put(`${url}user/${userId}/profile`, profileData ,     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    export const getUserByHandle = (handle)=>axios.get(`${url}user/${handle}`)
export const deleteDesign = (id) => axios.delete(`${url}delete/${id}`);
export const getDesign = (page = 1 , limit = 6)=> axios.get(`${url}allProducts` , page , limit )
export const createOrder = (items)=> axios.post(`${url}payment/create-order` , items)
export const getCart = ()=>axios.get('https://meeza-in-8.onrender.com/cart')
export const postCart = (newCart)=>axios.post('https://meeza-in-8.onrender.com/cart/postcart' , newCart)
export const deleteCart = (newCart)=>axios.post('https://meeza-in-8.onrender.com/cart/deletecart' , newCart)
export const updateCartItem = (updatedItem) => axios.put(`https://meeza-in-8.onrender.com/cart/update/${updatedItem._id}`, updatedItem);



export const addToFavorites = (designId , token) =>
  axios.post(`${url}fav/favorites/add`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromFavorites = (designId, token) =>
  axios.post(`${url}fav/favorites/remove`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getFavorites = (token) =>
  axios.get(`${url}fav/favorites`, {
    headers: { Authorization: `Bearer ${token}` }
  });