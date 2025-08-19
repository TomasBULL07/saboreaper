import { Button } from "@/components/ui/button";
import { UserPlus, UserCheck, UserMinus } from "lucide-react";
import { useFollow } from "../../contexts/FollowContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/use-toast";
const FollowButton = ({
  user: targetUser,
  variant = "default",
  size = "default",
  showText = true,
  className = ""
}) => {
  const { user: currentUser } = useAuth();
  const { followUser, unfollowUser, isFollowing } = useFollow();
  const { toast } = useToast();
  if (!currentUser || targetUser.id === currentUser.id) {
    return null;
  }
  const following = isFollowing(targetUser.id);
  const handleFollow = () => {
    if (following) {
      unfollowUser(targetUser.id);
      toast({
        title: "Dejaste de seguir",
        description: `Ya no sigues a ${targetUser.name}`
      });
    } else {
      followUser(targetUser.id);
      toast({
        title: "\xA1Ahora sigues a este usuario!",
        description: `Comenzaste a seguir a ${targetUser.name}`
      });
    }
  };
  const getButtonContent = () => {
    if (following) {
      return <><UserCheck className="h-4 w-4" />{showText && <span className="ml-2">Siguiendo</span>}</>;
    } else {
      return <><UserPlus className="h-4 w-4" />{showText && <span className="ml-2">Seguir</span>}</>;
    }
  };
  const getButtonVariant = () => {
    if (following) {
      return "outline";
    }
    return variant;
  };
  const getButtonHoverContent = () => {
    if (following) {
      return <><UserMinus className="h-4 w-4" />{showText && <span className="ml-2">Dejar de seguir</span>}</>;
    }
    return getButtonContent();
  };
  return <Button
    onClick={handleFollow}
    variant={getButtonVariant()}
    size={size}
    className={`transition-all duration-200 group ${className} ${following ? "border-border text-foreground hover:border-destructive hover:text-destructive hover:bg-destructive/10" : "bg-primary hover:bg-primary-hover text-primary-foreground"}`}
  ><span className="group-hover:hidden">{getButtonContent()}</span><span className="hidden group-hover:flex items-center">{getButtonHoverContent()}</span></Button>;
};
export {
  FollowButton
};
