import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Camera,
  MapPin,
  ImageIcon,
  X
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { useToast } from "../../hooks/use-toast";
const CreatePost = ({
  onClose,
  isExpanded = false,
  onExpand
}) => {
  const { user } = useAuth();
  const { createPost } = usePosts();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "El contenido del post no puede estar vac\xEDo",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const postData = {
        content: content.trim(),
        ...restaurantName && { restaurantName: restaurantName.trim() },
        ...location && { location: location.trim() },
        ...rating > 0 && { rating }
      };
      createPost(postData);
      setContent("");
      setRestaurantName("");
      setLocation("");
      setRating(0);
      setHoverRating(0);
      toast({
        title: "\xA1Post creado!",
        description: "Tu publicaci\xF3n se ha compartido exitosamente"
      });
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo crear el post. Int\xE9ntalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!user) return null;
  if (!isExpanded) {
    return <Card className="bg-card border-border mb-6"><CardContent className="p-4"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={user.avatar} /><AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback></Avatar><button
      onClick={onExpand}
      className="flex-1 text-left px-4 py-2 bg-secondary rounded-full text-muted-foreground hover:bg-secondary/80 transition-colors"
    >
              ¿Qué estás comiendo hoy?
            </button></div></CardContent></Card>;
  }
  return <Card className="bg-card border-border mb-6"><CardContent className="p-6"><form onSubmit={handleSubmit} className="space-y-4">{
    /* Header */
  }<div className="flex items-center justify-between"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={user.avatar} /><AvatarFallback className="bg-primary text-primary-foreground">{user.name.charAt(0)}</AvatarFallback></Avatar><div><h3 className="font-semibold text-foreground">{user.name}</h3><div className="flex items-center space-x-1"><Badge variant="secondary" className="text-xs">{user.type === "restaurante" ? "Restaurante" : "Foodie"}</Badge>{user.type === "restaurante" && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div></div></div>{onClose && <Button
    type="button"
    variant="ghost"
    size="icon"
    onClick={onClose}
    className="h-8 w-8"
  ><X className="h-4 w-4" /></Button>}</div>{
    /* Content */
  }<Textarea
    placeholder="Comparte tu experiencia gastronómica..."
    value={content}
    onChange={(e) => setContent(e.target.value)}
    rows={4}
    className="bg-secondary border-border text-foreground resize-none"
    required
  />{
    /* Restaurant and Location */
  }<div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input
    placeholder="¿En qué restaurante?"
    value={restaurantName}
    onChange={(e) => setRestaurantName(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground"
  /></div><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input
    placeholder="Ubicación"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="pl-10 bg-secondary border-border text-foreground"
  /></div></div>{
    /* Rating */
  }{restaurantName && <div className="space-y-2"><label className="text-sm font-medium text-foreground">
                Califica tu experiencia:
              </label><div className="flex items-center space-x-1">{[1, 2, 3, 4, 5].map((star) => <button
    key={star}
    type="button"
    onClick={() => setRating(star)}
    onMouseEnter={() => setHoverRating(star)}
    onMouseLeave={() => setHoverRating(0)}
    className="transition-colors p-1"
  ><Star
    className={`h-6 w-6 ${star <= (hoverRating || rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
  /></button>)}{rating > 0 && <span className="ml-2 text-sm text-muted-foreground">{rating} de 5 estrellas
                  </span>}</div></div>}{
    /* Actions */
  }<div className="flex items-center justify-between pt-4 border-t border-border"><div className="flex space-x-2"><Button
    type="button"
    variant="ghost"
    size="sm"
    className="text-primary hover:bg-primary/10"
    disabled
  ><Camera className="h-4 w-4 mr-2" />
                Foto
              </Button><Button
    type="button"
    variant="ghost"
    size="sm"
    className="text-primary hover:bg-primary/10"
    disabled
  ><ImageIcon className="h-4 w-4 mr-2" />
                Galería
              </Button></div><div className="flex space-x-2">{onClose && <Button
    type="button"
    variant="outline"
    onClick={onClose}
    disabled={isSubmitting}
  >
                  Cancelar
                </Button>}<Button
    type="submit"
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
    disabled={isSubmitting || !content.trim()}
  >{isSubmitting ? "Publicando..." : "Publicar"}</Button></div></div></form></CardContent></Card>;
};
export {
  CreatePost
};
