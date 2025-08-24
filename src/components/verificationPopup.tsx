import { useState } from "react";
import { supabase } from "../helper/supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VerificationPopup = ({ email, onClose }) => {
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Verification email sent! Please check your inbox.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full shadow-soft animate-fade-in">
        <CardContent className="p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-serif font-bold text-primary">
            Verify Your Email
          </h2>
          <p className="text-muted-foreground text-sm">
            We’ve sent a verification link to <strong>{email}</strong>.  
            Please verify your email before continuing.
          </p>

          {message && (
            <p className="text-green-600 text-sm">{message}</p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button
              onClick={handleResend}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Resend Email
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPopup;
