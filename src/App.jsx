import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import routes from "./routes/routes";
import auth from "./firebase/firebase.config";
import { getUser } from "features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        dispatch(getUser(user.email));
      }
    });
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  );
}

export default App;

