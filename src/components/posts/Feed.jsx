import { useState } from "react";
import { usePosts } from "../../contexts/PostsContext";
import { useFollow } from "../../contexts/FollowContext";
import { useAuth } from "../../contexts/AuthContext";
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import { UserCard } from "../follow/UserCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Plus, Users, Heart } from "lucide-react";
const Feed = ({
  userId,
  restaurantName,
  showCreatePost = true,
  feedType = "following"
  // Por defecto mostrar solo seguidos
}) => {
  const { user } = useAuth();
  const { posts, isLoading } = usePosts();
  const { getFollowing, getSuggestedUsers, getSuggestedRestaurants } = useFollow();
  const [showCreatePostExpanded, setShowCreatePostExpanded] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  let displayPosts = posts;
  if (userId) {
    displayPosts = posts.filter((post) => post.userId === userId);
  } else if (restaurantName) {
    displayPosts = posts.filter(
      (post) => post.restaurantName?.toLowerCase().includes(restaurantName.toLowerCase())
    );
  } else if (feedType === "following" && user) {
    const following = getFollowing();
    displayPosts = posts.filter(
      (post) => following.includes(post.userId) || post.userId === user.id
    );
  }
  const sortedPosts = displayPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1e3);
  };
  const handleCreatePostToggle = () => {
    setShowCreatePostExpanded(!showCreatePostExpanded);
  };
  const suggestedUsers = getSuggestedUsers();
  const suggestedRestaurants = getSuggestedRestaurants();
  const hasFollowing = getFollowing().length > 0;
  if (isLoading) {
    return <div className="space-y-6">{[1, 2, 3].map((i) => <div key={i} className="bg-card rounded-lg p-6 animate-pulse"><div className="flex items-center space-x-3 mb-4"><div className="h-10 w-10 bg-muted rounded-full" /><div className="space-y-2"><div className="h-4 bg-muted rounded w-32" /><div className="h-3 bg-muted rounded w-24" /></div></div><div className="space-y-2"><div className="h-4 bg-muted rounded w-full" /><div className="h-4 bg-muted rounded w-3/4" /></div></div>)}</div>;
  }
  return <div className="space-y-6">{
    /* Create Post Section */
  }{showCreatePost && <CreatePost
    isExpanded={showCreatePostExpanded}
    onExpand={handleCreatePostToggle}
    onClose={() => setShowCreatePostExpanded(false)}
  />}{
    /* Feed Header */
  }<div className="flex items-center justify-between"><div><h2 className="text-lg font-semibold text-foreground">{userId ? "Mis Publicaciones" : restaurantName ? `Posts de ${restaurantName}` : feedType === "following" ? "Feed de Seguidos" : "Feed Principal"}</h2><p className="text-sm text-muted-foreground">{sortedPosts.length} publicación{sortedPosts.length !== 1 ? "es" : ""}{feedType === "following" && !userId && !restaurantName && ` \u2022 Siguiendo a ${getFollowing().length} ${getFollowing().length === 1 ? "usuario" : "usuarios"}`}</p></div><div className="flex space-x-2">{!showCreatePost && <Button
    onClick={handleCreatePostToggle}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Plus className="h-4 w-4 mr-2" />
              Nuevo Post
            </Button>}<Button
    variant="outline"
    onClick={handleRefresh}
    disabled={isRefreshing}
    className="border-border text-foreground hover:bg-secondary"
  ><RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /></Button></div></div>{
    /* Posts List */
  }{sortedPosts.length > 0 ? <div className="space-y-6">{sortedPosts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <div className="space-y-6">{
    /* Empty State */
  }<div className="text-center py-12"><div className="mb-4"><div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">{feedType === "following" ? <Users className="h-8 w-8 text-muted-foreground" /> : <Plus className="h-8 w-8 text-muted-foreground" />}</div><h3 className="text-lg font-semibold text-foreground mb-2">{userId ? "No has publicado nada a\xFAn" : restaurantName ? "No hay posts de este restaurante" : feedType === "following" && hasFollowing ? "Tus seguidos no han publicado recientemente" : feedType === "following" && !hasFollowing ? "A\xFAn no sigues a nadie" : "No hay posts en tu feed"}</h3><p className="text-muted-foreground mb-6">{userId ? "Comparte tu primera experiencia gastron\xF3mica" : restaurantName ? "Este restaurante a\xFAn no ha publicado contenido" : feedType === "following" && hasFollowing ? "Mientras tanto, puedes crear tu propio contenido" : feedType === "following" && !hasFollowing ? "Sigue a restaurantes y usuarios para ver sus publicaciones" : "Sigue a restaurantes y usuarios para ver sus publicaciones aqu\xED"}</p></div>{(userId || feedType !== "following" || hasFollowing) && <Button
    onClick={handleCreatePostToggle}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Plus className="h-4 w-4 mr-2" />
                Crear mi primer post
              </Button>}</div>{
    /* Sugerencias si no sigues a nadie */
  }{feedType === "following" && !hasFollowing && <div className="space-y-6">{
    /* Sugerencias de Restaurantes */
  }{suggestedRestaurants.length > 0 && <Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><Heart className="h-5 w-5 mr-2 text-primary" />
                      Restaurantes Sugeridos
                    </CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedRestaurants.slice(0, 3).map((restaurant) => <UserCard
    key={restaurant.id}
    user={restaurant}
    variant="compact"
    showFollowButton={true}
  />)}</div></CardContent></Card>}{
    /* Sugerencias de Usuarios */
  }{suggestedUsers.length > 0 && <Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><Users className="h-5 w-5 mr-2 text-primary" />
                      Usuarios Sugeridos
                    </CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedUsers.slice(0, 3).map((user2) => <UserCard
    key={user2.id}
    user={user2}
    variant="compact"
    showFollowButton={true}
  />)}</div></CardContent></Card>}</div>}</div>}{
    /* Load More Button */
  }{sortedPosts.length >= 10 && <div className="text-center"><Button
    variant="outline"
    className="border-border text-foreground hover:bg-secondary"
  >
            Cargar más posts
          </Button></div>}</div>;
};
export {
  Feed
};
