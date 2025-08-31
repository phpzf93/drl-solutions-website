import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  loginTime?: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  payment_intent_id: string;
  created_at: string;
  items: OrderItem[];
}

interface Store {
  // User state
  user: User | null;
  admin: User | null;
  setUser: (user: User | null) => void;
  setAdmin: (admin: User | null) => void;
  clearAdmin: () => void;

  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;

  // Orders state
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  removeProduct: (productId: string) => void;
}

// Sample products data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Professional Website Development',
    description: 'Custom responsive website with modern design, SEO optimization, and mobile-first approach.',
    price: 25000,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    category: 'Web Development',
    features: ['Responsive Design', 'SEO Optimized', 'Content Management', 'Mobile-First', '1 Year Support']
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Complete online store solution with payment integration, inventory management, and analytics.',
    price: 45000,
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    category: 'E-commerce',
    features: ['Payment Gateway', 'Inventory System', 'Admin Dashboard', 'Order Management', 'Analytics']
  },
  {
    id: '3',
    name: 'Mobile App Development',
    description: 'Cross-platform mobile application for iOS and Android with native performance.',
    price: 65000,
    image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=300&fit=crop',
    category: 'Mobile Development',
    features: ['Cross-Platform', 'Native Performance', 'Push Notifications', 'Offline Support', 'App Store Deployment']
  },
  {
    id: '4',
    name: 'Digital Marketing Package',
    description: 'Comprehensive digital marketing strategy including SEO, social media, and content marketing.',
    price: 15000,
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
    category: 'Digital Marketing',
    features: ['SEO Strategy', 'Social Media Management', 'Content Creation', 'Analytics Reports', 'Monthly Optimization']
  },
  {
    id: '5',
    name: 'Cloud Infrastructure Setup',
    description: 'Scalable cloud infrastructure deployment with security, monitoring, and backup solutions.',
    price: 35000,
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
    category: 'Cloud Services',
    features: ['Auto Scaling', 'Security Configuration', '24/7 Monitoring', 'Automated Backups', 'Load Balancing']
  },
  {
    id: '6',
    name: 'Custom Software Solution',
    description: 'Tailored software development for specific business needs and workflow automation.',
    price: 85000,
    image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&h=300&fit=crop',
    category: 'Software Development',
    features: ['Custom Development', 'Workflow Automation', 'Database Design', 'API Integration', 'Training & Support']
  }
];

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // User state
      user: null,
      admin: null,
      setUser: (user) => set({ user }),
      setAdmin: (admin) => set({ admin }),
      clearAdmin: () => set({ admin: null }),

      // Cart state
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter(item => item.product.id !== productId) });
      },
      updateCartQuantity: (productId, quantity) => {
        const { cart } = get();
        if (quantity <= 0) {
          set({ cart: cart.filter(item => item.product.id !== productId) });
        } else {
          set({
            cart: cart.map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
      },
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },

      // Orders state
      orders: [],
      addOrder: (order) => {
        const { orders } = get();
        set({ orders: [order, ...orders] });
      },
      updateOrderStatus: (orderId, status) => {
        const { orders } = get();
        set({
          orders: orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        });
      },
      getOrderById: (orderId) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },

      // Products state
      products: sampleProducts,
      setProducts: (products) => set({ products }),
      addProduct: (product) => {
        const { products } = get();
        set({ products: [...products, product] });
      },
      updateProduct: (productId, updates) => {
        const { products } = get();
        set({
          products: products.map(product =>
            product.id === productId ? { ...product, ...updates } : product
          )
        });
      },
      removeProduct: (productId) => {
        const { products } = get();
        set({ products: products.filter(product => product.id !== productId) });
      }
    }),
    {
      name: 'drl-solutions-store',
      partialize: (state) => ({
        cart: state.cart,
        orders: state.orders,
        products: state.products,
        user: state.user
      })
    }
  )
);