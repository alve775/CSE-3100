import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./App.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// import React from "react";
// import ReactDom from "react-dom";
// import App from "./App.jsx";
// import { UserContextProvider } from "./components/context/UserContext.jsx";

// export const server = "http://localhost:5000";
// ReactDom.createroot(document.getElementById("root")).render(
//     <React.StrictMode>
//       <UserContextProvider>
//           <App />
//       </UserContextProvider>

//     </React.StrictMode>

// );