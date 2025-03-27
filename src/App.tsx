import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { GumroadAuthProvider } from "./contexts/GumroadAuthContext";
import GumroadLoginModal from "./components/auth/GumroadLoginModal";

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NicheAnalysis = lazy(() => import("./pages/NicheAnalysis"));
const MyEbooks = lazy(() => import("./pages/MyEbooks"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse">Loading...</div>
        </div>
      }
    >
      <GumroadAuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/niche-analysis" element={<NicheAnalysis />} />
              <Route path="/my-ebooks" element={<MyEbooks />} />
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" />
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </main>
          <Footer simplified />
          <GumroadLoginModal />
        </div>
      </GumroadAuthProvider>
    </Suspense>
  );
}

export default App;
