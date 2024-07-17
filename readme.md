## Fonctionnalités :

- Page de connexion vulnérable à l'injection SQL : Testez l'injection SQL en entrant ' OR '1'='1 comme nom d'utilisateur et mot de passe.

- Page de démonstration XSS : Testez les attaques XSS en entrant <script>alert('XSS')</script> comme nom.

- Formulaire vulnérable à CSRF : Testez l'attaque CSRF en soumettant le formulaire.
  

## what to do ?

1. Analyser et identifier les vulnérabilités :
   
Examinez le code source pour repérer les vulnérabilités SQL, XSS et CSRF.

2. Corriger les vulnérabilités :
Injection SQL : Utilisez des requêtes préparées.
XSS : Encodez les entrées utilisateur avant de les afficher.
CSRF : Implémentez des tokens CSRF pour protéger les formulaires.

3. Ajouter des bonnes pratiques :
HTTPS : Configurez HTTPS pour chiffrer les communications.
Authentification et autorisation robustes : Mettez en place un système sécurisé.
Audit de sécurité : Utilisez des outils comme OWASP ZAP pour scanner l'application.

4. Documenter les résultats :
Rédigez un rapport sur les vulnérabilités identifiées et les correctifs appliqués.
Préparez une présentation des résultats et des mesures de sécurité mises en place et l'envoyez à #lawalalaoad@gmail.com

Fork into your own repositery , create a new branch under your name (name_vulnerable-app) and work on this branch. At the end make a PR to my repositery.


# Rapport sur les vulnérabilités identifiées et les correctifs appliqués

- Injection SQL
  - Vulnérabilité identifiée: Les requêtes SQL étaient générées en concaténant directement les entrées utilisqteur, ce qui pouvait permettre des injections SQL.
  - Correctif appliqué: Utilisation des requêtes préparées pour éviter l'injection SQL.
  
- XSS
  - Vulnérabilité identifiée: Les entrées utilisateur étaient afficheées directement sans être échappées; ce qui permettait l'exécution de scripts malveillants.
  - Correctif appliqué: Echappement des caractères spéciaux HTML pour éviter l'exécution de scripts malveillants.
  
- CSRF
  - Vulnérabilité identifiée: Les for;ulaires sensibles n'incluaient pas de protections contre les attaques CSRF.
  - Correctif appliqué: Utilisation de jetons CSRF pour valider les requêtes POST.