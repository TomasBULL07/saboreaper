import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
const MenuContext = createContext(void 0);
const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === void 0) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
const MenuProvider = ({ children }) => {
  const { user } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadMenuItems();
  }, []);
  useEffect(() => {
    if (menuItems.length >= 0) {
      localStorage.setItem("saborea_menu_items", JSON.stringify(menuItems));
    }
  }, [menuItems]);
  const loadMenuItems = () => {
    setIsLoading(true);
    try {
      const savedItems = localStorage.getItem("saborea_menu_items");
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setMenuItems(parsedItems);
      } else {
        const mockMenuItems = [
          {
            id: "1",
            restaurantId: "rest_001",
            name: "Gallo Pinto Tradicional",
            description: "El desayuno t\xEDpico costarricense con arroz, frijoles, huevo y pl\xE1tano maduro",
            price: 3500,
            category: "plato-principal",
            ingredients: ["Arroz", "Frijoles negros", "Huevo", "Pl\xE1tano maduro", "Queso turrialba"],
            preparationTime: 15,
            available: true,
            featured: true,
            images: [],
            allergens: ["Huevo", "L\xE1cteos"],
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            spicyLevel: 0,
            calories: 450,
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: "2",
            restaurantId: "rest_001",
            name: "Casado Completo",
            description: "Plato tradicional con arroz, frijoles, carne, pl\xE1tano, ensalada y picadillo",
            price: 4500,
            category: "plato-principal",
            ingredients: ["Arroz", "Frijoles", "Carne res", "Pl\xE1tano maduro", "Ensalada", "Picadillo de papa"],
            preparationTime: 20,
            available: true,
            featured: true,
            images: [],
            allergens: [],
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            spicyLevel: 0,
            calories: 650,
            createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1e3).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: "3",
            restaurantId: "rest_001",
            name: "Caf\xE9 de Olla",
            description: "Caf\xE9 tradicional costarricense endulzado con tapa de dulce",
            price: 1200,
            category: "bebida",
            ingredients: ["Caf\xE9 molido", "Tapa de dulce", "Canela"],
            preparationTime: 5,
            available: true,
            featured: false,
            images: [],
            allergens: [],
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            spicyLevel: 0,
            calories: 80,
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1e3).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: "4",
            restaurantId: "rest_002",
            name: "Bibimbap Tradicional",
            description: "Arroz con vegetales salteados, carne marinada y huevo frito",
            price: 8500,
            category: "plato-principal",
            ingredients: ["Arroz", "Espinacas", "Zanahoria", "Brotes de soja", "Carne de res", "Huevo", "Gochujang"],
            preparationTime: 25,
            available: true,
            featured: true,
            images: [],
            allergens: ["Huevo", "Soja"],
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            spicyLevel: 2,
            calories: 520,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1e3).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: "5",
            restaurantId: "rest_002",
            name: "Kimchi Casero",
            description: "Col fermentada tradicional coreana con especias",
            price: 3e3,
            category: "entrada",
            ingredients: ["Col china", "Gochugaru", "Ajo", "Jengibre", "Sal marina"],
            preparationTime: 10,
            available: true,
            featured: false,
            images: [],
            allergens: [],
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            spicyLevel: 2,
            calories: 45,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1e3).toISOString(),
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          }
        ];
        setMenuItems(mockMenuItems);
        localStorage.setItem("saborea_menu_items", JSON.stringify(mockMenuItems));
      }
    } catch (error) {
      console.error("Error loading menu items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const getMenuByRestaurant = (restaurantId) => {
    return menuItems.filter((item) => item.restaurantId === restaurantId);
  };
  const getMenuStats = (restaurantId) => {
    const restaurantItems = getMenuByRestaurant(restaurantId);
    const activeItems = restaurantItems.filter((item) => item.available);
    const categoryCounts = restaurantItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
    const averagePrice = restaurantItems.length > 0 ? restaurantItems.reduce((sum, item) => sum + item.price, 0) / restaurantItems.length : 0;
    return {
      totalItems: restaurantItems.length,
      activeItems: activeItems.length,
      categoryCounts,
      averagePrice,
      featuredItems: restaurantItems.filter((item) => item.featured).length
    };
  };
  const createMenuItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setMenuItems((prev) => [newItem, ...prev]);
  };
  const updateMenuItem = (id, updates) => {
    setMenuItems(
      (prev) => prev.map(
        (item) => item.id === id ? { ...item, ...updates, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : item
      )
    );
  };
  const deleteMenuItem = (id) => {
    if (!user) return;
    setMenuItems((prev) => prev.filter((item) => {
      if (item.id === id) {
        return item.restaurantId !== user.id;
      }
      return true;
    }));
  };
  const toggleAvailability = (id) => {
    setMenuItems(
      (prev) => prev.map(
        (item) => item.id === id ? { ...item, available: !item.available, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : item
      )
    );
  };
  const toggleFeatured = (id) => {
    setMenuItems(
      (prev) => prev.map(
        (item) => item.id === id ? { ...item, featured: !item.featured, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : item
      )
    );
  };
  const getItemsByCategory = (restaurantId, category) => {
    return getMenuByRestaurant(restaurantId).filter((item) => item.category === category);
  };
  const searchMenuItems = (restaurantId, query) => {
    if (!query.trim()) return getMenuByRestaurant(restaurantId);
    const lowercaseQuery = query.toLowerCase();
    return getMenuByRestaurant(restaurantId).filter(
      (item) => item.name.toLowerCase().includes(lowercaseQuery) || item.description.toLowerCase().includes(lowercaseQuery) || item.ingredients.some((ingredient) => ingredient.toLowerCase().includes(lowercaseQuery))
    );
  };
  const getAvailableItems = (restaurantId) => {
    return getMenuByRestaurant(restaurantId).filter((item) => item.available);
  };
  const getFeaturedItems = (restaurantId) => {
    return getMenuByRestaurant(restaurantId).filter((item) => item.featured && item.available);
  };
  return <MenuContext.Provider value={{
    menuItems,
    getMenuByRestaurant,
    getMenuStats,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleAvailability,
    toggleFeatured,
    getItemsByCategory,
    searchMenuItems,
    getAvailableItems,
    getFeaturedItems,
    isLoading
  }}>{children}</MenuContext.Provider>;
};
export {
  MenuProvider,
  useMenu
};
