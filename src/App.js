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
import Home from "./pages/Home";
import UnauthenticatedError from "./pages/Auth/UnauthenticatedError";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route
        index
        element={<Home/>}
      />

      <Route
        path='sales'
        element={<PrivateRouteLayout />}
        loader={authorizeRoute}
        errorElement={<UnauthenticatedError />}
      >
        <Route path='*' element={<NotFound />}/>
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
