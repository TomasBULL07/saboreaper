import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
const FollowContext = createContext(void 0);
const useFollow = () => {
  const context = useContext(FollowContext);
  if (context === void 0) {
    throw new Error("useFollow must be used within a FollowProvider");
  }
  return context;
};
const FollowProvider = ({ children }) => {
  const { user } = useAuth();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const generateMockUsers = () => {
    if (!user) return [];
    const currentUserId = user.id;
    const baseId = parseInt(currentUserId) || 1e3;
    return [
      // Clientes mock
      {
        id: `${baseId + 1}`,
        name: "Mar\xEDa Gonz\xE1lez",
        username: "maria_foodie",
        type: "cliente",
        avatar: "",
        bio: "Explorando los mejores sabores de la ciudad \u{1F37D}\uFE0F",
        location: "Ciudad de M\xE9xico",
        verified: false,
        followers: 456,
        following: 234
      },
      {
        id: `${baseId + 2}`,
        name: "Carlos Ram\xEDrez",
        username: "carlos_chef",
        type: "cliente",
        avatar: "",
        bio: "Chef profesional compartiendo recetas y experiencias",
        location: "Guadalajara",
        verified: true,
        followers: 1289,
        following: 145
      },
      {
        id: `${baseId + 3}`,
        name: "Ana Mart\xEDnez",
        username: "ana_eats",
        type: "cliente",
        avatar: "",
        bio: "Amante de la comida italiana y asi\xE1tica",
        location: "Monterrey",
        verified: false,
        followers: 234,
        following: 189
      },
      {
        id: `${baseId + 4}`,
        name: "Jaimito P\xE9rez",
        username: "jaimito_food",
        type: "cliente",
        avatar: "",
        bio: "Buscando las mejores sodas tradicionales",
        location: "San Jos\xE9",
        verified: false,
        followers: 123,
        following: 89
      },
      {
        id: `${baseId + 5}`,
        name: "Juan Domingo",
        username: "juan_chef",
        type: "cliente",
        avatar: "",
        bio: "Food blogger y cr\xEDtico gastron\xF3mico",
        location: "Guadalajara",
        verified: true,
        followers: 2156,
        following: 678
      },
      // Restaurantes mock
      {
        id: `rest_${baseId + 1}`,
        name: "Pollo Campestre",
        username: "pollo_campestre",
        type: "restaurante",
        avatar: "",
        bio: "Aut\xE9ntica comida campestre desde 1985",
        location: "Centro Hist\xF3rico",
        cuisine: "Costarricense",
        verified: true,
        followers: 3456,
        following: 234
      },
      {
        id: `rest_${baseId + 2}`,
        name: "Mix de la Casa",
        username: "mix_casa",
        type: "restaurante",
        avatar: "",
        bio: "Fusi\xF3n de sabores internacionales",
        location: "Polanco",
        cuisine: "Fusi\xF3n",
        verified: true,
        followers: 2134,
        following: 189
      },
      {
        id: `rest_${baseId + 3}`,
        name: "La Cocina del Chef",
        username: "cocina_chef",
        type: "restaurante",
        avatar: "",
        bio: "Aut\xE9ntica cocina italiana en el coraz\xF3n de la ciudad",
        location: "Centro Hist\xF3rico",
        cuisine: "Italiana",
        verified: true,
        followers: 1234,
        following: 98
      },
      {
        id: `rest_${baseId + 4}`,
        name: "Mariscos del Puerto",
        username: "mariscos_puerto",
        type: "restaurante",
        avatar: "",
        bio: "Los mejores mariscos frescos del puerto",
        location: "Puerto Viejo",
        cuisine: "Mariscos",
        verified: true,
        followers: 892,
        following: 67
      },
      {
        id: `rest_${baseId + 5}`,
        name: "Sushi Zen",
        username: "sushi_zen",
        type: "restaurante",
        avatar: "",
        bio: "Experiencia aut\xE9ntica de sushi japon\xE9s",
        location: "Polanco",
        cuisine: "Japonesa",
        verified: true,
        followers: 2156,
        following: 123
      },
      {
        id: `rest_${baseId + 6}`,
        name: "Kimchis",
        username: "kimchis_restaurant",
        type: "restaurante",
        avatar: "",
        bio: "Aut\xE9ntica cocina coreana tradicional",
        location: "Gangnam District",
        cuisine: "Coreana",
        verified: true,
        followers: 1567,
        following: 234
      },
      {
        id: `rest_${baseId + 7}`,
        name: "Fonda Azteca",
        username: "fonda_azteca",
        type: "restaurante",
        avatar: "",
        bio: "Sabores tradicionales mexicanos",
        location: "Centro Hist\xF3rico",
        cuisine: "Mexicana",
        verified: false,
        followers: 567,
        following: 89
      },
      {
        id: `rest_${baseId + 8}`,
        name: "Tacos El G\xFCero",
        username: "tacos_guero",
        type: "restaurante",
        avatar: "",
        bio: "Los mejores tacos de la Roma Norte",
        location: "Roma Norte",
        cuisine: "Mexicana",
        verified: false,
        followers: 789,
        following: 45
      }
    ];
  };
  useEffect(() => {
    loadFollowData();
  }, [user]);
  useEffect(() => {
    if (user && following.length >= 0) {
      localStorage.setItem(`saborea_following_${user.id}`, JSON.stringify(following));
    }
  }, [following, user]);
  useEffect(() => {
    if (user && followers.length >= 0) {
      localStorage.setItem(`saborea_followers_${user.id}`, JSON.stringify(followers));
    }
  }, [followers, user]);
  const loadFollowData = () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const savedFollowing = localStorage.getItem(`saborea_following_${user.id}`);
      if (savedFollowing) {
        setFollowing(JSON.parse(savedFollowing));
      } else {
        setFollowing([]);
      }
      const savedFollowers = localStorage.getItem(`saborea_followers_${user.id}`);
      if (savedFollowers) {
        setFollowers(JSON.parse(savedFollowers));
      } else {
        const userIdNum = parseInt(user.id) || 1;
        const initialFollowers = [`${userIdNum + 10}`, `${userIdNum + 11}`];
        setFollowers(initialFollowers);
      }
    } catch (error) {
      console.error("Error loading follow data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const followUser = (userId) => {
    if (!user || userId === user.id) return;
    setFollowing((prev) => {
      if (!prev.includes(userId)) {
        return [...prev, userId];
      }
      return prev;
    });
  };
  const unfollowUser = (userId) => {
    if (!user) return;
    setFollowing((prev) => prev.filter((id) => id !== userId));
  };
  const isFollowing = (userId) => {
    return following.includes(userId);
  };
  const getFollowing = () => {
    return following;
  };
  const getFollowers = () => {
    return followers;
  };
  const mockUsers = generateMockUsers();
  const getFollowingUsers = () => {
    return mockUsers.filter((mockUser) => following.includes(mockUser.id));
  };
  const getFollowersUsers = () => {
    return mockUsers.filter((mockUser) => followers.includes(mockUser.id));
  };
  const getSuggestedUsers = () => {
    return mockUsers.filter(
      (mockUser) => mockUser.type === "cliente" && !following.includes(mockUser.id) && mockUser.id !== user?.id
    ).slice(0, 5);
  };
  const getSuggestedRestaurants = () => {
    return mockUsers.filter(
      (mockUser) => mockUser.type === "restaurante" && !following.includes(mockUser.id)
    ).slice(0, 5);
  };
  const getAllUsers = () => {
    return mockUsers.filter((mockUser) => mockUser.id !== user?.id);
  };
  const getRestaurants = () => {
    return mockUsers.filter((mockUser) => mockUser.type === "restaurante");
  };
  return <FollowContext.Provider value={{
    followUser,
    unfollowUser,
    isFollowing,
    getFollowing,
    getFollowers,
    getFollowingUsers,
    getFollowersUsers,
    getSuggestedUsers,
    getSuggestedRestaurants,
    getAllUsers,
    getRestaurants,
    isLoading
  }}>{children}</FollowContext.Provider>;
};
export {
  FollowProvider,
  useFollow
};
