import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Star,
  Download,
  Code,
  Smartphone,
  Globe,
  Database,
  Palette,
  Zap
} from 'lucide-react';

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'templates', label: 'Templates' },
    { value: 'components', label: 'Components' },
    { value: 'tools', label: 'Development Tools' },
    { value: 'source-code', label: 'Source Code' },
    { value: 'plugins', label: 'Plugins' }
  ];

  const products = [
    {
      id: 1,
      title: "React E-commerce Template",
      description: "Complete e-commerce solution with cart, checkout, and admin panel",
      category: "templates",
      price: 99,
      originalPrice: 149,
      rating: 4.9,
      reviews: 127,
      downloads: 1250,
      icon: <ShoppingCart className="h-6 w-6" />,
      features: ["Responsive Design", "Payment Integration", "Admin Dashboard", "SEO Optimized"],
      tags: ["React", "TypeScript", "Tailwind CSS", "Stripe"]
    },
    {
      id: 2,
      title: "Mobile App UI Kit",
      description: "50+ premium mobile app screens and components for iOS and Android",
      category: "components",
      price: 79,
      originalPrice: 120,
      rating: 4.8,
      reviews: 89,
      downloads: 890,
      icon: <Smartphone className="h-6 w-6" />,
      features: ["50+ Screens", "Dark/Light Mode", "Figma Files", "React Native"],
      tags: ["React Native", "Figma", "UI Kit", "Mobile"]
    },
    {
      id: 3,
      title: "SaaS Landing Page Bundle",
      description: "10 modern SaaS landing page templates with conversion optimization",
      category: "templates",
      price: 59,
      originalPrice: 89,
      rating: 4.7,
      reviews: 156,
      downloads: 2100,
      icon: <Globe className="h-6 w-6" />,
      features: ["10 Templates", "Conversion Optimized", "Mobile Ready", "Fast Loading"],
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      id: 4,
      title: "Database Schema Generator",
      description: "Automated tool for generating optimized database schemas",
      category: "tools",
      price: 49,
      originalPrice: 75,
      rating: 4.6,
      reviews: 73,
      downloads: 450,
      icon: <Database className="h-6 w-6" />,
      features: ["Auto Generation", "Multiple DB Support", "Export Options", "Documentation"],
      tags: ["Database", "MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      id: 5,
      title: "React Component Library",
      description: "100+ reusable React components with TypeScript support",
      category: "components",
      price: 129,
      originalPrice: 199,
      rating: 4.9,
      reviews: 234,
      downloads: 1800,
      icon: <Code className="h-6 w-6" />,
      features: ["100+ Components", "TypeScript", "Storybook", "Unit Tests"],
      tags: ["React", "TypeScript", "Storybook", "Testing"]
    },
    {
      id: 6,
      title: "Design System Starter",
      description: "Complete design system with tokens, components, and guidelines",
      category: "tools",
      price: 89,
      originalPrice: 135,
      rating: 4.8,
      reviews: 92,
      downloads: 670,
      icon: <Palette className="h-6 w-6" />,
      features: ["Design Tokens", "Component Library", "Documentation", "Figma Kit"],
      tags: ["Design System", "Figma", "Tokens", "Documentation"]
    },
    {
      id: 7,
      title: "Full-Stack Blog Platform",
      description: "Complete blog platform with CMS, authentication, and analytics",
      category: "source-code",
      price: 199,
      originalPrice: 299,
      rating: 4.9,
      reviews: 67,
      downloads: 340,
      icon: <Zap className="h-6 w-6" />,
      features: ["Full Source Code", "CMS Integration", "User Auth", "Analytics"],
      tags: ["Next.js", "Node.js", "MongoDB", "Authentication"]
    },
    {
      id: 8,
      title: "API Development Toolkit",
      description: "Comprehensive toolkit for building and testing REST APIs",
      category: "tools",
      price: 69,
      originalPrice: 99,
      rating: 4.7,
      reviews: 145,
      downloads: 980,
      icon: <Database className="h-6 w-6" />,
      features: ["API Generator", "Testing Tools", "Documentation", "Monitoring"],
      tags: ["API", "Testing", "Documentation", "Node.js"]
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4">
              🛍️ Digital Products Store
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Premium Development Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Accelerate your development with our collection of premium templates, 
              components, tools, and source code packages.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} products found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      {product.icon}
                    </div>
                    {product.originalPrice > product.price && (
                      <Badge variant="destructive" className="text-xs">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{product.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div className="space-y-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center">
                        <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Rating and Downloads */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{product.rating}</span>
                      <span className="ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      <span>{product.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-blue-600">${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button size="sm" className="text-xs">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shopify Integration Notice */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-bold">Shopify Integration Ready</h3>
            <p className="text-muted-foreground">
              This shop is designed to be easily integrated with Shopify for seamless 
              e-commerce functionality, payment processing, and inventory management.
            </p>
            <Button variant="outline">
              Learn About Shopify Integration
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;