import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Trash, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  total: number;
  items: { name: string; quantity: number }[];
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email || null);
        setEmail(user.email);
      }
    };


    const getOrders = async () => {
      // Replace with your actual orders query
      const { data } = await supabase.from<Order>("orders").select("*");
      if (data) setOrders(data);
    };

    getUser();
    getOrders();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    const { error } = await supabase.auth.admin.deleteUser(userName || "");
    if (!error) {
      alert("Account deleted");
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-warm">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
            My Profile
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your account, view your previous orders, or make changes to your profile.
          </p>
        </div>
      </section>

      {/* Admin Dashboard Section */}
      <div className="container mx-auto max-w-4xl p-8 items-center flex flex-col space-y-6">
        {/* {isAdmin && ( */}
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center align-center px-4 py-2 bg-secondary rounded-lg text-primary-foreground hover:bg-secondary/80 transition"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Admin Dashboard
          </button>
        {/* )} */}
      </div>

      {/* Profile Info Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-soft mb-12">
            <CardContent className="p-8 flex flex-col md:flex-row md:justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-20 h-20 bg-gradient-sage rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary">{userName}</h2>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-secondary rounded-lg text-primary-foreground hover:bg-secondary/80 transition"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Log Out
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex items-center px-4 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition"
                >
                  <Trash className="w-5 h-5 mr-2" />
                  Delete Account
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Previous Orders</h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">You have no previous orders.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-soft">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary mb-2">
                      Order #{order.id}
                    </h3>
                    <p className="text-muted-foreground mb-2">Date: {order.date}</p>
                    <p className="text-muted-foreground mb-2">Total: ${order.total.toFixed(2)}</p>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          {item.name} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfilePage;
