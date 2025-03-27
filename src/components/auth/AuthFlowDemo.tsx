import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import GumroadLoginModal from "./GumroadLoginModal";
import { useGumroadAuth } from "@/contexts/GumroadAuthContext";

const AuthFlowDemo = () => {
  const { isGumroadConnected, setIsGumroadConnected, setShowGumroadLogin } =
    useGumroadAuth();

  const handleLogin = () => {
    setShowGumroadLogin(true);
  };

  const handleLogout = () => {
    setIsGumroadConnected(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[500px] bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle>Gumroad Authentication</CardTitle>
          <CardDescription>
            Connect your Gumroad account to access all features
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Authentication Status:</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${isGumroadConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {isGumroadConnected ? "Connected" : "Not Connected"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2 border-t pt-4">
          {isGumroadConnected ? (
            <Button variant="destructive" onClick={handleLogout}>
              Disconnect Account
            </Button>
          ) : (
            <Button onClick={handleLogin}>Connect Gumroad</Button>
          )}
        </CardFooter>
      </Card>
      <GumroadLoginModal />
    </div>
  );
};

export default AuthFlowDemo;
