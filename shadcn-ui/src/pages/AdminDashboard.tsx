import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  Calendar,
  LogOut,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { admin, orders, products, clearAdmin } = useStore();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    // Check if admin is logged in
    if (!admin) {
      const savedAdmin = localStorage.getItem('drl_admin_session');
      if (!savedAdmin) {
        navigate('/admin/login');
        return;
      }
    }

    // Calculate stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
    const totalProducts = products.length;
    const pendingOrders = orders.filter(order => order.status === 'pending').length;

    setStats({
      totalOrders,
      totalRevenue,
      totalProducts,
      pendingOrders
    });
  }, [admin, orders, products, navigate]);

  const handleLogout = () => {
    clearAdmin();
    localStorage.removeItem('drl_admin_session');
    navigate('/admin/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      case 'cancelled':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'failed':
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back, {admin?.name || 'Admin'}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalOrders}</div>
              <p className="text-xs text-gray-500">All time orders</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">₱{stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">All time revenue</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Products</CardTitle>
              <Package className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500">Active products</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stats.pendingOrders}</div>
              <p className="text-xs text-gray-500">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="bg-white border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-black flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">No orders yet</p>
                <p className="text-sm text-gray-400">Orders will appear here when customers make purchases</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 10).map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center">
                          <ShoppingBag className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-black font-medium">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-gray-500">
                          {order.items.length} item(s) • {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-black font-medium">₱{order.total_amount.toLocaleString()}</p>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}