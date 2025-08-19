import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Utensils } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
const RegisterForm = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
    isRestaurant: false
  });
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.name || !formData.username) {
        toast({
          title: "Error",
          description: "Por favor completa todos los campos",
          variant: "destructive"
        });
        return;
      }
      if (formData.isRestaurant) {
        setStep(2);
        return;
      } else {
        await handleRegistration();
      }
    } else if (step === 2) {
      await handleRegistration();
    }
  };
  const handleRegistration = async () => {
    try {
      await register({
        ...formData,
        type: formData.isRestaurant ? "restaurante" : "cliente"
      });
      toast({
        title: "\xA1Registro exitoso!",
        description: `Bienvenido${formData.isRestaurant ? " a SABOREA para restaurantes" : " a SABOREA"}`
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la cuenta. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const goBackToStep1 = () => {
    setStep(1);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted"><div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjIyIDIwJSAyMCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10" /><Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-border shadow-2xl"><div className="flex items-center justify-center mb-8"><div className="flex items-center space-x-2"><div className="p-2 bg-primary rounded-lg"><Utensils className="h-6 w-6 text-primary-foreground" /></div><span className="text-2xl font-bold text-foreground">SABOREA</span></div></div>{step === 1 && <><div className="text-center mb-8"><Button
    variant="outline"
    className="w-full border-border text-foreground hover:bg-secondary mb-6"
    onClick={onSwitchToLogin}
  >
                Crear cuenta de otra forma
              </Button><div className="flex items-center justify-center"><div className="border-t border-border flex-1" /><span className="px-4 text-sm text-muted-foreground">o</span><div className="border-t border-border flex-1" /></div></div><form onSubmit={handleSubmit} className="space-y-4"><Input
    type="email"
    placeholder="Correo electrónico"
    value={formData.email}
    onChange={(e) => updateFormData("email", e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /><Input
    type="password"
    placeholder="Contraseña"
    value={formData.password}
    onChange={(e) => updateFormData("password", e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /><Input
    type="text"
    placeholder="Nombre Completo"
    value={formData.name}
    onChange={(e) => updateFormData("name", e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /><Input
    type="text"
    placeholder="Nombre de Usuario"
    value={formData.username}
    onChange={(e) => updateFormData("username", e.target.value)}
    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
    required
  /><div className="flex items-center space-x-2 p-4 bg-secondary rounded-lg"><Checkbox
    id="restaurant"
    checked={formData.isRestaurant}
    onCheckedChange={(checked) => updateFormData("isRestaurant", checked)}
  /><label htmlFor="restaurant" className="text-sm text-foreground cursor-pointer">
                  Registrar cuenta como Restaurante
                </label></div><Button
    type="submit"
    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3"
    disabled={isLoading}
  >{isLoading ? "Registrando..." : "Continuar"}</Button><div className="text-center"><span className="text-sm text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}<button
    type="button"
    onClick={onSwitchToLogin}
    className="text-primary hover:text-primary-hover transition-colors font-medium"
  >
                    Entrar
                  </button></span></div></form></>}{step === 2 && formData.isRestaurant && <><div className="text-center mb-8"><h2 className="text-xl font-bold text-foreground mb-2">
                ¿Confirma crear cuenta como restaurante?
              </h2><p className="text-sm text-muted-foreground">
                Esto le permitirá tener un perfil profesional de restaurante con el que poder interactuar con sus comensales.
              </p></div><div className="space-y-4 mb-6"><div className="flex items-center space-x-2 p-4 bg-secondary rounded-lg"><Checkbox
    id="confirmRestaurant"
    checked={true}
    disabled
  /><label htmlFor="confirmRestaurant" className="text-sm text-foreground">
                  Registrar cuenta como Restaurante
                </label></div><div className="p-4 bg-primary/10 rounded-lg border border-primary/20"><h3 className="font-medium text-foreground mb-2">Cuenta de Restaurante incluye:</h3><ul className="text-sm text-muted-foreground space-y-1"><li>• Perfil verificado con badge</li><li>• Dashboard con métricas</li><li>• Gestión de reseñas</li><li>• Estadísticas de seguidores</li></ul></div></div><div className="flex space-x-4"><Button
    type="button"
    variant="outline"
    onClick={goBackToStep1}
    className="flex-1 border-border text-foreground hover:bg-secondary"
    disabled={isLoading}
  >
                Atrás
              </Button><Button
    onClick={handleSubmit}
    className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
    disabled={isLoading}
  >{isLoading ? "Creando cuenta..." : "Crear Cuenta"}</Button></div></>}</Card></div>;
};
export {
  RegisterForm
};
