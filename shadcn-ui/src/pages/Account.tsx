import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStore } from '@/store/useStore';
import { User, Package, Download, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const { user, orders, setUser } = useStore();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
            <p className="text-gray-300">Manage your profile and orders</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Full Name
                      </label>
                      <p className="text-gray-300 bg-white/5 p-3 rounded-lg">
                        {user.full_name || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address
                      </label>
                      <p className="text-gray-300 bg-white/5 p-3 rounded-lg">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Package className="mr-2 h-5 w-5" />
                    Order History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No orders yet</p>
                      <Button className="mt-4" onClick={() => navigate('/shop')}>
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="bg-white/5 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-white font-medium">Order #{order.id}</h3>
                              <p className="text-gray-400 text-sm">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold">
                                ${order.total_amount.toFixed(2)}
                              </p>
                              <Badge className="bg-green-600">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    className="w-8 h-8 object-cover rounded"
                                  />
                                  <span className="text-gray-300 text-sm">
                                    {item.product.name} (x{item.quantity})
                                  </span>
                                </div>
                                <Button size="sm" variant="outline">
                                  <Download className="mr-1 h-3 w-3" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}