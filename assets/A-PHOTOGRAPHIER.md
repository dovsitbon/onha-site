# Photos à prendre au restaurant

Le site n'a que deux vraies photos (le bánh mì et les cafés au phin). Partout ailleurs, une illustration au trait
tient la place. Pour la remplacer : déposez la photo **sous le nom indiqué**, puis lancez `npm run media`
(et poussez sur GitHub : Vercel redéploie seul). Format libre (JPG, PNG, HEIC), le script redimensionne et sert du WebP/AVIF.

Conseils : lumière du jour, de près, bol vu à 45° ou de dessus, fond simple (le comptoir en bois est parfait).
Pas de texte incrusté ni de filtre.

| Fichier | Où il apparaît |
|---|---|
| `assets/hero/hero.jpg` | Grande photo d'accueil (remplace le bánh mì si vous en avez une meilleure, format paysage) |
| `assets/plats/banh-mi.jpg` | Carte, onglet Bánh mì + tuile |
| `assets/plats/bun-thit.jpg` | Carte, onglet Bún |
| `assets/plats/bo-bun.jpg` | Carte, onglet Bún + tuile « Bún » |
| `assets/plats/bo-bun-vegan.jpg` | Carte, onglet Végé + tuile « Végé & végan » |
| `assets/plats/tofu-bowl.jpg` | Carte, onglet Bowls + tuile « Bowls » |
| `assets/plats/nems-legumes.jpg` | Carte, onglet Bowls |
| `assets/desserts/dessert-du-jour.jpg` | Carte, onglet Desserts + tuile « Desserts » |
| `assets/desserts/perles-tapioca.jpg` | Carte, onglet Desserts |
| `assets/desserts/banane-tapioca.jpg` | Carte, onglet Desserts |
| `assets/desserts/dessert-mangue.jpg` | Carte, onglet Desserts |
| `assets/restaurant/freres.jpg` | Bloc « Notre histoire » (les deux frères derrière le comptoir) |
| `assets/restaurant/facade.jpg` | Infos pratiques, au-dessus du plan |
| `assets/restaurant/comptoir.jpg`, `salle.jpg` | Galerie |
| `assets/galerie/*.jpg` | Galerie « Dans nos bols cette semaine » (toutes les photos du dossier, 7 max) |

Tuiles d'accueil : pour une photo différente de celle de la carte, nommez-la `assets/plats/tuile-bun.jpg`,
`tuile-bowls.jpg`, `tuile-vege.jpg`, `tuile-banh-mi.jpg` ou `assets/desserts/tuile-desserts.jpg`.
