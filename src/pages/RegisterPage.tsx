import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { supabase } from "../helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { set } from "date-fns";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage(""); // Reset message
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        });
        if (error) {
            setMessage(error.message);
        } else {
            setMessage("User account created successfully!");
            navigate("/login");
        }
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
    }
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

 

      {/* Register Form Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-md">
          <Card className="shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
                Register
              </h2>
              <form className="flex flex-col gap-4">
                <input
                
                  required
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  type="text"
                  placeholder="Full Name"
                  className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input

                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  type="password"
                  placeholder="Password"
                  className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input

                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 rounded-lg border border-input bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {message && (
                  <p className="text-sm text-red-600 mb-3 text-center">{message}</p>
                )}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-4 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Register
                </button>
              </form>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Already have an account? <a href="/login" className="text-accent hover:underline">Log in here</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegisterPage;
