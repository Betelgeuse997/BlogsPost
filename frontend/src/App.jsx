import React from "react"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import DisableGoBackButton from "./components/auth/DisableGoBackButton.jsx";
import PrivateRoutes from "./components/privateRoutes/privateRoutes.jsx";
import Home from './pages/Home.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateBlog from './pages/CreateBlogs.jsx';
import DeleteBlog from './pages/DeleteBlog.jsx';
import EditBlog from './pages/EditBlog.jsx';
import ShowBlog from './pages/ShowBlog.jsx';
import SearchResults from "./pages/SearchResults.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DisableGoBackButton/>
        <Routes>
          <Route path="/user/signIn" element={<SignIn />} />
          <Route path="/user/signUp" element={<SignUp />} />
          <Route path="/user/forgotPassword" element={<ForgotPassword />} />
          <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
          <Route path='/' element = {<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path='/blogs/create' element = {<PrivateRoutes><CreateBlog /></PrivateRoutes>} />
          <Route path='/blogs/delete/:id' element = {<PrivateRoutes><DeleteBlog /></PrivateRoutes>} />
          <Route path='/blogs/details/:id' element = {<PrivateRoutes><ShowBlog /></PrivateRoutes>} />
          <Route path='/blogs/edit/:id' element = {<PrivateRoutes><EditBlog/></PrivateRoutes>} />
          <Route path='/user/fetch/:email' element = {<PrivateRoutes><ProfilePage/></PrivateRoutes>} />
          <Route path='/search-results/:term' element = {<PrivateRoutes><SearchResults/></PrivateRoutes>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}


export default App
