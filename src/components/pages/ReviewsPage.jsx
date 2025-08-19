import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Calendar,
  Search,
  Filter,
  Heart,
  MessageCircle,
  Share2,
  Edit3,
  Trash2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const ReviewsPage = () => {
  const { user } = useAuth();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const mockReviews = [
    {
      id: 1,
      restaurant: "La Cocina del Chef",
      rating: 5,
      content: "Excelente experiencia culinaria. El ambiente es acogedor y la comida deliciosa. Definitivamente volver\xE9.",
      date: "2024-01-15",
      likes: 12,
      comments: 3,
      location: "Centro Hist\xF3rico",
      images: ["/api/placeholder/200/150"]
    },
    {
      id: 2,
      restaurant: "Mariscos del Puerto",
      rating: 4,
      content: "Muy buena comida de mar. El salm\xF3n estaba perfecto y el servicio fue r\xE1pido.",
      date: "2024-01-10",
      likes: 8,
      comments: 1,
      location: "Puerto Viejo",
      images: []
    }
  ];
  return <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{
    /* Header */
  }<div className="flex items-center justify-between mb-8"><div><h1 className="text-3xl font-bold text-foreground mb-2">{user?.type === "restaurante" ? "Rese\xF1as Recibidas" : "Mis Rese\xF1as"}</h1><p className="text-muted-foreground">{user?.type === "restaurante" ? "Gestiona las rese\xF1as de tu restaurante" : "Comparte tus experiencias gastron\xF3micas"}</p></div>{user?.type !== "restaurante" && <Button
    onClick={() => setShowWriteReview(!showWriteReview)}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  >{showWriteReview ? "Cancelar" : "Escribir Rese\xF1a"}</Button>}</div>{
    /* Write Review Form */
  }{showWriteReview && user?.type !== "restaurante" && <Card className="bg-card border-border mb-8"><CardHeader><CardTitle className="text-foreground">Escribir nueva reseña</CardTitle></CardHeader><CardContent className="space-y-6"><div><label className="text-sm font-medium text-foreground mb-2 block">
                Restaurante
              </label><Input
    placeholder="Buscar restaurante..."
    className="bg-secondary border-border text-foreground"
  /></div><div><label className="text-sm font-medium text-foreground mb-2 block">
                Calificación
              </label><div className="flex items-center space-x-1">{[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    onClick={() => setRating(star)}
    onMouseEnter={() => setHoverRating(star)}
    onMouseLeave={() => setHoverRating(0)}
    className="transition-colors"
  ><Star
    className={`h-8 w-8 ${star <= (hoverRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
  /></button>)}<span className="ml-2 text-sm text-muted-foreground">{rating > 0 && `${rating} de 5 estrellas`}</span></div></div><div><label className="text-sm font-medium text-foreground mb-2 block">
                Tu experiencia
              </label><Textarea
    placeholder="Comparte tu experiencia en este restaurante..."
    rows={4}
    className="bg-secondary border-border text-foreground"
  /></div><div className="flex justify-end space-x-4"><Button
    variant="outline"
    onClick={() => setShowWriteReview(false)}
    className="border-border text-foreground hover:bg-secondary"
  >
                Cancelar
              </Button><Button className="bg-primary hover:bg-primary-hover text-primary-foreground">
                Publicar Reseña
              </Button></div></CardContent></Card>}{
    /* Filters */
  }<div className="flex flex-col sm:flex-row gap-4 mb-8"><div className="flex-1 relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input
    placeholder="Buscar reseñas..."
    className="pl-10 bg-secondary border-border text-foreground"
  /></div><Button variant="outline" className="border-border text-foreground hover:bg-secondary"><Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button></div>{
    /* Reviews List */
  }<div className="space-y-6">{mockReviews.map((review) => <Card key={review.id} className="bg-card border-border"><CardContent className="p-6">{
    /* Review Header */
  }<div className="flex items-start justify-between mb-4"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={user?.avatar} /><AvatarFallback className="bg-primary text-primary-foreground">{user?.name?.charAt(0) || "U"}</AvatarFallback></Avatar><div><h3 className="font-semibold text-foreground">{user?.name}</h3><div className="flex items-center space-x-2 text-sm text-muted-foreground"><span>{review.restaurant}</span><span>•</span><MapPin className="h-3 w-3" /><span>{review.location}</span></div></div></div><div className="flex items-center space-x-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString("es-ES")}</span>{user?.type !== "restaurante" && <div className="flex space-x-1 ml-4"><Button variant="ghost" size="icon" className="h-8 w-8"><Edit3 className="h-4 w-4 text-muted-foreground" /></Button><Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button></div>}</div></div>{
    /* Rating */
  }<div className="flex items-center space-x-1 mb-4">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`h-5 w-5 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
  />)}<span className="ml-2 text-sm text-muted-foreground">{review.rating} de 5 estrellas
                </span></div>{
    /* Content */
  }<p className="text-foreground mb-4">{review.content}</p>{
    /* Images */
  }{review.images.length > 0 && <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">{review.images.map((image, index) => <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center"><span className="text-muted-foreground text-sm">Imagen {index + 1}</span></div>)}</div>}{
    /* Actions */
  }<div className="flex items-center justify-between pt-4 border-t border-border"><div className="flex items-center space-x-6"><button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"><Heart className="h-5 w-5" /><span className="text-sm">{review.likes}</span></button><button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"><MessageCircle className="h-5 w-5" /><span className="text-sm">{review.comments}</span></button><button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-5 w-5" /><span className="text-sm">Compartir</span></button></div>{user?.type === "restaurante" && <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary">
                    Responder
                  </Button>}</div>{
    /* Restaurant Response (for restaurant type users) */
  }{user?.type === "restaurante" && <div className="mt-4 p-4 bg-secondary rounded-lg"><div className="flex items-center space-x-2 mb-2"><Badge className="bg-primary text-primary-foreground text-xs">
                      Respuesta del restaurante
                    </Badge></div><p className="text-sm text-foreground">
                    ¡Gracias por tu visita! Nos alegra saber que disfrutaste tu experiencia. 
                    Te esperamos pronto de nuevo.
                  </p></div>}</CardContent></Card>)}</div>{
    /* Empty State */
  }{mockReviews.length === 0 && <div className="text-center py-12"><Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold text-foreground mb-2">{user?.type === "restaurante" ? "No hay rese\xF1as a\xFAn" : "No has escrito rese\xF1as"}</h3><p className="text-muted-foreground mb-6">{user?.type === "restaurante" ? "Las rese\xF1as de los clientes aparecer\xE1n aqu\xED" : "Comparte tu primera experiencia gastron\xF3mica"}</p>{user?.type !== "restaurante" && <Button
    onClick={() => setShowWriteReview(true)}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  >
              Escribir primera reseña
            </Button>}</div>}</div>;
};
export {
  ReviewsPage
};
