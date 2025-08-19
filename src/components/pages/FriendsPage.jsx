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
  Users,
  UserPlus,
  UserCheck,
  MessageCircle,
  Filter,
  Heart,
  Clock,
  UserX,
  Send
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const FriendsPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const friends = [
    {
      id: 1,
      name: "Jaimito P\xE9rez",
      username: "@jaimito_food",
      location: "Ciudad de M\xE9xico",
      avatar: "",
      verified: false,
      mutualFriends: 12,
      favoriteRestaurant: "Soda de la esquina",
      joinedDate: "2023-08-15",
      lastActive: "2h",
      status: "online"
    },
    {
      id: 2,
      name: "Juan Domingo",
      username: "@juan_chef",
      location: "Guadalajara",
      avatar: "",
      verified: true,
      mutualFriends: 8,
      favoriteRestaurant: "Chespiritos #9999",
      joinedDate: "2023-06-20",
      lastActive: "1d",
      status: "offline"
    },
    {
      id: 3,
      name: "Mar\xEDa Gonz\xE1lez",
      username: "@maria_eats",
      location: "Monterrey",
      avatar: "",
      verified: false,
      mutualFriends: 5,
      favoriteRestaurant: "Tacos Don Jos\xE9",
      joinedDate: "2023-09-10",
      lastActive: "30m",
      status: "online"
    }
  ];
  const friendRequests = [
    {
      id: 1,
      name: "Carlos Ram\xEDrez",
      username: "@carlos_foodie",
      location: "Puebla",
      avatar: "",
      mutualFriends: 3,
      requestDate: "2024-01-15",
      bio: "Amante de la comida mexicana tradicional"
    },
    {
      id: 2,
      name: "Ana Mart\xEDnez",
      username: "@ana_cuisine",
      location: "Canc\xFAn",
      avatar: "",
      mutualFriends: 7,
      requestDate: "2024-01-14",
      bio: "Explorando sabores del Caribe"
    }
  ];
  const suggestions = [
    {
      id: 1,
      name: "Pedro S\xE1nchez",
      username: "@pedro_gourmet",
      location: "Tijuana",
      avatar: "",
      mutualFriends: 15,
      reason: "Amigos en com\xFAn",
      favoriteRestaurant: "Mariscos El Puerto"
    },
    {
      id: 2,
      name: "Laura Torres",
      username: "@laura_foodblog",
      location: "M\xE9rida",
      avatar: "",
      mutualFriends: 9,
      reason: "Intereses similares",
      favoriteRestaurant: "Cocina Yucateca"
    },
    {
      id: 3,
      name: "Roberto Silva",
      username: "@roberto_chef",
      location: "Oaxaca",
      avatar: "",
      mutualFriends: 6,
      reason: "Misma ubicaci\xF3n",
      favoriteRestaurant: "Sabores Oaxaque\xF1os"
    }
  ];
  const onlineFriends = friends.filter((friend) => friend.status === "online");
  const filteredFriends = friends.filter(
    (friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredSuggestions = suggestions.filter(
    (suggestion) => suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) || suggestion.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Header */
  }<div className="mb-8"><h1 className="text-3xl font-bold text-foreground mb-2">Amigos</h1><p className="text-muted-foreground">
          Conecta con otros amantes de la comida
        </p></div><div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{
    /* Main Content */
  }<div className="lg:col-span-2">{
    /* Search */
  }<div className="flex flex-col sm:flex-row gap-4 mb-6"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    type="text"
    placeholder="Buscar amigos..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground"
  /></div><Button variant="outline" className="border-border text-foreground hover:bg-secondary"><Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button></div>{
    /* Tabs */
  }<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6"><TabsList className="grid w-full grid-cols-3 bg-card border border-border"><TabsTrigger
    value="friends"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  ><Users className="h-4 w-4 mr-2" />
                Amigos ({friends.length})
              </TabsTrigger><TabsTrigger
    value="requests"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  ><UserPlus className="h-4 w-4 mr-2" />
                Solicitudes ({friendRequests.length})
              </TabsTrigger><TabsTrigger
    value="suggestions"
    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
  ><UserCheck className="h-4 w-4 mr-2" />
                Sugerencias
              </TabsTrigger></TabsList><TabsContent value="friends" className="space-y-4 mt-6">{filteredFriends.map((friend) => <Card key={friend.id} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-start space-x-4"><div className="relative"><Avatar className="h-16 w-16"><AvatarImage src={friend.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{friend.name.charAt(0)}</AvatarFallback></Avatar>{friend.status === "online" && <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-card rounded-full" />}</div><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg">{friend.name}</h3>{friend.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}{friend.status === "online" && <Badge className="bg-green-500 text-white text-xs">En línea</Badge>}</div><p className="text-muted-foreground text-sm mb-1">{friend.username}</p><div className="flex flex-wrap gap-2 mb-3 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{friend.location}</span></div><div className="flex items-center space-x-1"><Users className="h-3 w-3" /><span>{friend.mutualFriends} amigos en común</span></div><div className="flex items-center space-x-1"><Heart className="h-3 w-3 text-primary" /><span>Le gusta {friend.favoriteRestaurant}</span></div></div><div className="flex items-center space-x-4 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><Clock className="h-4 w-4" /><span>{friend.status === "online" ? "En l\xEDnea" : `Activo hace ${friend.lastActive}`}</span></div><span>Se unió el {new Date(friend.joinedDate).toLocaleDateString("es-ES")}</span></div></div><div className="flex space-x-2"><Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary"><MessageCircle className="h-4 w-4 mr-2" />
                          Mensaje
                        </Button><Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10"><UserX className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button></div></div></CardContent></Card>)}</TabsContent><TabsContent value="requests" className="space-y-4 mt-6">{friendRequests.map((request) => <Card key={request.id} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-start space-x-4"><Avatar className="h-16 w-16"><AvatarImage src={request.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{request.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><h3 className="font-bold text-foreground text-lg mb-1">{request.name}</h3><p className="text-muted-foreground text-sm mb-1">{request.username}</p><p className="text-muted-foreground text-sm mb-3">{request.bio}</p><div className="flex items-center space-x-4 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{request.location}</span></div><div className="flex items-center space-x-1"><Users className="h-3 w-3" /><span>{request.mutualFriends} amigos en común</span></div><span>
                            Solicitud recibida el {new Date(request.requestDate).toLocaleDateString("es-ES")}</span></div></div><div className="flex space-x-2"><Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground"><UserCheck className="h-4 w-4 mr-2" />
                          Aceptar
                        </Button><Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive/10"><UserX className="h-4 w-4 mr-2" />
                          Rechazar
                        </Button></div></div></CardContent></Card>)}{friendRequests.length === 0 && <div className="text-center py-12"><UserPlus className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">
                    No hay solicitudes pendientes
                  </h3><p className="text-muted-foreground">
                    Las nuevas solicitudes de amistad aparecerán aquí
                  </p></div>}</TabsContent><TabsContent value="suggestions" className="space-y-4 mt-6">{filteredSuggestions.map((suggestion) => <Card key={suggestion.id} className="bg-card border-border"><CardContent className="p-6"><div className="flex items-start space-x-4"><Avatar className="h-16 w-16"><AvatarImage src={suggestion.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{suggestion.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg">{suggestion.name}</h3><Badge variant="secondary" className="text-xs">{suggestion.reason}</Badge></div><p className="text-muted-foreground text-sm mb-3">{suggestion.username}</p><div className="flex flex-wrap gap-2 mb-3 text-sm text-muted-foreground"><div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{suggestion.location}</span></div><div className="flex items-center space-x-1"><Users className="h-3 w-3" /><span>{suggestion.mutualFriends} amigos en común</span></div><div className="flex items-center space-x-1"><Heart className="h-3 w-3 text-primary" /><span>Le gusta {suggestion.favoriteRestaurant}</span></div></div></div><div className="flex space-x-2"><Button size="sm" className="bg-primary hover:bg-primary-hover text-primary-foreground"><Send className="h-4 w-4 mr-2" />
                          Enviar solicitud
                        </Button><Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary"><MessageCircle className="h-4 w-4 mr-2" />
                          Ver perfil
                        </Button></div></div></CardContent></Card>)}</TabsContent></Tabs></div>{
    /* Sidebar */
  }<div className="space-y-6">{
    /* Quick Stats */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Estadísticas</CardTitle></CardHeader><CardContent><div className="space-y-4"><div className="flex items-center justify-between"><span className="text-muted-foreground">Total de amigos</span><span className="font-bold text-foreground">{friends.length}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Amigos en línea</span><span className="font-bold text-green-500">{onlineFriends.length}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Solicitudes pendientes</span><span className="font-bold text-primary">{friendRequests.length}</span></div></div></CardContent></Card>{
    /* Online Friends */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground flex items-center"><div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                Amigos en línea
              </CardTitle></CardHeader><CardContent><div className="space-y-3">{onlineFriends.map((friend) => <div key={friend.id} className="flex items-center space-x-3"><div className="relative"><Avatar className="h-8 w-8"><AvatarImage src={friend.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{friend.name.charAt(0)}</AvatarFallback></Avatar><div className="absolute bottom-0 right-0 h-2 w-2 bg-green-500 border border-card rounded-full" /></div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{friend.name}</p><p className="text-xs text-muted-foreground">
                        En línea
                      </p></div><Button variant="ghost" size="icon" className="h-6 w-6"><MessageCircle className="h-3 w-3" /></Button></div>)}{onlineFriends.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">
                    No hay amigos en línea
                  </p>}</div></CardContent></Card>{
    /* Quick Actions */
  }<Card className="bg-card border-border"><CardHeader><CardTitle className="text-foreground">Acciones rápidas</CardTitle></CardHeader><CardContent><div className="space-y-3"><Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"><UserPlus className="h-4 w-4 mr-2" />
                  Buscar amigos
                </Button><Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary"><Send className="h-4 w-4 mr-2" />
                  Invitar por email
                </Button><Button variant="outline" className="w-full border-border text-foreground hover:bg-secondary"><Users className="h-4 w-4 mr-2" />
                  Sincronizar contactos
                </Button></div></CardContent></Card></div></div></div>;
};
export {
  FriendsPage
};
