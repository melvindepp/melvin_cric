import logo from "./logo.svg";
import "./App.css";
import router from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
