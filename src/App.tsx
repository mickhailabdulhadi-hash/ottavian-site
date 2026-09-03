import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "@/pages/Homepage";
import SignIn from "@/pages/SignIn";
import ProductLayout from "@/lib/ProductLayout";
import Dashboard from "@/pages/Dashboard";
import Deploy from "@/pages/Deploy";
import DeployConfigure from "@/pages/DeployConfigure";
import Settings from "@/pages/Settings";

// Single entry point for the whole Ottavian site -- marketing homepage
// AND the logged-in product screens.
//
// /dashboard, /deploy, /deploy/:appId, /settings all render inside
// ProductLayout (sidebar + credit history drawer, mounted once) via
// nested routes / <Outlet />.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route element={<ProductLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="/deploy/:appId" element={<DeployConfigure />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
