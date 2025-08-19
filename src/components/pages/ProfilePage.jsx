import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  Phone,
  Globe,
  Heart,
  Star,
  Camera,
  Edit3,
  Calendar,
  Plus
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { Feed } from "../posts/Feed";
import { CreatePost } from "../posts/CreatePost";
const ProfilePage = () => {
  const { user } = useAuth();
  const { getUserPosts } = usePosts();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const userPosts = user ? getUserPosts(user.id) : [];
  const suggestedFriends = [
    { name: "Jaimito P\xE9rez", restaurant: "Soda de la esquina", avatar: "" },
    { name: "Juan Domingo", restaurant: "Chespiritos #9999", avatar: "" }
  ];
  const suggestedFood = [
    { name: "Kimchis", cuisine: "Cocina Koreana", avatar: "" },
    { name: "Fonda Azteca", cuisine: "Mexicano", avatar: "" }
  ];
  const ratings = [
    { category: "Sabor", value: 4.5 },
    { category: "Variedad", value: 3.5 },
    { category: "Calidad-Precio", value: 5 },
    { category: "Espera", value: 4 },
    { category: "Atenci\xF3n", value: 5 },
    { category: "Comodidad", value: 3.5 },
    { category: "Accesibilidad", value: 4.5 },
    { category: "Aseo", value: 5 }
  ];
  if (!user) return null;
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Profile Header */
  }<Card className="bg-card border-border mb-8"><div className="relative">{
    /* Cover Photo */
  }<div className="h-48 bg-gradient-to-r from-primary/20 to-primary/40 rounded-t-lg flex items-center justify-center"><span className="text-muted-foreground">Foto de portada</span></div>{
    /* Profile Info */
  }<div className="px-6 pb-6"><div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16"><div className="relative"><Avatar className="h-32 w-32 border-4 border-card"><AvatarImage src={user.avatar} /><AvatarFallback className="text-2xl bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback></Avatar><Button
    size="icon"
    variant="outline"
    className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-card"
  ><Camera className="h-4 w-4" /></Button></div><div className="flex-1 space-y-2"><div className="flex items-center space-x-3"><h1 className="text-2xl font-bold text-foreground">{user.type === "restaurante" ? "RESTAURANTE DEL ABUELITO Y LA ABUELITA" : user.name}</h1><Button
    variant="outline"
    size="icon"
    onClick={() => setIsEditing(!isEditing)}
    className="h-8 w-8"
  ><Edit3 className="h-4 w-4" /></Button></div>{user.type === "restaurante" && <p className="text-muted-foreground italic">
                    "Se lo traemos con cariño y con amor"
                  </p>}<div className="flex flex-wrap gap-4 text-sm text-muted-foreground">{user.type === "restaurante" ? <><div className="flex items-center space-x-1"><Heart className="h-4 w-4 text-primary" /><span>Cocina típica costarricense</span></div><div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>Ubicado en bla bla bla...</span></div><div className="flex items-center space-x-1"><Calendar className="h-4 w-4" /><span>martes a domingo 6 a.m. - 4 p.m.</span></div><div className="flex items-center space-x-1"><Phone className="h-4 w-4" /><span>2222 - 2222</span></div><div className="flex items-center space-x-1"><Globe className="h-4 w-4" /><span className="text-primary">www.abuelos.com</span></div></> : <><div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>Vive en {user.location || "........."}</span></div><div className="flex items-center space-x-1"><MapPin className="h-4 w-4" /><span>Es de {user.location || "........."}</span></div><div className="flex items-center space-x-1"><Heart className="h-4 w-4 text-primary" /><span>Restaurante favorito es {user.favoriteRestaurant || "........."}</span></div></>}</div><div className="flex items-center space-x-4"><div className="flex items-center space-x-2"><span className="font-semibold text-foreground">1,234</span><span className="text-sm text-muted-foreground">Seguidores</span></div><div className="flex items-center space-x-2"><span className="font-semibold text-foreground">567</span><span className="text-sm text-muted-foreground">Siguiendo</span></div><div className="flex items-center space-x-2"><span className="font-semibold text-foreground">{userPosts.length}</span><span className="text-sm text-muted-foreground">Publicaciones</span></div></div></div></div></div></div></Card><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
    /* Main Content */
  }<div className="lg:col-span-2"><Tabs value={activeTab} onValueChange={setActiveTab}><TabsList className="grid w-full grid-cols-3 bg-card border border-border mb-6"><TabsTrigger
    value="posts"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  >
                Publicaciones ({userPosts.length})
              </TabsTrigger><TabsTrigger
    value="reviews"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  >
                Reseñas
              </TabsTrigger><TabsTrigger
    value="photos"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  >
                Fotos
              </TabsTrigger></TabsList><TabsContent value="posts" className="space-y-6 mt-6">{
    /* Create Post Button */
  }<div className="flex justify-between items-center"><h2 className="text-lg font-semibold text-foreground">Mis Publicaciones</h2><Button
    onClick={() => setShowCreatePost(!showCreatePost)}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Plus className="h-4 w-4 mr-2" />
                  Nueva Publicación
                </Button></div>{
    /* Create Post Form */
  }{showCreatePost && <CreatePost
    isExpanded={true}
    onClose={() => setShowCreatePost(false)}
  />}{
    /* User's Posts Feed */
  }<Feed
    userId={user.id}
    showCreatePost={false}
  /></TabsContent><TabsContent value="reviews" className="mt-6">{user.type === "restaurante" && <Card className="bg-card border-border mb-6"><CardHeader><CardTitle className="text-foreground">Calificaciones Recibidas</CardTitle></CardHeader><CardContent><div className="grid grid-cols-2 gap-4">{ratings.map((rating) => <div key={rating.category} className="flex items-center justify-between"><span className="text-sm text-foreground">{rating.category}</span><div className="flex items-center space-x-2"><div className="flex">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`h-4 w-4 ${star <= Math.floor(rating.value) ? "text-yellow-500 fill-yellow-500" : star === Math.ceil(rating.value) ? "text-yellow-500 fill-yellow-500 opacity-50" : "text-muted-foreground"}`}
  />)}</div><span className="text-sm text-muted-foreground">{rating.value}</span></div></div>)}</div><div className="mt-6 text-center"><div className="text-3xl font-bold text-foreground mb-1">4.2</div><div className="text-sm text-muted-foreground">
                        Calificación general
                      </div><div className="text-xs text-muted-foreground">
                        Cantidad de calificaciones: XXXX
                      </div></div></CardContent></Card>}<div className="text-center py-12"><Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">{user.type === "restaurante" ? "Rese\xF1as de clientes" : "Tus rese\xF1as"}</h3><p className="text-muted-foreground">{user.type === "restaurante" ? "Las rese\xF1as de tus clientes aparecer\xE1n aqu\xED" : "Tus rese\xF1as aparecer\xE1n aqu\xED cuando escribas alguna"}</p></div></TabsContent><TabsContent value="photos" className="mt-6"><div className="grid grid-cols-2 md:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center"><span className="text-muted-foreground text-sm">Foto {index + 1}</span></div>)}</div></TabsContent></Tabs></div>{
    /* Sidebar */
  }<div className="space-y-6">{
    /* Suggested Friends */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Amigos sugeridos</CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedFriends.map((friend, index) => <div key={index} className="flex items-center justify-between"><div className="flex items-center space-x-3"><Avatar className="h-8 w-8"><AvatarFallback className="bg-primary text-primary-foreground text-sm">{friend.name.charAt(0)}</AvatarFallback></Avatar><div><p className="text-sm font-medium text-foreground">{friend.name}</p><p className="text-xs text-muted-foreground">{friend.restaurant}</p></div></div><Button size="sm" variant="outline" className="text-xs">
                      Seguir
                    </Button></div>)}</div></CardContent></Card>{
    /* Suggested Food */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Restaurantes sugeridos</CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedFood.map((food, index) => <div key={index} className="flex items-center justify-between"><div className="flex items-center space-x-3"><Avatar className="h-8 w-8"><AvatarFallback className="bg-food-orange text-primary-foreground text-sm">{food.name.charAt(0)}</AvatarFallback></Avatar><div><p className="text-sm font-medium text-foreground">{food.name}</p><div className="flex items-center space-x-1"><Heart className="h-3 w-3 text-primary" /><p className="text-xs text-muted-foreground">{food.cuisine}</p></div></div></div><Button size="sm" variant="outline" className="text-xs">
                      Ver
                    </Button></div>)}</div></CardContent></Card></div></div></div>;
};
export {
  ProfilePage
};
