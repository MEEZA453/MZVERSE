import axios from 'axios' 
const url = 'https://meeza-in-8.onrender.com/' 
//  const url  = 'http://localhost:8080/'


// api/index.ts
export const createPaypalOrder = (productId, token) =>
  axios.post(`${url}payment/paypal/create`, { productId }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const capturePaypalOrder = (orderId, token) =>
  axios.post(`${url}payment/paypal/capture`, { orderId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const createRazorpayOrder = (token, productId) =>
  axios.post(
    `${url}payment/razorpay/create`,
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// 2. Capture Razorpay Payment
export const captureRazorpayPayment = (token, payload) =>
  axios.post(`${url}payment/razorpay/capture`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

  export const createRazorpayCartOrder = (token, cartItems) =>
  axios.post(
    `${url}payment/razorpay/cart/create`,
    { cartItems }, // [{ productId }, { productId }]
    { headers: { Authorization: `Bearer ${token}` } }
  );

// 🔹 4. Capture Razorpay Payment (Cart / Multiple Products)
export const captureRazorpayCartPayment = (token, payload) =>
  axios.post(`${url}payment/razorpay/cart/capture`, payload, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 3. Connect Razorpay Account (OAuth result)
export const connectRazorpayAccount = (token, razorpayAccountId) =>
  axios.post(
    `${url}payment/razorpay/connect`,
    { razorpayAccountId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// 4. Withdraw Seller Balance
export const withdrawBalance = (token) =>
  axios.post(`${url}payment/razorpay/withdraw`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

// 5. Fetch Wallet Transactions
export const getWalletTransactions = (token) =>
  axios.get(`${url}payment/razorpay/wallet`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const unlockFreeProduct = (productId, token) =>
  axios.post(`${url}order/${productId}/unlock`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Download product (use unlock token)
export const downloadProduct = (productId, unlockToken) =>
  axios.get(`${url}order/${productId}/download`, {
    params: { token: unlockToken }
  });
export const getUserCart = (token) =>
  axios.get(`${url}cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (productId, token) =>
  axios.post(
    `${url}cart/add`,
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const removeFromCart = (productId, token) =>
  axios.post(
    `${url}cart/remove`,
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const clearCart = (token) =>
  axios.delete(`${url}cart/clear`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const requestAttachAsset = (postId, assetId, message, token) =>
  axios.post(`${url}post/request-attach`, { postId, assetId, message }, {
    headers: { Authorization: `Bearer ${token}` }
  });
 export const attachAsset = (postId, assetId, token) =>
  axios.post(`${url}post/attach`, { postId, assetId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  export const approveAttachRequest = (notificationId, approve, token) =>
  axios.post(`${url}post/approve-attach`, { notificationId, approve }, {
    headers: { Authorization: `Bearer ${token}` }
  });
export const detachAsset = (postId ,assetId, token) =>
  axios.post(`${url}post/detach`, { postId, assetId }, {
    headers: { Authorization: `Bearer ${token}` }
  });
// Get assets of a post
export const getAssetsOfPost = (postId, token) =>
  axios.get(`${url}post/${postId}/assets`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Get posts where an asset is used
export const getPostsOfAsset = (assetId, token) =>
  axios.get(`${url}asset/${assetId}/posts`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getNotifications = (token) =>
  axios.get(`${url}notification`,{
    headers: { Authorization: `Bearer ${token}` }
  });

export const markAllNotificationsRead = (token) =>
  axios.put(`${url}notification/read`,{}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const markNotificationRead = (id, token) =>
  axios.put(`${url}notification/read/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteNotification = (id, token) =>
  axios.delete(`${url}notification/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Follow a user
export const followUser = (targetId, token) =>
  axios.post(`${url}user/follow/${targetId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Unfollow a user
export const unfollowUser = (targetId, token) =>
  axios.post(`${url}user/unfollow/${targetId}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Get followers by handle
export const getFollowers = (handle) =>
  axios.get(`${url}user/${handle}/followers`);

// Get following by handle
export const getFollowing = (handle) =>
  axios.get(`${url}user/${handle}/following`);

export const applyJury = (message, token) =>
  axios.post(
    `${url}user/applyJury`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
export const approveNormal = (userId, approve, token) =>
  axios.post(
    `${url}user/approveNormal`,
    { userId, approve },
    { headers: { Authorization: `Bearer ${token}` } }
  );

// Approve/Reject jury request (for devs)
export const approveJury = (userId, approve, token) =>
  axios.post(
    `${url}user/approveJury`,
    { userId, approve },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const registerUser = (user) =>
  axios.post(`${url}user/register`, user);
export const getProductById = (handle)=> axios.get(`${url}user/getProductById/${handle}`)
export const loginUser = (user) =>
  axios.post(`${url}user/login`, user);
export const googleLogin = (code) =>
  axios.post(`${url}user/google-login`, { code });

export const setUserHandle = (userId, handle, token) =>
  axios.post(
  `${url}user/handle`,
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

export const getUserByHandle = (handle, token) =>
  axios.get(`${url}user/${handle}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// search featre
export const searchUsers = (query, token) =>
  axios.get(`${url}user/search/users?query=${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const searchAssets = (query, page, limit, token) =>
  axios.get(`${url}search/designs`, {
    params: { query, page, limit },
    headers: { Authorization: `Bearer ${token}` }, // ✅ added
  });
export const searchPosts = (query) =>
  axios.get(`${url}post/search/posts?query=${query}`);


export const getDefaultUsers = ( token) =>
  axios.get(`${url}user/defaultSearch`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getDefaultPosts = (limit = 10) =>
  axios.get(`${url}post/defaultSearch`, {
    params: { limit }
  });

export const getDefaultAssets = (page, limit, token) =>
  axios.get(`${url}defaultSearch`, {
    params: { page, limit },
    headers: { Authorization: `Bearer ${token}` },
  });
export const sendEmailOtp = (email) =>
  axios.post(`${url}user/send-otp`, { email })

export const verifyEmailOtp = (payload) =>
  axios.post(`${url}user/verify-otp`, payload)

// optional: resend endpoint
export const resendOtp = (email) =>
  axios.post(`${url}user/resend-otp`, { email })

export const deleteDesign = (id) => axios.delete(`${url}delete/${id}`);
export const getDesign = (token) => {
  return axios.get(`${url}allproducts`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
export const getDesignById = (id, token) => {
  return axios.get(`${url}assetById/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};

// ✅ Get product by HANDLE
export const getDesignByHandle = (handle, token) => {
  return axios.get(`${url}assetByHandle/${handle}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
export const createOrder = (items)=> axios.post(`${url}payment/create-order` , items)

// export const getDesign = (page = 1 , limit = 6 ) =>
//   axios.post(`${url}allProducts`,page , limit, );

export const postDesign = (newPost, token) => {
  return axios.post(`${url}post`, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
export const editDesign = (id, post, token) => {
  return axios.put(`${url}edit/${id}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', // <- required for FormData
    },
  });
};


export const addToFavorites = (designId , token) =>
  axios.post(`${url}fav/favorites/add`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromFavorites = (designId, token) =>
  axios.post(`${url}fav/favorites/remove`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });


export const getFavoritesByHandle = (token, handle) =>
axios.get(`${url}fav/favoritesByHandle/${handle}`, {
  headers: { Authorization: `Bearer ${token}` }
});


export const addToHighlight = (designId , token) =>
  axios.post(`${url}highlight/add`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromHighlight = (designId, token) =>
  axios.post(`${url}highlight/remove`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });


export const getHighlight = (token) =>
axios.get(`${url}highlight/getHighlight`, {
  headers: { Authorization: `Bearer ${token}` }
});



export const addToPromotion = (designId , token) =>
  axios.post(`${url}promotion/add`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const removeFromPromotion = (designId, token) =>
  axios.post(`${url}promotion/remove`, { designId }, {
    headers: { Authorization: `Bearer ${token}` }
  });


export const getPromotion = (token) =>
axios.get(`${url}promotion/getPromotion`, {
  headers: { Authorization: `Bearer ${token}` }
});



export const createPost = (newPost, token) => {
  return axios.post(`${url}post/createPost`, newPost, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};  

// Get All Posts
export const getPosts = () => axios.get(`${url}post`);
export const editPost = (id, post, token) =>
  axios.put(`${url}post/editPost/${id}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
// Get Post By ID
export const getPostById = (id) => axios.get(`${url}post/${id}`);
export const getPostsByHandle = (id) => axios.get(`${url}post/postByHandle/${id}`);

export const deletePost = (id , token )=>axios.delete(`${url}post/deletePost/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
// Vote on Post
export const getVotesByPost = (postId) => axios.get(`${url}post/${postId}/votes`);

// Get votes by a user
export const getVotesByUser = (userId) => axios.get(`${url}user/${userId}/votes`);

// Get all votes (admin / analytics)
export const getAllVotes = () => axios.get(`${url}votes`);

// Delete current user's vote for a post
export const deleteVote = (postId, token) => axios.delete(`${url}post/${postId}/vote`, {
  headers: { Authorization: `Bearer ${token}` }
});
export const votePost = (postId, voteData, token) =>
  axios.post(`${url}post/${postId}/vote`, voteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

