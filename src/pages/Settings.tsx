import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  School, 
  Users, 
  Lock, 
  Database, 
  Download,
  Upload,
  AlertTriangle,
  Save
} from "lucide-react";

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
            <p className="text-muted-foreground">
              Configuration et administration du système
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Save className="mr-2 h-4 w-4" />
            Sauvegarder
          </Button>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="ecole" className="space-y-4">
          <TabsList>
            <TabsTrigger value="ecole">École</TabsTrigger>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="securite">Sécurité</TabsTrigger>
            <TabsTrigger value="donnees">Données</TabsTrigger>
          </TabsList>

          <TabsContent value="ecole" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-5 w-5" />
                  Informations de l'École
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nom-ecole">Nom de l'école</Label>
                    <Input id="nom-ecole" defaultValue="Complexe Scolaire La Roseraie" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type-ecole">Type d'établissement</Label>
                    <Input id="type-ecole" defaultValue="Primaire et Maternelle" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adresse">Adresse</Label>
                  <Textarea 
                    id="adresse" 
                    placeholder="Adresse complète de l'école..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input id="telephone" placeholder="07 XX XX XX XX" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="contact@laroseraie.edu" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="annee-scolaire">Année scolaire</Label>
                    <Input id="annee-scolaire" defaultValue="2023-2024" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Configuration Générale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications par email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications pour les paiements en retard
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Désactiver l'accès au système pour maintenance
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="devise">Devise par défaut</Label>
                  <Input id="devise" defaultValue="FCFA" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilisateurs" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestion des Utilisateurs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">Administrateur Principal</p>
                      <p className="text-sm text-muted-foreground">admin@laroseraie.edu</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Modifier
                    </Button>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Ajouter un Utilisateur
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Gestion des élèves</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Gestion financière</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Génération de rapports</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Administration système</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="securite" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Sécurité et Authentification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mot-de-passe">Nouveau mot de passe</Label>
                  <Input id="mot-de-passe" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmer-mdp">Confirmer le mot de passe</Label>
                  <Input id="confirmer-mdp" type="password" />
                </div>

                <Button variant="outline" className="w-full">
                  Changer le mot de passe
                </Button>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Paramètres de sécurité</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Sécurité renforcée avec SMS ou email
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Déconnexion automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Après 30 minutes d'inactivité
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-l-4 border-l-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  Zone Dangereuse
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Réinitialisation du système</Label>
                  <p className="text-sm text-muted-foreground">
                    Supprimer toutes les données et remettre à zéro
                  </p>
                  <Button variant="destructive" size="sm">
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donnees" className="space-y-4">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Gestion des Données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Sauvegarde</h4>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Sauvegarder les données
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Restaurer les données
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Dernière sauvegarde: 15 janvier 2024 à 14:30
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Sauvegarde automatique</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Activer la sauvegarde automatique</Label>
                      <p className="text-sm text-muted-foreground">
                        Sauvegarde quotidienne à 2h00
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Import/Export</h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Importer élèves (Excel)
                    </Button>
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Exporter toutes les données
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Statistiques de stockage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Données élèves</span>
                    <span className="text-sm font-medium">1.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Photos et documents</span>
                    <span className="text-sm font-medium">45.8 MB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Historique des notes</span>
                    <span className="text-sm font-medium">3.1 MB</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total utilisé</span>
                    <span>50.1 MB / 1 GB</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;