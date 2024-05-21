import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

// Layouts
import RootLayout from "./layouts/RootLayout";
import PrivateRouteLayout, {authorizeRoute} from "./layouts/PrivateRouteLayout";

// Pages
import NotFound from "./pages/NotFound";
import Home, {checkToken} from "./pages/Home";
import UnauthenticatedError from "./pages/Auth/UnauthenticatedError";
import GeneralError from "./GeneralError";
import Login, {login} from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<GeneralError />}>
      <Route
        index
        element={<Home/>}
        loader={checkToken}
      />

      <Route
        path='/login'
        element={<Login />}
        action={login}
        errorElement={<GeneralError />}
      />

      <Route
        path=''
        element={<PrivateRouteLayout />}
        loader={authorizeRoute}
        errorElement={<UnauthenticatedError />}
      >
        <Route path='dashboard' element={<Dashboard />}/>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Route>
  )
)
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
