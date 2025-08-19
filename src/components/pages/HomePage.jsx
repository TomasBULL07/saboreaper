import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Star,
  Users,
  TrendingUp,
  Plus,
  UtensilsCrossed,
  Menu
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { useFollow } from "../../contexts/FollowContext";
import { useMenu } from "../../contexts/MenuContext";
import { Feed } from "../posts/Feed";
import { UserCard } from "../follow/UserCard";
const HomePage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { posts } = usePosts();
  const { getSuggestedUsers, getSuggestedRestaurants, getFollowing } = useFollow();
  const { getMenuStats } = useMenu();
  const suggestedFriends = getSuggestedUsers().slice(0, 2);
  const suggestedRestaurants = getSuggestedRestaurants().slice(0, 2);
  const menuStats = user?.type === "restaurante" ? getMenuStats(user.id) : null;
  const restaurantMetrics = [
    {
      label: "Total de likes en publicaciones",
      value: posts.reduce((acc, post) => acc + post.likes.length, 0).toString(),
      period: "Total"
    },
    {
      label: "Total de posts publicados",
      value: posts.filter((post) => post.userId === user?.id).length.toString(),
      period: "Total"
    },
    {
      label: "Platillos en el men\xFA",
      // ← NUEVA MÉTRICA
      value: menuStats?.totalItems.toString() || "0",
      period: `${menuStats?.activeItems || 0} disponibles`
    }
  ];
  const topDishes = [
    { name: "Pasta Carbonara", likes: 145 },
    { name: "Salm\xF3n a la Plancha", likes: 132 },
    { name: "Risotto de Hongos", likes: 98 },
    { name: "Filete Wellington", likes: 87 },
    { name: "Paella Valenciana", likes: 76 }
  ];
  const handleNavigateToMenu = () => {
    if (onNavigate) {
      onNavigate("menu");
    } else {
      window.location.hash = "#menu";
    }
  };
  if (user?.type === "restaurante") {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="mb-8"><h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1><p className="text-muted-foreground">Resumen de tu actividad en Saborea</p></div>{
      /* Metrics Grid */
    }<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">{restaurantMetrics.map((metric, index) => <Card key={index} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">{metric.label}</p><div className="flex items-center space-x-2"><span className="text-2xl font-bold text-foreground">{metric.value}</span><Badge variant="secondary" className="text-xs">{metric.period}</Badge></div></div><TrendingUp className="h-8 w-8 text-primary" /></div></CardContent></Card>)}</div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
      /* Feed Principal */
    }<div className="lg:col-span-2"><h2 className="text-xl font-bold text-foreground mb-6">Mis Publicaciones</h2><Feed userId={user.id} /></div>{
      /* Sidebar */
    }<div className="space-y-6">{
      /* Menu Stats */
    }{menuStats && <Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><UtensilsCrossed className="h-5 w-5 mr-2 text-primary" />
                    Resumen del Menú
                  </CardTitle></CardHeader><CardContent><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-muted-foreground">Total de platillos</span><span className="font-bold text-foreground">{menuStats.totalItems}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Disponibles</span><span className="font-bold text-green-500">{menuStats.activeItems}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Destacados</span><span className="font-bold text-yellow-500">{menuStats.featuredItems}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Precio promedio</span><span className="font-bold text-primary">
                        ₡{Math.round(menuStats.averagePrice).toLocaleString()}</span></div></div></CardContent></Card>}{
      /* Top Dishes */
    }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Platillos con más likes</CardTitle></CardHeader><CardContent><div className="space-y-4">{topDishes.map((dish, index) => <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg"><span className="text-foreground font-medium">{dish.name}</span><div className="flex items-center space-x-2"><Heart className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{dish.likes}</span></div></div>)}</div></CardContent></Card>{
      /* Quick Actions */
    }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Acciones Rápidas</CardTitle></CardHeader><CardContent><div className="space-y-3"><Button
      onClick={handleNavigateToMenu}
      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
    ><Plus className="h-4 w-4 mr-2" />
                    AGREGAR PLATILLO
                  </Button><Button
      onClick={handleNavigateToMenu}
      className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
    ><Menu className="h-4 w-4 mr-2" />
                    GESTIONAR MENÚ
                  </Button><Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"><Plus className="h-4 w-4 mr-2" />
                    PUBLICAR
                  </Button><Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"><Star className="h-4 w-4 mr-2" />
                    RESPONDER RESEÑAS
                  </Button><Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"><TrendingUp className="h-4 w-4 mr-2" />
                    MÉTRICAS COMPLETAS
                  </Button></div></CardContent></Card></div></div></div>;
  }
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
    /* Main Feed */
  }<div className="lg:col-span-2"><div className="mb-8"><h1 className="text-3xl font-bold text-foreground mb-4">
              Encuentra y comparte experiencias gastronómicas
            </h1><p className="text-lg text-muted-foreground">
              Descubre los mejores restaurantes y comparte tus experiencias culinarias con otras personas.
            </p></div>{
    /* Feed con tipo following para mostrar sugerencias si no sigues a nadie */
  }<Feed feedType="following" /></div>{
    /* Sidebar */
  }<div className="space-y-6">{
    /* Featured Restaurants */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Restaurantes Destacados
              </CardTitle></CardHeader><CardContent><div className="space-y-4">{["Sabores de Casa", "El Saz\xF3n Alegre"].map((restaurant, index) => <div key={index} className="p-4 bg-secondary rounded-lg"><h4 className="font-semibold text-foreground mb-1">{restaurant}</h4><div className="flex items-center space-x-1 mb-2">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className="h-4 w-4 text-yellow-500 fill-yellow-500"
  />)}</div><p className="text-sm text-muted-foreground">{index === 0 ? "Incre\xEDble experiencia gastron\xF3mica, excelente servicio y ambiente acogedor." : "Un lugar que lo tiene todo\u2014buena comida, buen ambiente y gente genial atendi\xE9ndote."}</p></div>)}</div></CardContent></Card>{
    /* Suggested Friends - AHORA CON COMPONENTES REALES */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><Users className="h-5 w-5 mr-2 text-primary" />
                Amigos Sugeridos
              </CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedFriends.map((friend) => <UserCard
    key={friend.id}
    user={friend}
    variant="compact"
    showFollowButton={true}
  />)}{suggestedFriends.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">
                    No hay sugerencias disponibles
                  </p>}</div></CardContent></Card>{
    /* Suggested Restaurants - AHORA CON COMPONENTES REALES */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Restaurantes Sugeridos</CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedRestaurants.map((restaurant) => <UserCard
    key={restaurant.id}
    user={restaurant}
    variant="compact"
    showFollowButton={true}
  />)}{suggestedRestaurants.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">
                    No hay restaurantes sugeridos
                  </p>}</div></CardContent></Card></div></div></div>;
};
export {
  HomePage
};
