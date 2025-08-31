import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore, Product, Order } from '@/store/useStore';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const { user, products, orders, setProducts, updateProduct, deleteProduct } = useStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: ''
  });

  // Admin authentication (simple password check)
  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin password');
    }
  };

  // Calculate dashboard stats
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = new Set(orders.map(order => order.user_id)).size;

  // Handle product form submission
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && selectedProduct) {
      // Update existing product
      const updatedProduct: Product = {
        ...selectedProduct,
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url
      };
      updateProduct(updatedProduct);
    } else {
      // Add new product
      const newProduct: Product = {
        id: `product_${Date.now()}`,
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url,
        created_at: new Date().toISOString()
      };
      setProducts([...products, newProduct]);
    }

    // Reset form
    setProductForm({ name: '', description: '', price: '', category: '', image_url: '' });
    setSelectedProduct(null);
    setIsEditing(false);
  };

  // Handle edit product
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image_url: product.image_url
    });
    setIsEditing(true);
  };

  // Handle delete product
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  // Admin login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-2xl">Admin Login</CardTitle>
            <CardDescription className="text-gray-300">
              Enter admin password to access dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Enter admin password"
              />
            </div>
            <Button 
              onClick={handleAdminLogin}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Login to Admin Dashboard
            </Button>
            <div className="text-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="text-gray-300 hover:text-white"
              >
                Back to Website
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your e-commerce business</p>
          </div>
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-white border-white/20"
            >
              View Website
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="text-white border-white/20"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-400">{totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Total Products</p>
                  <p className="text-2xl font-bold text-purple-400">{totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-300">Total Customers</p>
                  <p className="text-2xl font-bold text-orange-400">{totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="products" className="text-white">Products</TabsTrigger>
            <TabsTrigger value="orders" className="text-white">Orders</TabsTrigger>
            <TabsTrigger value="analytics" className="text-white">Analytics</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            {/* Add/Edit Product Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Product Name</Label>
                      <Input
                        id="name"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price" className="text-white">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Select 
                        value={productForm.category} 
                        onValueChange={(value) => setProductForm({...productForm, category: value})}
                      >
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="templates">Templates</SelectItem>
                          <SelectItem value="courses">Courses</SelectItem>
                          <SelectItem value="tools">Tools</SelectItem>
                          <SelectItem value="ebooks">E-books</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image_url" className="text-white">Image URL</Label>
                      <Input
                        id="image_url"
                        value={productForm.image_url}
                        onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="/images/imageupload.jpg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      {isEditing ? 'Update Product' : 'Add Product'}
                    </Button>
                    {isEditing && (
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedProduct(null);
                          setProductForm({ name: '', description: '', price: '', category: '', image_url: '' });
                        }}
                        className="text-white border-white/20"
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">All Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-white font-medium">{product.name}</h3>
                          <p className="text-gray-300 text-sm">{product.description.substring(0, 100)}...</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary">{product.category}</Badge>
                            <span className="text-green-400 font-semibold">{formatCurrency(product.price)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="text-white border-white/20"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-gray-300 text-center py-8">No orders yet</p>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="p-4 bg-white/5 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-white font-medium">Order #{order.id}</h3>
                            <p className="text-gray-300 text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-semibold">{formatCurrency(order.total_amount)}</p>
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span className="text-gray-300">
                                {item.product.name} x{item.quantity}
                              </span>
                              <span className="text-gray-300">{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Sales Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Total Revenue</span>
                      <span className="text-green-400 font-semibold">{formatCurrency(totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Average Order Value</span>
                      <span className="text-blue-400 font-semibold">
                        {formatCurrency(totalOrders > 0 ? totalRevenue / totalOrders : 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Conversion Rate</span>
                      <span className="text-purple-400 font-semibold">
                        {totalCustomers > 0 ? Math.round((totalOrders / totalCustomers) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Top Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {products.slice(0, 5).map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm">#{index + 1}</span>
                          <span className="text-white text-sm">{product.name}</span>
                        </div>
                        <span className="text-green-400 text-sm">{formatCurrency(product.price)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}