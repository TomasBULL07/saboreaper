import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Star,
  Heart,
  UtensilsCrossed,
  User,
  UserMinus,
  MessageCircle,
  Filter,
  TrendingUp,
  Clock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const FollowingPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("restaurants");
  const followedRestaurants = [
    {
      id: 1,
      name: "La Cocina del Chef",
      type: "restaurant",
      cuisine: "Italiana",
      location: "Centro Hist\xF3rico",
      rating: 4.8,
      followers: 1234,
      avatar: "",
      verified: true,
      lastPost: "2h",
      description: "Aut\xE9ntica cocina italiana en el coraz\xF3n de la ciudad"
    },
    {
      id: 2,
      name: "Mariscos del Puerto",
      type: "restaurant",
      cuisine: "Mariscos",
      location: "Puerto Viejo",
      rating: 4.6,
      followers: 892,
      avatar: "",
      verified: true,
      lastPost: "1d",
      description: "Los mejores mariscos frescos del puerto"
    },
    {
      id: 3,
      name: "Sushi Zen",
      type: "restaurant",
      cuisine: "Japonesa",
      location: "Polanco",
      rating: 4.9,
      followers: 2156,
      avatar: "",
      verified: true,
      lastPost: "3h",
      description: "Experiencia aut\xE9ntica de sushi japon\xE9s"
    }
  ];
  const followedUsers = [
    {
      id: 1,
      name: "Mar\xEDa Gonz\xE1lez",
      username: "@maria_foodie",
      type: "user",
      location: "Ciudad de M\xE9xico",
      followers: 456,
      following: 234,
      avatar: "",
      verified: false,
      lastPost: "1h",
      bio: "Explorando los mejores sabores de la ciudad \u{1F37D}\uFE0F"
    },
    {
      id: 2,
      name: "Carlos Ram\xEDrez",
      username: "@carlos_chef",
      type: "user",
      location: "Guadalajara",
      followers: 1289,
      following: 145,
      avatar: "",
      verified: true,
      lastPost: "4h",
      bio: "Chef profesional compartiendo recetas y experiencias"
    }
  ];
  const suggestedFollows = [
    {
      id: 4,
      name: "Tacos El G\xFCero",
      type: "restaurant",
      cuisine: "Mexicana",
      location: "Roma Norte",
      rating: 4.7,
      followers: 567,
      avatar: "",
      verified: false,
      reason: "Popular en tu \xE1rea"
    },
    {
      id: 5,
      name: "Ana Mart\xEDnez",
      username: "@ana_eats",
      type: "user",
      location: "Monterrey",
      followers: 234,
      following: 189,
      avatar: "",
      verified: false,
      reason: "Amigos en com\xFAn"
    }
  ];
  const recentActivity = [
    {
      id: 1,
      user: "La Cocina del Chef",
      action: "public\xF3 una nueva foto",
      time: "2h",
      content: "Pasta carbonara reci\xE9n preparada"
    },
    {
      id: 2,
      user: "Mar\xEDa Gonz\xE1lez",
      action: "escribi\xF3 una rese\xF1a",
      time: "3h",
      content: "Incre\xEDble experiencia en Sushi Zen"
    },
    {
      id: 3,
      user: "Mariscos del Puerto",
      action: "agreg\xF3 un nuevo platillo",
      time: "1d",
      content: "Ceviche de camarones especial"
    }
  ];
  const filteredRestaurants = followedRestaurants.filter(
    (restaurant) => restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) || restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUsers = followedUsers.filter(
    (user2) => user2.name.toLowerCase().includes(searchQuery.toLowerCase()) || user2.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Header */
  }<div className="mb-8"><h1 className="text-3xl font-bold text-foreground mb-2">Seguidos</h1><p className="text-muted-foreground">
          Mantente al día con tus restaurantes y usuarios favoritos
        </p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
    /* Main Content */
  }<div className="lg:col-span-2">{
    /* Search and Filters */
  }<div className="flex flex-col sm:flex-row gap-4 mb-6"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    type="text"
    placeholder="Buscar en tus seguidos..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground"
  /></div><Button variant="outline" className="border-border text-foreground hover:bg-secondary"><Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button></div>{
    /* Tabs */
  }<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6"><TabsList className="grid w-full grid-cols-2 bg-card border border-border"><TabsTrigger
    value="restaurants"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  ><UtensilsCrossed className="h-4 w-4 mr-2" />
                Restaurantes ({followedRestaurants.length})
              </TabsTrigger><TabsTrigger
    value="users"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  ><User className="h-4 w-4 mr-2" />
                Usuarios ({followedUsers.length})
              </TabsTrigger></TabsList><TabsContent value="restaurants" className="space-y-4 mt-6">{filteredRestaurants.map((restaurant) => <Card key={restaurant.id} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-start space-x-4"><Avatar className="h-16 w-16"><AvatarImage src={restaurant.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{restaurant.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg truncate">{restaurant.name}</h3>{restaurant.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><p className="text-muted-foreground text-sm mb-2">{restaurant.description}</p><div className="flex flex-wrap gap-2 mb-3"><Badge variant="secondary" className="text-xs">{restaurant.cuisine}</Badge><div className="flex items-center space-x-1 text-sm text-muted-foreground"><MapPin className="h-3 w-3" /><span>{restaurant.location}</span></div></div><div className="flex items-center space-x-4 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /><span>{restaurant.rating}</span></div><div className="flex items-center space-x-1"><Heart className="h-4 w-4" /><span>{restaurant.followers} seguidores</span></div><div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>Última publicación {restaurant.lastPost}</span></div></div></div><div className="flex space-x-2"><Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary"><MessageCircle className="h-4 w-4 mr-2" />
                          Mensaje
                        </Button><Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10"><UserMinus className="h-4 w-4 mr-2" />
                          Dejar de seguir
                        </Button></div></div></CardContent></Card>)}</TabsContent><TabsContent value="users" className="space-y-4 mt-6">{filteredUsers.map((userItem) => <Card key={userItem.id} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-start space-x-4"><Avatar className="h-16 w-16"><AvatarImage src={userItem.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{userItem.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg">{userItem.name}</h3>{userItem.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><p className="text-muted-foreground text-sm mb-1">{userItem.username}</p><p className="text-muted-foreground text-sm mb-3">{userItem.bio}</p><div className="flex items-center space-x-4 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{userItem.location}</span></div><div className="flex items-center space-x-1"><span>{userItem.followers} seguidores</span></div><div className="flex items-center space-x-1"><span>{userItem.following} siguiendo</span></div><div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>Activo {userItem.lastPost}</span></div></div></div><div className="flex space-x-2"><Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary"><MessageCircle className="h-4 w-4 mr-2" />
                          Mensaje
                        </Button><Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10"><UserMinus className="h-4 w-4 mr-2" />
                          Dejar de seguir
                        </Button></div></div></CardContent></Card>)}</TabsContent></Tabs></div>{
    /* Sidebar */
  }<div className="space-y-6">{
    /* Recent Activity */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Actividad Reciente
              </CardTitle></CardHeader><CardContent><div className="space-y-4">{recentActivity.map((activity) => <div key={activity.id} className="border-b border-border pb-3 last:border-b-0"><div className="flex items-start space-x-2"><div className="flex-1"><p className="text-sm text-foreground"><span className="font-medium">{activity.user}</span>{" "}<span className="text-muted-foreground">{activity.action}</span></p><p className="text-xs text-muted-foreground mt-1">{activity.content}</p><p className="text-xs text-muted-foreground mt-1">{activity.time}</p></div></div></div>)}</div></CardContent></Card>{
    /* Suggestions */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Sugerencias para seguir</CardTitle></CardHeader><CardContent><div className="space-y-4">{suggestedFollows.map((suggestion) => <div key={suggestion.id} className="flex items-center justify-between"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={suggestion.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{suggestion.name.charAt(0)}</AvatarFallback></Avatar><div><p className="text-sm font-medium text-foreground">{suggestion.name}</p><p className="text-xs text-muted-foreground">{suggestion.reason}</p>{suggestion.type === "restaurant" && <div className="flex items-center space-x-1 mt-1"><Star className="h-3 w-3 text-yellow-500 fill-yellow-500" /><span className="text-xs text-muted-foreground">{suggestion.rating}</span></div>}</div></div><Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground text-xs">
                      Seguir
                    </Button></div>)}</div></CardContent></Card></div></div></div>;
};
export {
  FollowingPage
};
