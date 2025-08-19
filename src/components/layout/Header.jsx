import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Utensils,
  Search,
  Bell,
  Settings,
  LogOut,
  User,
  Home,
  Users,
  Star,
  Compass,
  ChefHat,
  UtensilsCrossed,
  Menu
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
const Header = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount] = useState(3);
  const clientTabs = [
    { id: "home", label: "HOME", icon: Home },
    { id: "discover", label: "DESCUBRIR", icon: Compass },
    { id: "following", label: "SEGUIDOS", icon: Users },
    { id: "reviews", label: "RESE\xD1AS", icon: Star },
    { id: "friends", label: "AMIGOS", icon: Users }
  ];
  const restaurantTabs = [
    { id: "home", label: "HOME", icon: Home },
    { id: "menu", label: "MEN\xDA", icon: Menu },
    // ← NUEVA PESTAÑA
    { id: "following", label: "SEGUIDOS", icon: Users },
    { id: "friends", label: "AMIGOS", icon: Users },
    { id: "reviews", label: "RESE\xD1AS", icon: Star },
    { id: "metrics", label: "M\xC9TRICAS", icon: ChefHat }
    // ← RENOMBRADO
  ];
  const tabs = user?.type === "restaurante" ? restaurantTabs : clientTabs;
  return <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="flex items-center justify-between h-16">{
    /* Logo */
  }<div className="flex items-center space-x-2"><div className="p-2 bg-primary rounded-lg"><Utensils className="h-6 w-6 text-primary-foreground" /></div><span className="text-xl font-bold text-foreground">SABOREA</span></div>{
    /* Navigation */
  }<nav className="hidden md:flex items-center space-x-1">{tabs.map((tab) => {
    const Icon = tab.icon;
    return <Button
      key={tab.id}
      variant={activeTab === tab.id ? "default" : "ghost"}
      onClick={() => onTabChange(tab.id)}
      className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${activeTab === tab.id ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`}
    ><Icon className="h-4 w-4 mr-2" />{tab.label}</Button>;
  })}</nav>{
    /* Search and User Actions */
  }<div className="flex items-center space-x-4">{
    /* Search */
  }<div className="relative hidden sm:block"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-64 pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
  /></div>{
    /* Notifications */
  }<div className="relative"><Button
    variant="ghost"
    size="icon"
    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
  ><Bell className="h-5 w-5" />{notificationCount > 0 && <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center bg-primary text-primary-foreground rounded-full border-2 border-card">{notificationCount}</Badge>}</Button></div>{
    /* Settings */
  }<Button
    variant="ghost"
    size="icon"
    className="text-muted-foreground hover:text-primary hover:bg-primary/10"
  ><Settings className="h-5 w-5" /></Button>{
    /* User Menu */
  }<DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" className="relative h-8 w-8 rounded-full"><Avatar className="h-8 w-8"><AvatarImage src={user?.avatar} alt={user?.name} /><AvatarFallback className="bg-primary text-primary-foreground">{user?.name?.charAt(0) || "U"}</AvatarFallback></Avatar></Button></DropdownMenuTrigger><DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount><DropdownMenuLabel className="font-normal"><div className="flex flex-col space-y-1"><p className="text-sm font-medium leading-none text-foreground">{user?.name}</p><p className="text-xs leading-none text-muted-foreground">{user?.email}</p><div className="flex items-center mt-1">{user?.type === "restaurante" ? <UtensilsCrossed className="h-3 w-3 mr-1 text-primary" /> : <User className="h-3 w-3 mr-1 text-primary" />}<span className="text-xs text-primary capitalize">{user?.type}</span></div></div></DropdownMenuLabel><DropdownMenuSeparator className="bg-border" /><DropdownMenuItem
    onClick={() => onTabChange("profile")}
    className="text-foreground hover:bg-secondary"
  ><User className="mr-2 h-4 w-4" /><span>Perfil</span></DropdownMenuItem><DropdownMenuItem className="text-foreground hover:bg-secondary"><Settings className="mr-2 h-4 w-4" /><span>Configuración</span></DropdownMenuItem><DropdownMenuSeparator className="bg-border" /><DropdownMenuItem
    onClick={logout}
    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
  ><LogOut className="mr-2 h-4 w-4" /><span>Cerrar sesión</span></DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></div></div></header>;
};
export {
  Header
};
