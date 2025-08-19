import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Plus,
  UtensilsCrossed,
  Clock,
  DollarSign,
  AlertTriangle,
  Leaf,
  Wheat,
  Flame
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useMenu } from "../../contexts/MenuContext";
import { useAuth } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/use-toast";
const AddMenuItemForm = ({ onClose, editItem }) => {
  const { user } = useAuth();
  const { createMenuItem, updateMenuItem } = useMenu();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: editItem?.name || "",
    description: editItem?.description || "",
    price: editItem?.price || 0,
    category: editItem?.category || "plato-principal",
    ingredients: editItem?.ingredients || [],
    preparationTime: editItem?.preparationTime || 15,
    available: editItem?.available ?? true,
    featured: editItem?.featured || false,
    allergens: editItem?.allergens || [],
    isVegetarian: editItem?.isVegetarian || false,
    isVegan: editItem?.isVegan || false,
    isGlutenFree: editItem?.isGlutenFree || false,
    spicyLevel: editItem?.spicyLevel || 0,
    calories: editItem?.calories || 0
  });
  const [newIngredient, setNewIngredient] = useState("");
  const [newAllergen, setNewAllergen] = useState("");
  const categories = [
    { value: "entrada", label: "Entradas" },
    { value: "plato-principal", label: "Platos Principales" },
    { value: "postre", label: "Postres" },
    { value: "bebida", label: "Bebidas" },
    { value: "especial", label: "Especialidades" }
  ];
  const spicyLevels = [
    { value: 0, label: "Sin picante", icon: "" },
    { value: 1, label: "Suave", icon: "\u{1F336}\uFE0F" },
    { value: 2, label: "Medio", icon: "\u{1F336}\uFE0F\u{1F336}\uFE0F" },
    { value: 3, label: "Picante", icon: "\u{1F336}\uFE0F\u{1F336}\uFE0F\u{1F336}\uFE0F" }
  ];
  const commonAllergens = [
    "Gluten",
    "L\xE1cteos",
    "Huevo",
    "Frutos secos",
    "Soja",
    "Mariscos",
    "Pescado",
    "Sesamo"
  ];
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const addIngredient = () => {
    if (newIngredient.trim() && !formData.ingredients.includes(newIngredient.trim())) {
      updateFormData("ingredients", [...formData.ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };
  const removeIngredient = (ingredient) => {
    updateFormData("ingredients", formData.ingredients.filter((i) => i !== ingredient));
  };
  const addAllergen = (allergen) => {
    if (!formData.allergens.includes(allergen)) {
      updateFormData("allergens", [...formData.allergens, allergen]);
    }
  };
  const removeAllergen = (allergen) => {
    updateFormData("allergens", formData.allergens.filter((a) => a !== allergen));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || user.type !== "restaurante") {
      toast({
        title: "Error",
        description: "Solo los restaurantes pueden gestionar platillos",
        variant: "destructive"
      });
      return;
    }
    if (!formData.name.trim() || !formData.description.trim() || formData.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }
    try {
      const menuItemData = {
        ...formData,
        restaurantId: user.id,
        images: [],
        // Por ahora sin imágenes
        spicyLevel: formData.spicyLevel
      };
      if (editItem) {
        updateMenuItem(editItem.id, menuItemData);
        toast({
          title: "\xA1Platillo actualizado!",
          description: `${formData.name} ha sido actualizado correctamente`
        });
      } else {
        createMenuItem(menuItemData);
        toast({
          title: "\xA1Platillo agregado!",
          description: `${formData.name} ha sido agregado al men\xFA`
        });
      }
      onClose?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el platillo. Intenta de nuevo.",
        variant: "destructive"
      });
    }
  };
  return <Card className="w-full max-w-4xl mx-auto bg-card border-border"><CardHeader className="pb-4"><div className="flex items-center justify-between"><div className="flex items-center space-x-3"><div className="p-2 bg-primary rounded-lg"><UtensilsCrossed className="h-6 w-6 text-primary-foreground" /></div><CardTitle className="text-2xl text-foreground">{editItem ? "Editar Platillo" : "Agregar Nuevo Platillo"}</CardTitle></div>{onClose && <Button
    variant="ghost"
    size="icon"
    onClick={onClose}
    className="h-8 w-8"
  ><X className="h-4 w-4" /></Button>}</div></CardHeader><CardContent><form onSubmit={handleSubmit} className="space-y-6">{
    /* Información básica */
  }<div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="space-y-4"><div><label className="text-sm font-medium text-foreground mb-2 block">
                  Nombre del platillo *
                </label><Input
    value={formData.name}
    onChange={(e) => updateFormData("name", e.target.value)}
    placeholder="Ej: Gallo Pinto Tradicional"
    className="bg-secondary border-border text-foreground"
    required
  /></div><div><label className="text-sm font-medium text-foreground mb-2 block">
                  Categoría *
                </label><Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}><SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Selecciona una categoría" /></SelectTrigger><SelectContent>{categories.map((category) => <SelectItem key={category.value} value={category.value}>{category.label}</SelectItem>)}</SelectContent></Select></div><div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium text-foreground mb-2 block flex items-center"><DollarSign className="h-4 w-4 mr-1" />
                    Precio (₡) *
                  </label><Input
    type="number"
    value={formData.price}
    onChange={(e) => updateFormData("price", parseInt(e.target.value) || 0)}
    placeholder="0"
    min="0"
    className="bg-secondary border-border text-foreground"
    required
  /></div><div><label className="text-sm font-medium text-foreground mb-2 block flex items-center"><Clock className="h-4 w-4 mr-1" />
                    Tiempo (min)
                  </label><Input
    type="number"
    value={formData.preparationTime}
    onChange={(e) => updateFormData("preparationTime", parseInt(e.target.value) || 0)}
    placeholder="15"
    min="1"
    className="bg-secondary border-border text-foreground"
  /></div></div></div><div className="space-y-4"><div><label className="text-sm font-medium text-foreground mb-2 block">
                  Descripción *
                </label><Textarea
    value={formData.description}
    onChange={(e) => updateFormData("description", e.target.value)}
    placeholder="Describe el platillo, su preparación y características especiales..."
    rows={4}
    className="bg-secondary border-border text-foreground resize-none"
    required
  /></div><div><label className="text-sm font-medium text-foreground mb-2 block flex items-center"><Flame className="h-4 w-4 mr-1" />
                  Nivel de picante
                </label><Select
    value={formData.spicyLevel.toString()}
    onValueChange={(value) => updateFormData("spicyLevel", parseInt(value))}
  ><SelectTrigger className="bg-secondary border-border"><SelectValue placeholder="Selecciona nivel" /></SelectTrigger><SelectContent>{spicyLevels.map((level) => <SelectItem key={level.value} value={level.value.toString()}><span className="flex items-center">{level.icon && <span className="mr-2">{level.icon}</span>}{level.label}</span></SelectItem>)}</SelectContent></Select></div><div><label className="text-sm font-medium text-foreground mb-2 block">
                  Calorías (opcional)
                </label><Input
    type="number"
    value={formData.calories}
    onChange={(e) => updateFormData("calories", parseInt(e.target.value) || 0)}
    placeholder="0"
    min="0"
    className="bg-secondary border-border text-foreground"
  /></div></div></div>{
    /* Ingredientes */
  }<div><label className="text-sm font-medium text-foreground mb-2 block">
              Ingredientes
            </label><div className="flex space-x-2 mb-3"><Input
    value={newIngredient}
    onChange={(e) => setNewIngredient(e.target.value)}
    placeholder="Agregar ingrediente..."
    className="flex-1 bg-secondary border-border text-foreground"
    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
  /><Button type="button" onClick={addIngredient} size="icon" variant="outline"><Plus className="h-4 w-4" /></Button></div><div className="flex flex-wrap gap-2">{formData.ingredients.map((ingredient, index) => <Badge key={index} variant="secondary" className="px-3 py-1">{ingredient}<button
    type="button"
    onClick={() => removeIngredient(ingredient)}
    className="ml-2 text-muted-foreground hover:text-foreground"
  ><X className="h-3 w-3" /></button></Badge>)}</div></div>{
    /* Características dietéticas */
  }<div><label className="text-sm font-medium text-foreground mb-3 block">
              Características dietéticas
            </label><div className="grid grid-cols-2 md:grid-cols-3 gap-4"><div className="flex items-center space-x-2"><Checkbox
    id="vegetarian"
    checked={formData.isVegetarian}
    onCheckedChange={(checked) => updateFormData("isVegetarian", checked)}
  /><label htmlFor="vegetarian" className="text-sm text-foreground cursor-pointer flex items-center"><Leaf className="h-4 w-4 mr-1 text-green-500" />
                  Vegetariano
                </label></div><div className="flex items-center space-x-2"><Checkbox
    id="vegan"
    checked={formData.isVegan}
    onCheckedChange={(checked) => updateFormData("isVegan", checked)}
  /><label htmlFor="vegan" className="text-sm text-foreground cursor-pointer flex items-center"><Leaf className="h-4 w-4 mr-1 text-green-600" />
                  Vegano
                </label></div><div className="flex items-center space-x-2"><Checkbox
    id="glutenfree"
    checked={formData.isGlutenFree}
    onCheckedChange={(checked) => updateFormData("isGlutenFree", checked)}
  /><label htmlFor="glutenfree" className="text-sm text-foreground cursor-pointer flex items-center"><Wheat className="h-4 w-4 mr-1 text-amber-500" />
                  Sin gluten
                </label></div></div></div>{
    /* Alérgenos */
  }<div><label className="text-sm font-medium text-foreground mb-3 block flex items-center"><AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
              Alérgenos
            </label><div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">{commonAllergens.map((allergen) => <Button
    key={allergen}
    type="button"
    variant={formData.allergens.includes(allergen) ? "default" : "outline"}
    size="sm"
    onClick={() => formData.allergens.includes(allergen) ? removeAllergen(allergen) : addAllergen(allergen)}
    className="text-xs"
  >{allergen}</Button>)}</div><div className="flex flex-wrap gap-2">{formData.allergens.map((allergen, index) => <Badge key={index} variant="destructive" className="px-3 py-1"><AlertTriangle className="h-3 w-3 mr-1" />{allergen}</Badge>)}</div></div>{
    /* Configuraciones adicionales */
  }<div className="grid grid-cols-2 gap-6"><div className="flex items-center space-x-2"><Checkbox
    id="available"
    checked={formData.available}
    onCheckedChange={(checked) => updateFormData("available", checked)}
  /><label htmlFor="available" className="text-sm text-foreground cursor-pointer">
                Disponible en el menú
              </label></div><div className="flex items-center space-x-2"><Checkbox
    id="featured"
    checked={formData.featured}
    onCheckedChange={(checked) => updateFormData("featured", checked)}
  /><label htmlFor="featured" className="text-sm text-foreground cursor-pointer">
                Platillo destacado
              </label></div></div>{
    /* Botones de acción */
  }<div className="flex justify-end space-x-4 pt-6 border-t border-border">{onClose && <Button
    type="button"
    variant="outline"
    onClick={onClose}
    className="border-border text-foreground hover:bg-secondary"
  >
                Cancelar
              </Button>}<Button
    type="submit"
    className="bg-primary hover:bg-primary-hover text-primary-foreground"
  >{editItem ? "Actualizar Platillo" : "Agregar Platillo"}</Button></div></form></CardContent></Card>;
};
export {
  AddMenuItemForm
};
