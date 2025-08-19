import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast({
        title: "\xA1Bienvenido!",
        description: "Has iniciado sesi\xF3n correctamente."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Email o contrase\xF1a incorrectos.",
        variant: "destructive"
      });
    }
  };
  const handleForgotPassword = () => {
    setForgotPassword(true);
    toast({
      title: "Recuperaci\xF3n de contrase\xF1a",
      description: "Se ha enviado un enlace a tu correo electr\xF3nico."
    });
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted"><div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIyIDIwJSAyMCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10" /><Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-border shadow-2xl"><div className="flex items-center justify-center mb-8"><div className="flex items-center space-x-2"><div className="p-2 bg-primary rounded-lg"><Utensils className="h-6 w-6 text-primary-foreground" /></div><span className="text-2xl font-bold text-foreground">SABOREA</span></div></div><div className="text-center mb-8"><h1 className="text-2xl font-bold text-foreground mb-2">
            Bienvenido a <span className="text-primary">SABOREA</span></h1><p className="text-muted-foreground">
            Mejorando tu experiencia gastronómica
          </p></div><form onSubmit={handleSubmit} className="space-y-6"><div className="space-y-4"><Input
    type="email"
    placeholder="Correo electrónico"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /><Input
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /></div><Button
    type="submit"
    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
    disabled={isLoading}
  >{isLoading ? "Entrando..." : "Entrar"}</Button><div className="flex items-center justify-center"><div className="border-t border-border flex-1" /><span className="px-4 text-sm text-muted-foreground">o</span><div className="border-t border-border flex-1" /></div><Button
    type="button"
    variant="outline"
    className="w-full border-border text-foreground hover:bg-secondary"
    onClick={onSwitchToRegister}
  >
            Acceder de otra forma
          </Button><div className="text-center space-y-2"><button
    type="button"
    onClick={handleForgotPassword}
    className="text-sm text-muted-foreground hover:text-primary transition-colors"
  >
              ¿Olvidaste tu contraseña?
            </button><div className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}<button
    type="button"
    onClick={onSwitchToRegister}
    className="text-primary hover:text-primary-hover transition-colors font-medium"
  >
                Regístrate
              </button></div></div></form></Card></div>;
};
export {
  LoginForm
};
