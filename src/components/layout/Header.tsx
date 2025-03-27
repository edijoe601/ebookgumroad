import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  BarChart2,
  Library,
  User,
  LogOut,
  Menu,
  Plus,
} from "lucide-react";

interface HeaderProps {
  username?: string;
  avatarUrl?: string;
}

const Header = ({ username = "John Doe", avatarUrl = "" }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleCreateEbook = () => {
    navigate("/my-ebooks");
    setMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full h-20 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BookOpen className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-bold">EbookAI</span>
        </Link>
        <nav className="ml-10 hidden md:flex space-x-6">
          <NavItem
            to="/dashboard"
            icon={<BarChart2 className="h-4 w-4 mr-2" />}
            label="Dashboard"
            active={location.pathname === "/dashboard"}
            onClick={() => handleNavigation("/dashboard")}
          />
          <NavItem
            to="/niche-analysis"
            icon={<BarChart2 className="h-4 w-4 mr-2" />}
            label="Niche Analysis"
            active={location.pathname === "/niche-analysis"}
            onClick={() => handleNavigation("/niche-analysis")}
          />
          <NavItem
            to="/my-ebooks"
            icon={<Library className="h-4 w-4 mr-2" />}
            label="My Ebooks"
            active={location.pathname === "/my-ebooks"}
            onClick={() => handleNavigation("/my-ebooks")}
          />
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2"
          onClick={handleCreateEbook}
        >
          <Plus className="h-4 w-4" />
          Create New Ebook
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage
                  src={
                    avatarUrl ||
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                  }
                  alt={username}
                />
                <AvatarFallback className="bg-primary/10">
                  {username
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/my-ebooks")}>
              <Library className="mr-2 h-4 w-4" />
              <span>My Ebooks</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b z-50 p-4">
          <nav className="flex flex-col space-y-4">
            <NavItem
              to="/dashboard"
              icon={<BarChart2 className="h-4 w-4 mr-2" />}
              label="Dashboard"
              active={location.pathname === "/dashboard"}
              onClick={() => handleNavigation("/dashboard")}
            />
            <NavItem
              to="/niche-analysis"
              icon={<BarChart2 className="h-4 w-4 mr-2" />}
              label="Niche Analysis"
              active={location.pathname === "/niche-analysis"}
              onClick={() => handleNavigation("/niche-analysis")}
            />
            <NavItem
              to="/my-ebooks"
              icon={<Library className="h-4 w-4 mr-2" />}
              label="My Ebooks"
              active={location.pathname === "/my-ebooks"}
              onClick={() => handleNavigation("/my-ebooks")}
            />
            <Button
              className="w-full justify-start flex items-center gap-2"
              variant="outline"
              onClick={handleCreateEbook}
            >
              <Plus className="h-4 w-4" />
              Create New Ebook
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({
  to,
  icon,
  label,
  active = false,
  onClick,
}: NavItemProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center text-sm font-medium transition-colors hover:text-primary",
        active ? "text-primary" : "text-muted-foreground",
      )}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Header;
