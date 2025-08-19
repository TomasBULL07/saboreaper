import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
const PostsContext = createContext(void 0);
const usePosts = () => {
  const context = useContext(PostsContext);
  if (context === void 0) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
};
const PostsProvider = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    loadPosts();
  }, []);
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem("saborea_posts", JSON.stringify(posts));
    }
  }, [posts]);
  const loadPosts = () => {
    setIsLoading(true);
    try {
      const savedPosts = localStorage.getItem("saborea_posts");
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(parsedPosts);
      } else {
        const mockPosts = [
          {
            id: "1",
            userId: "rest1",
            userName: "Pollo Campestre",
            userAvatar: "",
            userType: "restaurante",
            content: "Incre\xEDble experiencia gastron\xF3mica, excelente servicio y ambiente acogedor.",
            images: [],
            restaurantName: "Pollo Campestre",
            location: "Centro Hist\xF3rico",
            rating: 5,
            likes: ["user1", "user2"],
            comments: [
              {
                id: "c1",
                userId: "user1",
                userName: "Mar\xEDa Gonz\xE1lez",
                userAvatar: "",
                content: "\xA1Me encanta este lugar! Siempre vuelvo.",
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1e3).toISOString()
              }
            ],
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1e3).toISOString(),
            isVerified: true
          },
          {
            id: "2",
            userId: "rest2",
            userName: "Mix de la Casa",
            userAvatar: "",
            userType: "restaurante",
            content: "Un lugar que lo tiene todo\u2014buena comida, buen ambiente y gente genial atendi\xE9ndote.",
            images: [],
            restaurantName: "Mix de la Casa",
            location: "Polanco",
            rating: 5,
            likes: ["user3"],
            comments: [],
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1e3).toISOString(),
            isVerified: true
          }
        ];
        setPosts(mockPosts);
        localStorage.setItem("saborea_posts", JSON.stringify(mockPosts));
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const createPost = (postData) => {
    if (!user) return;
    const newPost = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userType: user.type,
      likes: [],
      comments: [],
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isVerified: user.type === "restaurante",
      ...postData
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  const likePost = (postId) => {
    if (!user) return;
    setPosts(
      (prevPosts) => prevPosts.map((post) => {
        if (post.id === postId) {
          const hasLiked = post.likes.includes(user.id);
          return {
            ...post,
            likes: hasLiked ? post.likes.filter((id) => id !== user.id) : [...post.likes, user.id]
          };
        }
        return post;
      })
    );
  };
  const addComment = (postId, content) => {
    if (!user || !content.trim()) return;
    const newComment = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content: content.trim(),
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    setPosts(
      (prevPosts) => prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };
  const deletePost = (postId) => {
    if (!user) return;
    setPosts(
      (prevPosts) => prevPosts.filter((post) => {
        if (post.id === postId) {
          return post.userId !== user.id;
        }
        return true;
      })
    );
  };
  const getUserPosts = (userId) => {
    return posts.filter((post) => post.userId === userId);
  };
  const getRestaurantPosts = (restaurantName) => {
    return posts.filter(
      (post) => post.restaurantName?.toLowerCase().includes(restaurantName.toLowerCase())
    );
  };
  return <PostsContext.Provider value={{
    posts,
    createPost,
    likePost,
    addComment,
    deletePost,
    getUserPosts,
    getRestaurantPosts,
    isLoading
  }}>{children}</PostsContext.Provider>;
};
export {
  PostsProvider,
  usePosts
};
