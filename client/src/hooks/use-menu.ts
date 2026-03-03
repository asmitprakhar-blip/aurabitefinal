import { useQuery } from "@tanstack/react-query";
import { type MenuItem } from "@shared/schema";

const MOCK_MENU: MenuItem[] = [
  { id: 1, name: "Fruit Chaat", description: "A colorful mix of fresh apples, oranges, kiwi, and pomegranate seeds, tossed with warm spices and citrus for a sweet-tangy finish", price: 149, category: "Snacks", image: "https://plus.unsplash.com/premium_photo-1689596510917-d337f077d559?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 2, name: "Peanut Chaat Mix", description: "Mix of boiled peanuts, chopped onions, tomatoes, green chilies, fresh coriander, and tangy lemon juice", price: 99, category: "Snacks", image: "https://images.unsplash.com/photo-1617894814622-244a5a817c09?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 3, name: "Flavoured Makhana Chaat", description: "Mix of crunchy roasted makhana, chopped onions, tomatoes, fresh coriander, and a squeeze of lemon juice", price: 129, category: "Snacks", image: "https://images.unsplash.com/photo-1596450514735-111a2f646067?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 4, name: "Sprouts", description: "Mix of sprouted green gram, chickpeas, colorful bell peppers, pomegranate seeds, fresh coriander, and tangy lime wedges", price: 119, category: "Breakfast", image: "https://images.unsplash.com/photo-1623489254660-db5b367881d9?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 5, name: "Paneer Veg Mix", description: "Mix of golden-seared paneer cubes, sautéed bell peppers, and onions tossed in a rich, spiced tomato masala and finished with fresh coriander", price: 199, category: "Meals", image: "https://plus.unsplash.com/premium_photo-1726783359110-de1b5d04179c?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 6, name: "Sweet Patato Chaat", description: "Mix of boiled sweet potato cubes, tossed with aromatic spices, fresh coriander, and tangy lime juice", price: 139, category: "Snacks", image: "https://images.unsplash.com/photo-1730793666277-8f3247c58968?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 7, name: "Eggs", description: "Classic Boiled, Creamy Scrambled, Signature Omelette, Artisan Poached, Lean Egg Whites", price: 109, category: "Breakfast", image: "https://plus.unsplash.com/premium_photo-1711593312223-0eb8d63e2a66?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 8, name: "Sweet Corn", description: "Mix of steamed golden corn kernels, finely chopped onions, tomatoes, and green chilies, finished with fresh coriander and a zesty lemon squeeze", price: 119, category: "Snacks", image: "https://images.unsplash.com/photo-1641053336141-8b0339f48f23?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 9, name: "Soups (Veg & Non-Veg)", description: "Your choice of Vegetable or Chicken, nutrient-rich broth packed with seasonal diced vegetables, sweet corn, and a hint of cracked black pepper", price: 149, category: "Meals", image: "https://plus.unsplash.com/premium_photo-1699467556443-65d2a8d8f00e?auto=format&fit=crop&w=600&q=80", popular: false, available: true },
  { id: 10, name: "Strawberry Chocolate Dip", description: "Fresh, succulent strawberries hand-dipped in rich, velvety melted chocolate for the perfect balance of fruity sweetness and decadent cocoa", price: 199, category: "Desserts", image: "https://images.unsplash.com/photo-1503624280608-6b79dc9ab03d?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
  { id: 11, name: "Juices", description: "A vibrant selection of 100% natural, freshly squeezed juices made from a variety of tropical fruits, chilled to perfection and served without added sugar for a nutrient-packed experience", price: 129, category: "Drinks", image: "https://plus.unsplash.com/premium_photo-1695055513501-2573541f00cd?auto=format&fit=crop&w=600&q=80", popular: true, available: true },
];

export function useMenu() {
  return useQuery({
    queryKey: ["/api/menu"],
    queryFn: async () => MOCK_MENU,
  });
}

export function useMenuItem(id: number) {
  return useQuery({
    queryKey: ["/api/menu", id],
    queryFn: async () => {
      const item = MOCK_MENU.find(m => m.id === id);
      if (!item) throw new Error("Menu item not found");
      return item;
    },
    enabled: !!id && !isNaN(id),
  });
}
