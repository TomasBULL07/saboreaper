import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  UtensilsCrossed,
  X
} from "lucide-react";
import { useRestaurants } from "../../contexts/RestaurantsContext";
import { useFollow } from "../../contexts/FollowContext";
import { FollowButton } from "../follow/FollowButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
const DiscoverPage = () => {
  const {
    restaurants,
    featuredRestaurants,
    searchRestaurants,
    filterRestaurants,
    getAllCuisines,
    getAllLocations,
    isLoading
  } = useRestaurants();
  const { getSuggestedRestaurants } = useFollow();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "rating",
    sortOrder: "desc"
  });
  const cuisines = getAllCuisines();
  const locations = getAllLocations();
  const priceRanges = ["$", "$$", "$$$", "$$$$"];
  useEffect(() => {
    if (restaurants.length > 0) {
      setFilteredRestaurants(restaurants);
    }
  }, [restaurants]);
  useEffect(() => {
    let results = restaurants;
    if (searchQuery.trim()) {
      results = searchRestaurants(searchQuery);
    }
    const hasActiveFilters2 = filters.cuisine || filters.location || filters.priceRange && filters.priceRange.length > 0 || filters.rating;
    if (hasActiveFilters2) {
      results = filterRestaurants(filters);
      if (searchQuery.trim()) {
        const searchResults = searchRestaurants(searchQuery);
        results = results.filter((r) => searchResults.some((sr) => sr.id === r.id));
      }
    }
    if (!filters.sortBy || filters.sortBy === "rating") {
      results = [...results].sort((a, b) => {
        if (filters.sortOrder === "desc") {
          return b.rating - a.rating;
        } else {
          return a.rating - b.rating;
        }
      });
    }
    setFilteredRestaurants(results);
  }, [searchQuery, filters, restaurants, searchRestaurants, filterRestaurants]);
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all-cuisines" || value === "all-locations" ? void 0 : value
      // Limpiar valores "all"
    }));
  };
  const clearFilters = () => {
    setFilters({
      sortBy: "rating",
      sortOrder: "desc"
    });
    setSearchQuery("");
  };
  const hasActiveFilters = () => {
    return filters.cuisine || filters.location || filters.priceRange && filters.priceRange.length > 0 || filters.rating || searchQuery.trim();
  };
  const isRestaurantOpen = (restaurant) => {
    const now = /* @__PURE__ */ new Date();
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayIndex = now.getDay();
    const day = dayNames[dayIndex];
    const currentHours = restaurant.hours[day];
    return currentHours !== "Cerrado";
  };
  if (isLoading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">{[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="bg-card rounded-lg p-6 animate-pulse"><div className="h-32 bg-muted rounded-lg mb-4" /><div className="space-y-2"><div className="h-4 bg-muted rounded w-3/4" /><div className="h-3 bg-muted rounded w-1/2" /><div className="h-3 bg-muted rounded w-2/3" /></div></div>)}</div></div>;
  }
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Header */
  }<div className="mb-8"><h1 className="text-3xl font-bold text-foreground mb-2">Descubrir Restaurantes</h1><p className="text-muted-foreground">
          Encuentra nuevos lugares para disfrutar • {restaurants.length} restaurantes disponibles
        </p></div>{
    /* Search and Filters */
  }<div className="mb-8 space-y-4"><div className="flex flex-col sm:flex-row gap-4"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    type="text"
    placeholder="Buscar restaurantes, cocina, ubicación..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
  /></div><Button
    variant="outline"
    onClick={() => setShowFilters(!showFilters)}
    className="border-border text-foreground hover:bg-secondary"
  ><Filter className="h-4 w-4 mr-2" />
            Filtros
            {hasActiveFilters() && <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                Activos
              </Badge>}</Button></div>{
    /* Filter Panel */
  }{showFilters && <Card className="bg-card border-border"><CardContent className="p-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{
    /* Cuisine Filter */
  }<div><label className="text-sm font-medium text-foreground mb-2 block">
                    Tipo de cocina
                  </label><Select
    value={filters.cuisine || "all-cuisines"}
    onValueChange={(value) => handleFilterChange("cuisine", value)}
  ><SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Todas las cocinas" /></SelectTrigger><SelectContent><SelectItem value="all-cuisines">Todas las cocinas</SelectItem>{cuisines.map((cuisine) => <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>)}</SelectContent></Select></div>{
    /* Location Filter */
  }<div><label className="text-sm font-medium text-foreground mb-2 block">
                    Ubicación
                  </label><Select
    value={filters.location || "all-locations"}
    onValueChange={(value) => handleFilterChange("location", value)}
  ><SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Todas las ubicaciones" /></SelectTrigger><SelectContent><SelectItem value="all-locations">Todas las ubicaciones</SelectItem>{locations.map((location) => <SelectItem key={location} value={location}>{location}</SelectItem>)}</SelectContent></Select></div>{
    /* Price Range Filter */
  }<div><label className="text-sm font-medium text-foreground mb-2 block">
                    Rango de precio
                  </label><div className="flex space-x-1">{priceRanges.map((price) => <Button
    key={price}
    variant={filters.priceRange?.includes(price) ? "default" : "outline"}
    size="sm"
    onClick={() => {
      const currentPrices = filters.priceRange || [];
      const newPrices = currentPrices.includes(price) ? currentPrices.filter((p) => p !== price) : [...currentPrices, price];
      handleFilterChange("priceRange", newPrices.length > 0 ? newPrices : void 0);
    }}
    className="text-xs"
  >{price}</Button>)}</div></div>{
    /* Sort Options */
  }<div><label className="text-sm font-medium text-foreground mb-2 block">
                    Ordenar por
                  </label><Select
    value={`${filters.sortBy}-${filters.sortOrder}`}
    onValueChange={(value) => {
      const [sortBy, sortOrder] = value.split("-");
      handleFilterChange("sortBy", sortBy);
      handleFilterChange("sortOrder", sortOrder);
    }}
  ><SelectTrigger className="bg-secondary border-border"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="rating-desc">Mejor calificación</SelectItem><SelectItem value="reviewsCount-desc">Más reseñas</SelectItem><SelectItem value="name-asc">Nombre A-Z</SelectItem><SelectItem value="name-desc">Nombre Z-A</SelectItem></SelectContent></Select></div></div><div className="flex justify-end mt-4"><Button
    variant="outline"
    onClick={clearFilters}
    className="border-border text-foreground hover:bg-secondary"
  ><X className="h-4 w-4 mr-2" />
                  Limpiar filtros
                </Button></div></CardContent></Card>}</div>{
    /* Featured Restaurants */
  }{!searchQuery && !hasActiveFilters() && featuredRestaurants.length > 0 && <div className="mb-8"><h2 className="text-xl font-bold text-foreground mb-4">Restaurantes Destacados</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{featuredRestaurants.slice(0, 3).map((restaurant) => <Card key={restaurant.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow"><div className="aspect-video bg-muted flex items-center justify-center relative"><UtensilsCrossed className="h-12 w-12 text-muted-foreground" /><Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                    Destacado
                  </Badge></div><CardContent className="p-6"><div className="flex items-start justify-between mb-2"><div className="flex-1"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg line-clamp-1">{restaurant.name}</h3>{restaurant.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><p className="text-sm text-muted-foreground line-clamp-2 mb-2">{restaurant.description}</p></div></div><div className="space-y-2 mb-4"><div className="flex items-center space-x-2 text-sm"><Badge variant="secondary" className="text-xs">{restaurant.cuisine}</Badge><span className="text-muted-foreground">{restaurant.priceRange}</span>{isRestaurantOpen(restaurant) ? <div className="flex items-center space-x-1 text-xs text-green-600"><Clock className="h-3 w-3" /><span>Abierto</span></div> : <div className="flex items-center space-x-1 text-xs text-red-600"><Clock className="h-3 w-3" /><span>Cerrado</span></div>}</div><div className="flex items-center space-x-1 text-sm"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-muted-foreground">{restaurant.location}</span></div><div className="flex items-center space-x-2"><div className="flex items-center space-x-1">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`h-4 w-4 ${star <= Math.floor(restaurant.rating) ? "text-yellow-500 fill-yellow-500" : star === Math.ceil(restaurant.rating) ? "text-yellow-500 fill-yellow-500 opacity-50" : "text-muted-foreground"}`}
  />)}</div><span className="text-sm font-medium text-foreground">{restaurant.rating}</span><span className="text-sm text-muted-foreground">
                        ({restaurant.reviewsCount} reseñas)
                      </span></div></div><div className="flex space-x-2"><Button className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground">
                      Ver Restaurante
                    </Button><FollowButton
    user={{
      id: restaurant.id,
      name: restaurant.name,
      username: restaurant.slug,
      type: "restaurante",
      verified: restaurant.verified,
      bio: restaurant.description,
      location: restaurant.location,
      cuisine: restaurant.cuisine
    }}
    size="default"
    showText={false}
  /></div></CardContent></Card>)}</div></div>}{
    /* Restaurant Grid */
  }<div className="mb-8"><div className="flex items-center justify-between mb-4"><h2 className="text-xl font-bold text-foreground">{searchQuery ? `Resultados para "${searchQuery}"` : hasActiveFilters() ? "Restaurantes Filtrados" : "Todos los Restaurantes"}</h2><span className="text-sm text-muted-foreground">{filteredRestaurants.length} restaurante{filteredRestaurants.length !== 1 ? "s" : ""}</span></div>{filteredRestaurants.length > 0 ? <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">{filteredRestaurants.map((restaurant) => <Card key={restaurant.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow"><div className="aspect-video bg-muted flex items-center justify-center"><UtensilsCrossed className="h-12 w-12 text-muted-foreground" /></div><CardContent className="p-6"><div className="flex items-start justify-between mb-2"><div className="flex-1"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg line-clamp-1">{restaurant.name}</h3>{restaurant.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><p className="text-sm text-muted-foreground line-clamp-2 mb-2">{restaurant.description}</p></div></div><div className="space-y-2 mb-4"><div className="flex items-center space-x-2 text-sm"><Badge variant="secondary" className="text-xs">{restaurant.cuisine}</Badge><span className="text-muted-foreground">{restaurant.priceRange}</span>{isRestaurantOpen(restaurant) ? <div className="flex items-center space-x-1 text-xs text-green-600"><Clock className="h-3 w-3" /><span>Abierto</span></div> : <div className="flex items-center space-x-1 text-xs text-red-600"><Clock className="h-3 w-3" /><span>Cerrado</span></div>}</div><div className="flex items-center space-x-1 text-sm"><MapPin className="h-3 w-3 text-muted-foreground" /><span className="text-muted-foreground">{restaurant.location}</span></div><div className="flex items-center space-x-2"><div className="flex items-center space-x-1">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`h-4 w-4 ${star <= Math.floor(restaurant.rating) ? "text-yellow-500 fill-yellow-500" : star === Math.ceil(restaurant.rating) ? "text-yellow-500 fill-yellow-500 opacity-50" : "text-muted-foreground"}`}
  />)}</div><span className="text-sm font-medium text-foreground">{restaurant.rating}</span><span className="text-sm text-muted-foreground">
                        ({restaurant.reviewsCount} reseñas)
                      </span></div></div><div className="flex space-x-2"><Button className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground">
                      Ver Restaurante
                    </Button><FollowButton
    user={{
      id: restaurant.id,
      name: restaurant.name,
      username: restaurant.slug,
      type: "restaurante",
      verified: restaurant.verified,
      bio: restaurant.description,
      location: restaurant.location,
      cuisine: restaurant.cuisine
    }}
    size="default"
    showText={false}
  /></div></CardContent></Card>)}</div> : <div className="text-center py-12"><div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4"><Search className="h-8 w-8 text-muted-foreground" /></div><h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron restaurantes
            </h3><p className="text-muted-foreground mb-6">{hasActiveFilters() ? "No hay restaurantes que coincidan con tus filtros. Intenta ajustar los criterios de b\xFAsqueda." : "No hay restaurantes disponibles en este momento."}</p>{hasActiveFilters() && <Button
    onClick={clearFilters}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  >
                Limpiar filtros
              </Button>}</div>}</div>{
    /* Load More Button (for future pagination) */
  }{filteredRestaurants.length >= 20 && <div className="text-center"><Button
    variant="outline"
    className="border-border text-foreground hover:bg-secondary"
  >
            Cargar más restaurantes
          </Button></div>}</div>;
};
export {
  DiscoverPage
};
