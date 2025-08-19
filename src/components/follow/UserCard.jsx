import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Users,
  Heart,
  UtensilsCrossed,
  User,
  MessageCircle
} from "lucide-react";
import { FollowButton } from "./FollowButton";
const UserCard = ({
  user,
  variant = "default",
  showFollowButton = true,
  showMessageButton = false,
  className = ""
}) => {
  if (variant === "compact") {
    return <div className={`flex items-center justify-between p-3 ${className}`}><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={user.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{user.name.charAt(0)}</AvatarFallback></Avatar><div><div className="flex items-center space-x-2"><p className="text-sm font-medium text-foreground">{user.name}</p>{user.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><p className="text-xs text-muted-foreground">{user.type === "restaurante" ? user.cuisine : user.username}</p></div></div>{showFollowButton && <FollowButton
      user={user}
      size="sm"
      showText={false}
    />}</div>;
  }
  return <Card className={`bg-card border-border ${className}`}><CardContent className="p-6"><div className="flex items-start space-x-4"><Avatar className="h-16 w-16"><AvatarImage src={user.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-lg">{user.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 min-w-0"><div className="flex items-center space-x-2 mb-1"><h3 className="font-bold text-foreground text-lg truncate">{user.name}</h3>{user.verified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}</div><div className="flex items-center space-x-2 mb-2"><p className="text-muted-foreground text-sm">{user.username}</p><Badge variant="secondary" className="text-xs">{user.type === "restaurante" ? <><UtensilsCrossed className="h-3 w-3 mr-1" />Restaurante</> : <><User className="h-3 w-3 mr-1" />Foodie</>}</Badge></div>{user.bio && <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{user.bio}</p>}<div className="flex flex-wrap gap-2 mb-3 text-sm text-muted-foreground">{user.location && <div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{user.location}</span></div>}{user.cuisine && <div className="flex items-center space-x-1"><Heart className="h-3 w-3 text-primary" /><span>{user.cuisine}</span></div>}</div><div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4"><div className="flex items-center space-x-1"><Users className="h-4 w-4" /><span>{user.followers || 0} seguidores</span></div><div className="flex items-center space-x-1"><span>{user.following || 0} siguiendo</span></div></div></div></div>{
    /* Actions */
  }{(showFollowButton || showMessageButton) && <div className="flex space-x-2 mt-4">{showFollowButton && <FollowButton
    user={user}
    className="flex-1"
  />}{showMessageButton && <Button
    variant="outline"
    className="flex-1 border-border text-foreground hover:bg-secondary"
  ><MessageCircle className="h-4 w-4 mr-2" />
                Mensaje
              </Button>}</div>}</CardContent></Card>;
};
export {
  UserCard
};
