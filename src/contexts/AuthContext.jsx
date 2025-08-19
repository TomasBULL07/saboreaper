import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext(void 0);
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem("saborea_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("saborea_user");
    }
  };
  useEffect(() => {
    const savedUser = localStorage.getItem("saborea_user");
    if (savedUser) {
      try {
        setAuthUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("saborea_user");
      }
    }
    setIsLoading(false);
  }, []);
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
      const isRestaurant = email.includes("restaurant") || email.includes("restaurante");
      const mockUser = {
        id: Date.now().toString(),
        email,
        name: isRestaurant ? "Restaurante Demo" : "Usuario Demo",
        username: isRestaurant ? "restaurant_demo" : "usuario_demo",
        type: isRestaurant ? "restaurante" : "cliente",
        avatar: "",
        bio: isRestaurant ? "Restaurante especializado en comida casera" : "Amante de la buena comida",
        location: "Ciudad de M\xE9xico",
        favoriteRestaurant: isRestaurant ? void 0 : "La Cocina del Chef",
        cuisine: isRestaurant ? "Casera" : void 0
      };
      setAuthUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Error al iniciar sesi\xF3n");
    } finally {
      setIsLoading(false);
    }
  };
  const register = async (userData) => {
    setIsLoading(true);
    try {
      console.log("Starting registration with data:", userData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const isRestaurant = userData.type === "restaurante";
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name || (isRestaurant ? "Nuevo Restaurante" : "Nuevo Usuario"),
        username: userData.username || userData.email.split("@")[0],
        type: userData.type || "cliente",
        avatar: "",
        bio: isRestaurant ? "Restaurante registrado en SABOREA" : "Nuevo usuario de SABOREA",
        location: userData.location || "No especificada",
        phone: userData.phone || "",
        website: userData.website || "",
        favoriteRestaurant: isRestaurant ? void 0 : userData.favoriteRestaurant || "",
        cuisine: isRestaurant ? userData.cuisine || "Variada" : void 0
      };
      console.log("Created user:", newUser);
      setAuthUser(newUser);
      console.log("Registration completed successfully");
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setAuthUser(null);
  };
  return <AuthContext.Provider value={{ user, login, register, logout, isLoading, setUser: setAuthUser }}>{children}</AuthContext.Provider>;
};
export {
  AuthProvider,
  useAuth
};
