import {NavLink, Outlet} from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

function RootLayout() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout;