import { defer } from "react-router-dom";
import apiRequest from  "./apiRequest";

export const singlePageLoader = async ({request,params})=>{

    const res = await apiRequest("/posts/" + params.id);

    return res.data;
};

export const listPageLoader = async ({request,params})=>{

     console.log(request);
    const query = request.url.split("?")[1];
     const postPromise =  apiRequest("/posts?" + query);

    return defer({
        postResponse:postPromise,
    });
};

export const profilePageLoader = async ({request,params})=>{

    const postPromise =  apiRequest("/users/profilePosts");

    const chatPromise =  apiRequest("/chats");

   return defer({
       postResponse:postPromise,
       chatResponse: chatPromise,
   });
};

// export const profilePageLoader = async ({request,params}) => {
//     const postPromise = apiRequest("/users/profilePosts")  // Remove "/api" from here
//       .then(response => {
//         console.log("API Response:", response);
//         return response.data;
//       })
//       .catch(error => {
//         console.error("Error fetching profile posts:", error);
//         if (error.response) {
//           console.log("Error response data:", error.response.data);
//           console.log("Error response status:", error.response.status);
//         }
//         throw error;
//       });
  
//     return defer({
//       postResponse: postPromise,
//     });
//   };