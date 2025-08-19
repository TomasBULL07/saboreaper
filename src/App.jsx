import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { PostsProvider } from "./contexts/PostsContext";
import { FollowProvider } from "./contexts/FollowContext";
import { RestaurantsProvider } from "./contexts/RestaurantsContext";
import { MenuProvider } from "./contexts/MenuContext";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { Header } from "./components/layout/Header";
import { HomePage } from "./components/pages/HomePage";
import { DiscoverPage } from "./components/pages/DiscoverPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { ReviewsPage } from "./components/pages/ReviewsPage";
import { FollowingPage } from "./components/pages/FollowingPage";
import { FriendsPage } from "./components/pages/FriendsPage";
import { MenuPage } from "./components/pages/MenuPage";
const queryClient = new QueryClient();
const AppContent = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" /><p className="text-muted-foreground">Cargando...</p></div></div>;
  }
  if (!user) {
    return authMode === "login" ? <LoginForm onSwitchToRegister={() => setAuthMode("register")} /> : <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />;
  }
  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={setActiveTab} />;
      case "discover":
        return <DiscoverPage />;
      case "profile":
        return <ProfilePage />;
      case "reviews":
        return <ReviewsPage />;
      case "following":
        return <FollowingPage />;
      case "friends":
        return <FriendsPage />;
      case "menu":
        return <MenuPage />;
      case "metrics":
        return <div className="max-w-4xl mx-auto px-4 py-8 text-center"><h1 className="text-2xl font-bold text-foreground mb-4">
              Métricas del Restaurante
            </h1><p className="text-muted-foreground">Esta sección está en desarrollo</p></div>;
      default:
        return <HomePage onNavigate={setActiveTab} />;
    }
  };
  return <PostsProvider><FollowProvider><RestaurantsProvider><MenuProvider>  {
    /* ← NUEVO PROVIDER */
  }<div className="min-h-screen bg-background"><Header activeTab={activeTab} onTabChange={setActiveTab} /><main>{renderPage()}</main></div></MenuProvider>  {
    /* ← CERRAR NUEVO PROVIDER */
  }</RestaurantsProvider></FollowProvider></PostsProvider>;
};
const App = () => <QueryClientProvider client={queryClient}><AuthProvider><TooltipProvider><Toaster /><Sonner /><AppContent /></TooltipProvider></AuthProvider></QueryClientProvider>;
var App_default = App;
export {
  App_default as default
};
