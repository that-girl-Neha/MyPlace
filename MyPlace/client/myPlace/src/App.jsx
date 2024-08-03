
import Homepage from "./components/routes/Homepage";
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Listpage  from './components/routes/Listpage/Listpage.jsx';
import {Layout,RequiredAuth} from './components/routes/Layout/Layout';
import Singlepage from "./components/routes/singlePage/Singlepage";
import Profilepage from "./components/routes/profilePage/Profilepage";
import Login from "./components/routes/login/Login";
import Register from "./components/routes/register/Register";
import ProfileUpdatePage from "./components/routes/profileUpdatePage/ProfileUpdatePage";
import NewPostpage from "./components/routes/newPostpage/NewPostpage";
import { listPageLoader, singlePageLoader,profilePageLoader } from "./library/loader";
 
function App() {

  const router = createBrowserRouter([
    {
     path:"/",
    element: <Layout/> ,
    children:[
      {
        path:"/",
        element:<Homepage/>,
      },
      {
        path:"/list",
        element:<Listpage/>,
        loader: listPageLoader,
      },
      {
        path:"/:id",
        element:<Singlepage/>,
        loader: singlePageLoader,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
    ],
    } , 
    {
      path:"/",
      element:<RequiredAuth/>,
      children:[
        {
          path:"/profile",
        element:<Profilepage/>,
        loader: profilePageLoader,
        },
        {
          path:"/profile/update",
        element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
        element:<NewPostpage/>
        },
       
      ],
    } ,
 
 ]);
  return (
    <>

<RouterProvider router={router}/>
  
    </>
  )
}

export default App;