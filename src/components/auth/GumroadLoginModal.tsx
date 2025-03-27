import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import GumroadLogin from "./GumroadLogin";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";

const GumroadLoginModal = () => {
  const { showGumroadLogin, setShowGumroadLogin, handleGumroadLoginSuccess } =
    useGumroadAuth();

  return (
    <Dialog open={showGumroadLogin} onOpenChange={setShowGumroadLogin}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to Gumroad</DialogTitle>
          <DialogDescription>
            You need to connect your Gumroad account to use this feature
          </DialogDescription>
        </DialogHeader>
        <GumroadLogin
          onSuccess={handleGumroadLoginSuccess}
          onCancel={() => setShowGumroadLogin(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default GumroadLoginModal;
