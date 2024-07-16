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
