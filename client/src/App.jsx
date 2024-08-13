import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import  UpdateUser from "./pages/UpdateUser.jsx"


function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="update-user/:slug" element={<UpdateUser/>} />
      </Routes>
    </>
  );
}

export default App;
