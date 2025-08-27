import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CreditCard, 
  BarChart3, 
  Settings,
  Menu,
  X,
  School
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/", icon: BarChart3 },
  { name: "Élèves", href: "/students", icon: Users },
  { name: "Classes", href: "/classes", icon: School },
  { name: "Enseignants", href: "/teachers", icon: GraduationCap },
  { name: "Notes & Examens", href: "/grades", icon: BookOpen },
  { name: "Finances", href: "/finances", icon: CreditCard },
  { name: "Rapports", href: "/reports", icon: BarChart3 },
  { name: "Paramètres", href: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-background/80 backdrop-blur-sm"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-primary">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <School className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-primary-foreground">La Roseraie</h1>
                <p className="text-sm text-primary-foreground/80">Gestion Scolaire</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground text-center">
              <p>Complexe Scolaire</p>
              <p>Primaire et Maternelle</p>
              <p className="font-semibold text-primary">"La Roseraie"</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};