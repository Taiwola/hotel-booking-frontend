import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom"
import Layout from "./layout/layout";
import Register from "./pages/register";
import SignIn from "./pages/login";
import AddHotel from "./pages/addhotel";
import {useAppContext} from "./contexts/appcontext"
import MyHotels from "./pages/myHotels";
import EditHotels from "./pages/EditHotel";


function App() {
  const {isLoggedIn} = useAppContext();
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout>
        <p>Home page</p>
      </Layout>} /> 
        <Route path="/search" element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        }/>
        <Route path="/dashboard" element={
          <p>Dashboard</p>
        }/>
        <Route path="/register" element={<Layout>
          <Register />
          </Layout>}/>

          <Route path="/sign-in" element={<Layout>
          <SignIn />
          </Layout>}/>

          {isLoggedIn && <>
          <Route
           path="/add-hotel"
           element={
            <Layout>
              <AddHotel />
            </Layout>
           } 
            />

          <Route
           path="/my-hotels"
           element={
            <Layout>
              <MyHotels />
            </Layout>
           } 
            />

<Route
           path="/edit-hotel/:Id"
           element={
            <Layout>
              <EditHotels />
            </Layout>
           } 
            />
          </>
          }

        <Route path="*" element={<Navigate to={"/"}/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
