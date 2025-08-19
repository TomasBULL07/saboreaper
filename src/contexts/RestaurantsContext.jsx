import { createContext, useContext, useState, useEffect } from "react";
const RestaurantsContext = createContext(void 0);
const useRestaurants = () => {
  const context = useContext(RestaurantsContext);
  if (context === void 0) {
    throw new Error("useRestaurants must be used within a RestaurantsProvider");
  }
  return context;
};
const RestaurantsProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mockRestaurants = [
    {
      id: "rest_001",
      name: "Restaurante del Abuelito y la Abuelita",
      slug: "restaurante-abuelito-abuelita",
      description: "Se lo traemos con cari\xF1o y con amor. Aut\xE9ntica cocina t\xEDpica costarricense preparada con recetas familiares transmitidas de generaci\xF3n en generaci\xF3n.",
      cuisine: "Costarricense",
      location: "Centro Hist\xF3rico",
      address: "Avenida Central, frente al Teatro Nacional, San Jos\xE9",
      phone: "2222-2222",
      website: "www.abuelos.com",
      email: "info@abuelos.com",
      hours: {
        monday: "Cerrado",
        tuesday: "6:00 AM - 4:00 PM",
        wednesday: "6:00 AM - 4:00 PM",
        thursday: "6:00 AM - 4:00 PM",
        friday: "6:00 AM - 4:00 PM",
        saturday: "6:00 AM - 4:00 PM",
        sunday: "6:00 AM - 4:00 PM"
      },
      priceRange: "$$",
      verified: true,
      featured: true,
      rating: 4.5,
      reviewsCount: 128,
      followersCount: 1234,
      postsCount: 45,
      images: [],
      features: ["WiFi", "Parking", "Familiar", "T\xEDpico"],
      tags: ["Tradicional", "Familiar", "Desayunos", "Aut\xE9ntico"],
      createdAt: "2020-01-15T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_002",
      name: "Kimchis",
      slug: "kimchis-korean",
      description: "Aut\xE9ntica experiencia culinaria coreana en el coraz\xF3n de la ciudad. Especialistas en BBQ coreano, kimchi artesanal y platos tradicionales.",
      cuisine: "Coreana",
      location: "Escaz\xFA",
      address: "Plaza Escaz\xFA, segundo nivel, local 201",
      phone: "2289-5500",
      website: "www.kimchiscr.com",
      email: "hola@kimchiscr.com",
      hours: {
        monday: "11:00 AM - 10:00 PM",
        tuesday: "11:00 AM - 10:00 PM",
        wednesday: "11:00 AM - 10:00 PM",
        thursday: "11:00 AM - 10:00 PM",
        friday: "11:00 AM - 11:00 PM",
        saturday: "11:00 AM - 11:00 PM",
        sunday: "12:00 PM - 9:00 PM"
      },
      priceRange: "$$$",
      verified: true,
      featured: true,
      rating: 4.8,
      reviewsCount: 89,
      followersCount: 1567,
      postsCount: 67,
      images: [],
      features: ["WiFi", "Delivery", "Takeout", "Reservations"],
      tags: ["Aut\xE9ntico", "BBQ", "Moderno", "Pareja"],
      createdAt: "2021-03-20T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_003",
      name: "Fonda Azteca",
      slug: "fonda-azteca",
      description: "Sabores tradicionales mexicanos en un ambiente acogedor. Especialidades en tacos, quesadillas y platillos t\xEDpicos de M\xE9xico.",
      cuisine: "Mexicana",
      location: "Barrio Escalante",
      address: "Calle 33, Avenida 3, 50 metros sur del Farolito",
      phone: "2225-7890",
      website: "www.fondaazteca.cr",
      hours: {
        monday: "11:00 AM - 9:00 PM",
        tuesday: "11:00 AM - 9:00 PM",
        wednesday: "11:00 AM - 9:00 PM",
        thursday: "11:00 AM - 9:00 PM",
        friday: "11:00 AM - 10:00 PM",
        saturday: "11:00 AM - 10:00 PM",
        sunday: "12:00 PM - 8:00 PM"
      },
      priceRange: "$",
      verified: false,
      featured: false,
      rating: 4.3,
      reviewsCount: 156,
      followersCount: 567,
      postsCount: 23,
      images: [],
      features: ["Takeout", "Delivery", "Casual", "Spicy"],
      tags: ["Casual", "Picante", "Familiar", "Econ\xF3mico"],
      createdAt: "2019-08-10T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_004",
      name: "La Cocina del Chef",
      slug: "la-cocina-del-chef",
      description: "Aut\xE9ntica cocina italiana en el coraz\xF3n de la ciudad. Pasta fresca, pizzas artesanales y los mejores vinos italianos.",
      cuisine: "Italiana",
      location: "Centro Hist\xF3rico",
      address: "Avenida Segunda, entre calles 5 y 7, edificio hist\xF3rico",
      phone: "2233-4455",
      website: "www.lacocinadelchef.com",
      email: "reservas@lacocinadelchef.com",
      hours: {
        monday: "Cerrado",
        tuesday: "12:00 PM - 10:00 PM",
        wednesday: "12:00 PM - 10:00 PM",
        thursday: "12:00 PM - 10:00 PM",
        friday: "12:00 PM - 11:00 PM",
        saturday: "12:00 PM - 11:00 PM",
        sunday: "12:00 PM - 9:00 PM"
      },
      priceRange: "$$$",
      verified: true,
      featured: true,
      rating: 4.7,
      reviewsCount: 234,
      followersCount: 1892,
      postsCount: 78,
      images: [],
      features: ["WiFi", "Reservations", "Wine Bar", "Romantic"],
      tags: ["Rom\xE1ntico", "Fine Dining", "Pasta", "Vinos"],
      createdAt: "2018-05-15T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_005",
      name: "Mariscos del Puerto",
      slug: "mariscos-del-puerto",
      description: "Los mejores mariscos frescos directo del Puerto de Puntarenas. Especialidades en ceviche, pescado entero y mariscos frescos.",
      cuisine: "Mariscos",
      location: "Los Yoses",
      address: "Barrio Los Yoses, 200 metros este del Mall San Pedro",
      phone: "2234-5678",
      hours: {
        monday: "11:00 AM - 8:00 PM",
        tuesday: "11:00 AM - 8:00 PM",
        wednesday: "11:00 AM - 8:00 PM",
        thursday: "11:00 AM - 8:00 PM",
        friday: "11:00 AM - 9:00 PM",
        saturday: "11:00 AM - 9:00 PM",
        sunday: "11:00 AM - 7:00 PM"
      },
      priceRange: "$$",
      verified: true,
      featured: false,
      rating: 4.6,
      reviewsCount: 187,
      followersCount: 892,
      postsCount: 34,
      images: [],
      features: ["Fresh Seafood", "Takeout", "Parking", "Family"],
      tags: ["Fresco", "Familiar", "Ceviche", "Local"],
      createdAt: "2020-11-01T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_006",
      name: "Sushi Zen",
      slug: "sushi-zen",
      description: "Experiencia aut\xE9ntica de sushi japon\xE9s con ingredientes frescos importados. Omakase y rolls especiales preparados por chef japon\xE9s.",
      cuisine: "Japonesa",
      location: "Rohrmoser",
      address: "Pavas, Rohrmoser, Plaza Mayor, local 15",
      phone: "2290-1234",
      website: "www.sushizen.cr",
      email: "info@sushizen.cr",
      hours: {
        monday: "Cerrado",
        tuesday: "6:00 PM - 11:00 PM",
        wednesday: "6:00 PM - 11:00 PM",
        thursday: "6:00 PM - 11:00 PM",
        friday: "6:00 PM - 12:00 AM",
        saturday: "6:00 PM - 12:00 AM",
        sunday: "6:00 PM - 10:00 PM"
      },
      priceRange: "$$$$",
      verified: true,
      featured: true,
      rating: 4.9,
      reviewsCount: 98,
      followersCount: 2156,
      postsCount: 89,
      images: [],
      features: ["Omakase", "Sake Bar", "Reservations Required", "Premium"],
      tags: ["Premium", "Aut\xE9ntico", "Sake", "Elegante"],
      createdAt: "2022-01-10T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_007",
      name: "Tacos El G\xFCero",
      slug: "tacos-el-guero",
      description: "Los mejores tacos mexicanos de la zona. Tortillas hechas a mano, carnes marinadas 24 horas y salsas secretas de la casa.",
      cuisine: "Mexicana",
      location: "Curridabat",
      address: "Curridabat centro, 100 metros norte de la iglesia",
      phone: "2272-3456",
      hours: {
        monday: "5:00 PM - 11:00 PM",
        tuesday: "5:00 PM - 11:00 PM",
        wednesday: "5:00 PM - 11:00 PM",
        thursday: "5:00 PM - 11:00 PM",
        friday: "5:00 PM - 12:00 AM",
        saturday: "12:00 PM - 12:00 AM",
        sunday: "12:00 PM - 10:00 PM"
      },
      priceRange: "$",
      verified: false,
      featured: false,
      rating: 4.4,
      reviewsCount: 145,
      followersCount: 789,
      postsCount: 28,
      images: [],
      features: ["Late Night", "Takeout", "Cash Only", "Street Food"],
      tags: ["Casual", "Nocturno", "Aut\xE9ntico", "Econ\xF3mico"],
      createdAt: "2021-07-20T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_008",
      name: "Caf\xE9 Central",
      slug: "cafe-central",
      description: "Caf\xE9 de especialidad con granos 100% costarricenses. Desayunos gourmet, reposter\xEDa artesanal y el mejor caf\xE9 de la zona.",
      cuisine: "Caf\xE9",
      location: "Centro Hist\xF3rico",
      address: "Avenida Central, diagonal al Teatro Nacional",
      phone: "2221-9876",
      website: "www.cafecentral.co.cr",
      hours: {
        monday: "6:00 AM - 6:00 PM",
        tuesday: "6:00 AM - 6:00 PM",
        wednesday: "6:00 AM - 6:00 PM",
        thursday: "6:00 AM - 6:00 PM",
        friday: "6:00 AM - 7:00 PM",
        saturday: "7:00 AM - 7:00 PM",
        sunday: "8:00 AM - 5:00 PM"
      },
      priceRange: "$$",
      verified: true,
      featured: false,
      rating: 4.5,
      reviewsCount: 267,
      followersCount: 1123,
      postsCount: 56,
      images: [],
      features: ["WiFi", "Coffee Shop", "Pastries", "Work Friendly"],
      tags: ["Caf\xE9", "Desayunos", "WiFi", "Trabajo"],
      createdAt: "2017-03-01T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_009",
      name: "Pizzer\xEDa Napoletana",
      slug: "pizzeria-napoletana",
      description: "Pizza napoletana aut\xE9ntica cocinada en horno de le\xF1a. Masa fermentada 72 horas e ingredientes importados de Italia.",
      cuisine: "Italiana",
      location: "San Pedro",
      address: "San Pedro, 300 metros sur de la UCR, Edificio Torre Freses",
      phone: "2283-7890",
      website: "www.napoletana.cr",
      hours: {
        monday: "Cerrado",
        tuesday: "5:00 PM - 10:00 PM",
        wednesday: "5:00 PM - 10:00 PM",
        thursday: "5:00 PM - 10:00 PM",
        friday: "5:00 PM - 11:00 PM",
        saturday: "12:00 PM - 11:00 PM",
        sunday: "12:00 PM - 9:00 PM"
      },
      priceRange: "$$",
      verified: true,
      featured: false,
      rating: 4.6,
      reviewsCount: 178,
      followersCount: 945,
      postsCount: 41,
      images: [],
      features: ["Wood Fired", "Takeout", "Delivery", "Authentic"],
      tags: ["Aut\xE9ntico", "Horno de Le\xF1a", "Familiar", "Pizza"],
      createdAt: "2020-09-15T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      id: "rest_010",
      name: "Burger Station",
      slug: "burger-station",
      description: "Hamburguesas gourmet con carne premium, pan artesanal y ingredientes frescos. La revoluci\xF3n de las hamburguesas ha llegado.",
      cuisine: "Americana",
      location: "Tib\xE1s",
      address: "Tib\xE1s centro, frente al parque central",
      phone: "2236-5432",
      website: "www.burgerstation.cr",
      hours: {
        monday: "11:00 AM - 10:00 PM",
        tuesday: "11:00 AM - 10:00 PM",
        wednesday: "11:00 AM - 10:00 PM",
        thursday: "11:00 AM - 10:00 PM",
        friday: "11:00 AM - 11:00 PM",
        saturday: "11:00 AM - 11:00 PM",
        sunday: "12:00 PM - 9:00 PM"
      },
      priceRange: "$$",
      verified: false,
      featured: false,
      rating: 4.2,
      reviewsCount: 134,
      followersCount: 678,
      postsCount: 19,
      images: [],
      features: ["Gourmet", "Delivery", "Takeout", "Craft Beer"],
      tags: ["Gourmet", "Joven", "Cerveza", "Casual"],
      createdAt: "2021-11-05T00:00:00Z",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  useEffect(() => {
    loadRestaurants();
  }, []);
  const loadRestaurants = () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        setRestaurants(mockRestaurants);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error loading restaurants:", error);
      setIsLoading(false);
    }
  };
  const searchRestaurants = (query) => {
    if (!query.trim()) return restaurants;
    const lowercaseQuery = query.toLowerCase().trim();
    return restaurants.filter(
      (restaurant) => restaurant.name.toLowerCase().includes(lowercaseQuery) || restaurant.cuisine.toLowerCase().includes(lowercaseQuery) || restaurant.location.toLowerCase().includes(lowercaseQuery) || restaurant.description.toLowerCase().includes(lowercaseQuery) || restaurant.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
    );
  };
  const filterRestaurants = (filters) => {
    let filtered = [...restaurants];
    if (filters.cuisine) {
      filtered = filtered.filter((r) => r.cuisine === filters.cuisine);
    }
    if (filters.location) {
      filtered = filtered.filter((r) => r.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.priceRange && filters.priceRange.length > 0) {
      filtered = filtered.filter((r) => filters.priceRange.includes(r.priceRange));
    }
    if (filters.rating) {
      filtered = filtered.filter((r) => r.rating >= filters.rating);
    }
    if (filters.features && filters.features.length > 0) {
      filtered = filtered.filter(
        (r) => filters.features.some((feature) => r.features.includes(feature))
      );
    }
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[filters.sortBy];
        const bValue = b[filters.sortBy];
        if (filters.sortOrder === "desc") {
          return aValue > bValue ? -1 : 1;
        } else {
          return aValue < bValue ? -1 : 1;
        }
      });
    }
    return filtered;
  };
  const getRestaurantsByLocation = (location) => {
    return restaurants.filter(
      (r) => r.location.toLowerCase().includes(location.toLowerCase())
    );
  };
  const getRestaurantsByCuisine = (cuisine) => {
    return restaurants.filter((r) => r.cuisine === cuisine);
  };
  const getRestaurantById = (id) => {
    return restaurants.find((r) => r.id === id);
  };
  const getRestaurantBySlug = (slug) => {
    return restaurants.find((r) => r.slug === slug);
  };
  const getRestaurantSuggestions = (query) => {
    if (!query.trim()) return restaurants.slice(0, 5);
    return searchRestaurants(query).slice(0, 8);
  };
  const getAllCuisines = () => {
    const cuisines = [...new Set(restaurants.map((r) => r.cuisine))];
    return cuisines.sort();
  };
  const getAllLocations = () => {
    const locations = [...new Set(restaurants.map((r) => r.location))];
    return locations.sort();
  };
  const getAllFeatures = () => {
    const features = [...new Set(restaurants.flatMap((r) => r.features))];
    return features.sort();
  };
  const getPopularRestaurants = () => {
    return restaurants.sort((a, b) => b.followersCount - a.followersCount).slice(0, 10);
  };
  const featuredRestaurants = restaurants.filter((r) => r.featured);
  return <RestaurantsContext.Provider value={{
    restaurants,
    featuredRestaurants,
    searchRestaurants,
    filterRestaurants,
    getRestaurantsByLocation,
    getRestaurantsByCuisine,
    getRestaurantById,
    getRestaurantBySlug,
    getRestaurantSuggestions,
    getAllCuisines,
    getAllLocations,
    getAllFeatures,
    getPopularRestaurants,
    isLoading
  }}>{children}</RestaurantsContext.Provider>;
};
export {
  RestaurantsProvider,
  useRestaurants
};
