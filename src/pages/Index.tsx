import { Layout } from "@/components/layout/Layout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  School, 
  GraduationCap, 
  CreditCard, 
  TrendingUp,
  UserPlus,
  BookOpen,
  AlertCircle
} from "lucide-react";

const Index = () => {
  // Mock data - à remplacer par de vraies données de la base
  const stats = [
    {
      title: "Total Élèves",
      value: 247,
      icon: <Users className="h-4 w-4" />,
      description: "Élèves inscrits cette année",
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Classes Actives",
      value: 12,
      icon: <School className="h-4 w-4" />,
      description: "De la maternelle au CM2",
    },
    {
      title: "Enseignants",
      value: 18,
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Professeurs en poste",
    },
    {
      title: "Recettes Mensuelles",
      value: "1,250,000 FCFA",
      icon: <CreditCard className="h-4 w-4" />,
      description: "Revenus de ce mois",
      trend: { value: 8, isPositive: true }
    }
  ];

  const recentActivities = [
    { type: "Nouveau", description: "Marie KOUAME inscrite en CP1", time: "Il y a 2h" },
    { type: "Paiement", description: "Jean DIALLO - Frais scolarité 1", time: "Il y a 3h" },
    { type: "Note", description: "Notes de Mathématiques saisies - CM2", time: "Il y a 5h" },
    { type: "Absence", description: "5 absences signalées ce matin", time: "Il y a 6h" },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de Bord</h1>
            <p className="text-muted-foreground">
              Vue d'ensemble de l'école La Roseraie
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-gradient-primary hover:opacity-90">
              <UserPlus className="mr-2 h-4 w-4" />
              Nouvel Élève
            </Button>
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Saisir Notes
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Actions Rapides
              </CardTitle>
              <CardDescription>
                Accès direct aux tâches courantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Gérer les Élèves
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CreditCard className="mr-2 h-4 w-4" />
                Enregistrer Paiement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Notes & Bulletins
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <School className="mr-2 h-4 w-4" />
                Gestion Classes
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-soft lg:col-span-2">
            <CardHeader>
              <CardTitle>Activités Récentes</CardTitle>
              <CardDescription>
                Les dernières actions dans le système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'Nouveau' ? 'bg-secondary' :
                      activity.type === 'Paiement' ? 'bg-primary' :
                      activity.type === 'Note' ? 'bg-accent' : 'bg-destructive'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="shadow-soft border-l-4 border-l-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Alertes & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">• 15 élèves en retard de paiement</p>
              <p className="text-sm">• Bulletin du 1er trimestre à finaliser</p>
              <p className="text-sm">• Réunion pédagogique prévue demain</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
