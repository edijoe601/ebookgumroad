import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface GumroadAuthContextType {
  isGumroadConnected: boolean;
  setIsGumroadConnected: (value: boolean) => void;
  showGumroadLogin: boolean;
  setShowGumroadLogin: (value: boolean) => void;
  handleGumroadLoginSuccess: () => void;
  requireGumroadAuth: (redirectPath?: string) => boolean;
}

const GumroadAuthContext = createContext<GumroadAuthContextType | undefined>(
  undefined,
);

export const useGumroadAuth = () => {
  const context = useContext(GumroadAuthContext);
  if (context === undefined) {
    throw new Error("useGumroadAuth must be used within a GumroadAuthProvider");
  }
  return context;
};

interface GumroadAuthProviderProps {
  children: ReactNode;
}

export const GumroadAuthProvider = ({ children }: GumroadAuthProviderProps) => {
  const [isGumroadConnected, setIsGumroadConnected] = useState(false);
  const [showGumroadLogin, setShowGumroadLogin] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check local storage for auth state on initial load
  useEffect(() => {
    const storedAuthState = localStorage.getItem("gumroadConnected");
    if (storedAuthState === "true") {
      setIsGumroadConnected(true);
    }
  }, []);

  // Update local storage when auth state changes
  useEffect(() => {
    localStorage.setItem("gumroadConnected", isGumroadConnected.toString());
  }, [isGumroadConnected]);

  // Handle redirect after successful login if needed
  useEffect(() => {
    if (isGumroadConnected && redirectAfterLogin) {
      navigate(redirectAfterLogin);
      setRedirectAfterLogin(null);
    }
  }, [isGumroadConnected, redirectAfterLogin, navigate]);

  const handleGumroadLoginSuccess = () => {
    setIsGumroadConnected(true);
    setShowGumroadLogin(false);
    toast({
      title: "Successfully Connected",
      description: "Your Gumroad account has been connected successfully",
    });
  };

  const requireGumroadAuth = (redirectPath?: string) => {
    if (!isGumroadConnected) {
      setShowGumroadLogin(true);
      if (redirectPath) {
        setRedirectAfterLogin(redirectPath);
      }
      return false;
    }
    return true;
  };

  return (
    <GumroadAuthContext.Provider
      value={{
        isGumroadConnected,
        setIsGumroadConnected,
        showGumroadLogin,
        setShowGumroadLogin,
        handleGumroadLoginSuccess,
        requireGumroadAuth,
      }}
    >
      {children}
    </GumroadAuthContext.Provider>
  );
};
