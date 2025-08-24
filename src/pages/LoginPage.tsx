import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import VerificationPopup from "../components/verificationPopup.tsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setMessage("");

  const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        if(error.message.includes("Email not confirmed")) {
            setShowVerificationPopup(true);
        }
        else {
            setMessage(error.message);
        }
        return;
    }

    const user = data.user;

    if (!user) {
        setMessage("No user returned. Something went wrong.");
        return;
    }

    // Supabase new API doesn't guarantee confirmed_at; optional check:
    if (!user.email_confirmed_at) {
        setShowVerificationPopup(true);
        return;
    }

    navigate("/");
    };
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Login Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                Login
              </h2>
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {message && <p className="text-sm text-red-600 mb-3 text-center">{message}</p>}
                <button
                    type="submit"
                    className="mt-4 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Log In
                </button>
                </form>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Don't have an account? <a href="/register" className="text-accent hover:underline">Register here</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
        {showVerificationPopup && (
            <VerificationPopup
            email={email}
            onClose={() => setShowVerificationPopup(false)}
            />
        )}
    </div>
  );
};

export default LoginPage;
