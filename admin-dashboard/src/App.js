import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {  hotelInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext.js";
import axios from 'axios'
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/newHotel";
import NewRoom from "./pages/newRoom/newRoom";
// axios.defaults.baseURL = 'http://localhost:4000/api';
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({children}) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />
    }
    return children
  }
  

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } />
            <Route path="users">
              <Route index element={
                <ProtectedRoute>
                  <List columns={userColumns} />
                </ProtectedRoute>
                } />
              <Route path=":userId" element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              } />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                } />
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={ hotelColumns} />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />  
                  </ProtectedRoute>
                  }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<List columns={roomColumns} />} />
              {/* <Route path=":productId" element={<Single />} /> */}
              {/* <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={productInputs} title="Add New Product" />
                  </ProtectedRoute>
                }
              /> */}
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
