import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Clock,
  DollarSign,
  UtensilsCrossed,
  TrendingUp,
  AlertTriangle,
  Leaf,
  Wheat
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";
import { AddMenuItemForm } from "../menu/AddMenuItemForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
const MenuPage = () => {
  const { user } = useAuth();
  const {
    getMenuByRestaurant,
    getMenuStats,
    deleteMenuItem,
    toggleAvailability,
    toggleFeatured,
    searchMenuItems
  } = useMenu();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all-categories");
  const [filterStatus, setFilterStatus] = useState("all-status");
  if (!user || user.type !== "restaurante") {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-center"><h1 className="text-2xl font-bold text-foreground mb-4">
          Acceso Restringido
        </h1><p className="text-muted-foreground">
          Esta sección está disponible solo para restaurantes.
        </p></div>;
  }
  const menuItems = getMenuByRestaurant(user.id);
  const stats = getMenuStats(user.id);
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()) || item.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === "all-categories" || item.category === filterCategory;
    const matchesStatus = filterStatus === "all-status" || filterStatus === "available" && item.available || filterStatus === "unavailable" && !item.available || filterStatus === "featured" && item.featured;
    return matchesSearch && matchesCategory && matchesStatus;
  });
  const categories = [
    { value: "all-categories", label: "Todas las categor\xEDas" },
    { value: "entrada", label: "Entradas" },
    { value: "plato-principal", label: "Platos Principales" },
    { value: "postre", label: "Postres" },
    { value: "bebida", label: "Bebidas" },
    { value: "especial", label: "Especialidades" }
  ];
  const statusOptions = [
    { value: "all-status", label: "Todos los estados" },
    { value: "available", label: "Disponibles" },
    { value: "unavailable", label: "No disponibles" },
    { value: "featured", label: "Destacados" }
  ];
  const categoryLabels = {
    "entrada": "Entrada",
    "plato-principal": "Plato Principal",
    "postre": "Postre",
    "bebida": "Bebida",
    "especial": "Especialidad"
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0
    }).format(price);
  };
  const handleEdit = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };
  const handleDelete = (itemId) => {
    deleteMenuItem(itemId);
  };
  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };
  const spicyIcons = ["", "\u{1F336}\uFE0F", "\u{1F336}\uFE0F\u{1F336}\uFE0F", "\u{1F336}\uFE0F\u{1F336}\uFE0F\u{1F336}\uFE0F"];
  if (showAddForm) {
    return <div className="max-w-full mx-auto px-4 py-8"><AddMenuItemForm
      onClose={handleCloseForm}
      editItem={editingItem || void 0}
    /></div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Header */
  }<div className="flex items-center justify-between mb-8"><div><h1 className="text-3xl font-bold text-foreground mb-2">Gestión del Menú</h1><p className="text-muted-foreground">
            Administra los platillos de tu restaurante
          </p></div><Button
    onClick={() => setShowAddForm(true)}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Plus className="h-4 w-4 mr-2" />
          Agregar Platillo
        </Button></div>{
    /* Stats Cards */
  }<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><Card className="bg-card border-border"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Total Platillos</p><div className="flex items-center space-x-2"><span className="text-2xl font-bold text-foreground">{stats.totalItems}</span></div></div><UtensilsCrossed className="h-8 w-8 text-primary" /></div></CardContent></Card><Card className="bg-card border-border"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Disponibles</p><div className="flex items-center space-x-2"><span className="text-2xl font-bold text-green-500">{stats.activeItems}</span></div></div><Eye className="h-8 w-8 text-green-500" /></div></CardContent></Card><Card className="bg-card border-border"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Destacados</p><div className="flex items-center space-x-2"><span className="text-2xl font-bold text-yellow-500">{stats.featuredItems}</span></div></div><Star className="h-8 w-8 text-yellow-500" /></div></CardContent></Card><Card className="bg-card border-border"><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground mb-1">Precio Promedio</p><div className="flex items-center space-x-2"><span className="text-2xl font-bold text-primary">
                    ₡{Math.round(stats.averagePrice).toLocaleString()}</span></div></div><DollarSign className="h-8 w-8 text-primary" /></div></CardContent></Card></div>{
    /* Filters */
  }<div className="flex flex-col sm:flex-row gap-4 mb-6"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    placeholder="Buscar platillos..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground"
  /></div><Select value={filterCategory} onValueChange={setFilterCategory}><SelectTrigger className="w-full sm:w-48 bg-secondary border-border"><SelectValue placeholder="Categoría" /></SelectTrigger><SelectContent>{categories.map((cat) => <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>)}</SelectContent></Select><Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-full sm:w-48 bg-secondary border-border"><SelectValue placeholder="Estado" /></SelectTrigger><SelectContent>{statusOptions.map((status) => <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>)}</SelectContent></Select></div>{
    /* Menu Items */
  }{filteredItems.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{filteredItems.map((item) => <Card key={item.id} className="bg-card border-border overflow-hidden"><CardContent className="p-6"><div className="flex justify-between items-start mb-4"><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-2"><h3 className="font-bold text-foreground text-lg truncate">{item.name}</h3>{item.featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}{!item.available && <EyeOff className="h-4 w-4 text-muted-foreground" />}</div><div className="flex items-center space-x-2 mb-2"><Badge variant="secondary" className="text-xs">{categoryLabels[item.category]}</Badge><span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>{item.spicyLevel > 0 && <span className="text-sm">{spicyIcons[item.spicyLevel]}</span>}</div></div><div className="flex space-x-2 ml-4"><Button
    variant="ghost"
    size="icon"
    onClick={() => toggleAvailability(item.id)}
    className="h-8 w-8"
    title={item.available ? "Ocultar platillo" : "Mostrar platillo"}
  >{item.available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}</Button><Button
    variant="ghost"
    size="icon"
    onClick={() => toggleFeatured(item.id)}
    className="h-8 w-8"
    title={item.featured ? "Quitar de destacados" : "Marcar como destacado"}
  ><Star className={`h-4 w-4 ${item.featured ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} /></Button><Button
    variant="ghost"
    size="icon"
    onClick={() => handleEdit(item)}
    className="h-8 w-8"
  ><Edit3 className="h-4 w-4" /></Button><AlertDialog><AlertDialogTrigger asChild><Button
    variant="ghost"
    size="icon"
    className="h-8 w-8 text-destructive hover:text-destructive"
  ><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>¿Eliminar platillo?</AlertDialogTitle><AlertDialogDescription>
                            Esta acción no se puede deshacer. El platillo "{item.name}" será eliminado permanentemente del menú.
                          </AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction
    onClick={() => handleDelete(item.id)}
    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
  >
                            Eliminar
                          </AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></div></div><p className="text-muted-foreground text-sm mb-3 line-clamp-2">{item.description}</p><div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3"><div className="flex items-center space-x-1"><Clock className="h-3 w-3" /><span>{item.preparationTime} min</span></div>{item.calories && item.calories > 0 && <div className="flex items-center space-x-1"><TrendingUp className="h-3 w-3" /><span>{item.calories} cal</span></div>}</div>{
    /* Características dietéticas */
  }<div className="flex flex-wrap gap-1 mb-3">{item.isVegetarian && <Badge variant="outline" className="text-xs text-green-600 border-green-600"><Leaf className="h-3 w-3 mr-1" />
                      Vegetariano
                    </Badge>}{item.isVegan && <Badge variant="outline" className="text-xs text-green-700 border-green-700"><Leaf className="h-3 w-3 mr-1" />
                      Vegano
                    </Badge>}{item.isGlutenFree && <Badge variant="outline" className="text-xs text-amber-600 border-amber-600"><Wheat className="h-3 w-3 mr-1" />
                      Sin gluten
                    </Badge>}</div>{
    /* Ingredientes */
  }{item.ingredients.length > 0 && <div className="mb-3"><p className="text-xs text-muted-foreground mb-1">Ingredientes:</p><div className="flex flex-wrap gap-1">{item.ingredients.slice(0, 4).map((ingredient, index) => <Badge key={index} variant="secondary" className="text-xs">{ingredient}</Badge>)}{item.ingredients.length > 4 && <Badge variant="secondary" className="text-xs">
                          +{item.ingredients.length - 4} más
                        </Badge>}</div></div>}{
    /* Alérgenos */
  }{item.allergens.length > 0 && <div className="flex flex-wrap gap-1">{item.allergens.map((allergen, index) => <Badge key={index} variant="destructive" className="text-xs"><AlertTriangle className="h-3 w-3 mr-1" />{allergen}</Badge>)}</div>}</CardContent></Card>)}</div> : <div className="text-center py-12"><UtensilsCrossed className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">{menuItems.length === 0 ? "No hay platillos en el men\xFA" : "No se encontraron platillos"}</h3><p className="text-muted-foreground mb-6">{menuItems.length === 0 ? "Comienza agregando tu primer platillo al men\xFA" : "Intenta ajustar los filtros de b\xFAsqueda"}</p>{menuItems.length === 0 && <Button
    onClick={() => setShowAddForm(true)}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Plus className="h-4 w-4 mr-2" />
              Agregar Primer Platillo
            </Button>}</div>}</div>;
};
export {
  MenuPage
};
