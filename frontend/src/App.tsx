import { useContext, useEffect, useState } from "react";
import Login from "./pages/login/login";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import SignUp from "./pages/signup/signup";
import NotFound from "./pages/fallback/notfound";
import Forgot from "./pages/forgot/forgot";
import HomeApp from "./pages/home/App";
import { PopupContext } from "./context/PopupProvider";
import Shade from "./components/common/shader";
import { Settings } from "lucide-react";
import { ProtectedRoute, PublicRoute } from "./components/common/ProtectedRoute";

function App() {
  const PopupSettings = useContext(PopupContext);
  const [shader, setShader] = useState<boolean>(false);

  useEffect(() => {
    setShader(PopupSettings.popup);
  }, [PopupSettings.popup]);
  return (
    <div>
      {shader && <Shade />}
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup/*" element={<SignUp />} />
            <Route path="/forgot/*" element={<Forgot />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomeApp />} />
            <Route path="/dashboard" element={<HomeApp />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
