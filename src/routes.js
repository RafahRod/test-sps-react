import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/users/:userId",
    element: (
      <ProtectedRoute>
        <UserEdit />
      </ProtectedRoute>
    ),
    loader: userLoader,
  },
]);

export default router;
