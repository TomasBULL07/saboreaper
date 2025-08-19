import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  MessageCircle,
  Share2,
  Star,
  MapPin,
  Clock,
  MoreVertical,
  Send
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { usePosts } from "../../contexts/PostsContext";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
const PostCard = ({ post }) => {
  const { user } = useAuth();
  const { likePost, addComment, deletePost } = usePosts();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  if (!user) return null;
  const hasLiked = post.likes.includes(user.id);
  const canDelete = post.userId === user.id;
  const handleLike = () => {
    likePost(post.id);
  };
  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmittingComment(true);
    try {
      addComment(post.id, newComment);
      setNewComment("");
    } finally {
      setIsSubmittingComment(false);
    }
  };
  const handleDelete = () => {
    if (window.confirm("\xBFEst\xE1s seguro de que quieres eliminar este post?")) {
      deletePost(post.id);
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post de ${post.userName}`,
        text: post.content,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };
  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), {
        addSuffix: true,
        locale: es
      });
    } catch {
      return "hace un momento";
    }
  };
  return <Card className="bg-card border-border overflow-hidden"><CardContent className="p-6">{
    /* Post Header */
  }<div className="flex items-start justify-between mb-4"><div className="flex items-center space-x-3"><Avatar className="h-10 w-10"><AvatarImage src={post.userAvatar} /><AvatarFallback className="bg-primary text-primary-foreground">{post.userName.charAt(0)}</AvatarFallback></Avatar><div className="flex-1"><div className="flex items-center space-x-2"><h3 className="font-semibold text-foreground">{post.userName}</h3>{post.isVerified && <Badge className="bg-primary text-primary-foreground text-xs">✓</Badge>}<Badge variant="secondary" className="text-xs">{post.userType === "restaurante" ? "Restaurante" : "Foodie"}</Badge></div><div className="flex items-center space-x-2 text-sm text-muted-foreground">{post.restaurantName && <><span>en {post.restaurantName}</span>{post.location && <span>•</span>}</>}{post.location && <div className="flex items-center space-x-1"><MapPin className="h-3 w-3" /><span>{post.location}</span></div>}<span>•</span><div className="flex items-center space-x-1"><Clock className="h-3 w-3" /><span>{formatTime(post.createdAt)}</span></div></div></div></div>{canDelete && <DropdownMenu><DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuItem
    onClick={handleDelete}
    className="text-destructive hover:text-destructive"
  >
                  Eliminar post
                </DropdownMenuItem></DropdownMenuContent></DropdownMenu>}</div>{
    /* Post Content */
  }<p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>{
    /* Rating */
  }{post.rating && <div className="flex items-center space-x-1 mb-4">{[1, 2, 3, 4, 5].map((star) => <Star
    key={star}
    className={`h-5 w-5 ${star <= post.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
  />)}<span className="ml-2 text-sm font-medium text-foreground">{post.rating} de 5
            </span></div>}{
    /* Post Images (placeholder) */
  }{post.images && post.images.length > 0 && <div className="bg-muted rounded-lg h-64 mb-4 flex items-center justify-center"><span className="text-muted-foreground">Imágenes del post</span></div>}{
    /* Post Actions */
  }<div className="flex items-center justify-between pt-4 border-t border-border"><div className="flex items-center space-x-6"><button
    onClick={handleLike}
    className={`flex items-center space-x-2 transition-colors ${hasLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-primary"}`}
  ><Heart className={`h-5 w-5 ${hasLiked ? "fill-current" : ""}`} /><span className="text-sm">{post.likes.length}</span></button><button
    onClick={() => setShowComments(!showComments)}
    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
  ><MessageCircle className="h-5 w-5" /><span className="text-sm">{post.comments.length}</span></button><button
    onClick={handleShare}
    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
  ><Share2 className="h-5 w-5" /><span className="text-sm">Compartir</span></button></div></div>{
    /* Comments Section */
  }{showComments && <div className="mt-4 pt-4 border-t border-border space-y-4">{
    /* Existing Comments */
  }{post.comments.map((comment) => <div key={comment.id} className="flex space-x-3"><Avatar className="h-8 w-8"><AvatarImage src={comment.userAvatar} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{comment.userName.charAt(0)}</AvatarFallback></Avatar><div className="flex-1"><div className="bg-secondary rounded-lg px-3 py-2"><p className="font-medium text-foreground text-sm">{comment.userName}</p><p className="text-foreground text-sm">{comment.content}</p></div><p className="text-xs text-muted-foreground mt-1">{formatTime(comment.createdAt)}</p></div></div>)}{
    /* Add Comment */
  }<form onSubmit={handleComment} className="flex space-x-3"><Avatar className="h-8 w-8"><AvatarImage src={user.avatar} /><AvatarFallback className="bg-primary text-primary-foreground text-sm">{user.name.charAt(0)}</AvatarFallback></Avatar><div className="flex-1 flex space-x-2"><Input
    placeholder="Escribe un comentario..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
    className="flex-1 bg-secondary border-border text-foreground"
    disabled={isSubmittingComment}
  /><Button
    type="submit"
    size="icon"
    disabled={isSubmittingComment || !newComment.trim()}
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  ><Send className="h-4 w-4" /></Button></div></form></div>}</CardContent></Card>;
};
export {
  PostCard
};
