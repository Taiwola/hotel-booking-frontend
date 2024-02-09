import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom"
import Layout from "./layout/layout";
import Register from "./pages/register";
import SignIn from "./pages/login";


function App() {

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
        <Route path="*" element={<Navigate to={"/"}/>} />
    </Routes>
   </BrowserRouter>
  )
}

export default App
