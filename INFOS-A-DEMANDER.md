# ONHA : infos à demander au restaurant

Le site est en ligne avec ce qu'on a pu vérifier (carte publiée, bio Instagram, page Facebook, annuaire des entreprises).
Voici ce qu'il manque, par ordre d'importance. Chaque réponse se change dans un seul fichier.

| # | Question | Ce qu'on a aujourd'hui | Où le changer |
|---|---|---|---|
| 1 | **La carte complète et les prix** : prix du bò bún végan, du tofu bowl, des nems aux légumes ? D'autres plats ? Les desserts tournent-ils (perles de tapioca, banane, mangue) ? Quelles boissons à 2 € ? | Bánh mì 6,70 €, bún thịt 8,20 €, bò bún 9,30 €, boisson 2 €, dessert 3,50 € (carte publiée). Trois prix manquants : affichés « Prix sur place ». | `data/carte.json` + `locales/*.json → products` |
| 2 | **La carte « ONHA Café »** (cà phê đen 2 €, sữa 2,50 €, trứng 3,50 €, filtre du jour, V60) est-elle servie rue Saint-Leu ? | Affichée dans l'onglet « Boissons & cà phê ». | `data/carte.json` |
| 3 | **La formule du midi** : existe-t-elle, à quel prix, avec quoi ? | « Plat + boisson 2 € + dessert 3,50 € », sans prix de formule. | `data/menu-du-jour.json → formula.price` |
| 4 | **Les bons horaires** : midi jusqu'à 13 h 30 (Instagram) ou 14 h (certains annuaires) ? Le soir : mardi, jeudi, vendredi ? Fermetures prévues (vacances, fêtes) ? | Horaires de la bio Instagram. Fermé les 25/12 et 01/01. | `data/horaires.json` |
| 5 | **Le menu du jour** : qui le saisit, et comment ? (Possible : ils nous l'envoient et on l'ajoute, ou on leur montre comment modifier le fichier.) | Texte générique + lien vers les stories. | `data/menu-du-jour.json → days` |
| 6 | **Leurs prénoms et leur histoire** : origine de la famille, depuis quand, pourquoi la rue Saint-Leu. « Ở nhà » est-il bien l'origine du nom ? | Texte « deux frères, cuisine de famille, ở nhà = à la maison ». | `locales/*.json → story` |
| 7 | **Les allergènes** : cacahuète, soja, gluten, œuf, sésame ? Qu'est-ce qui est vraiment végan (sauces, nems, desserts) ? | Mention générale + « demandez-nous ». | `locales/*.json → faq, carte.allergens` ; pastilles dans `data/carte.json → tags` |
| 8 | **Un portable pour WhatsApp** (le 09 87 18 79 29 est un fixe). | WhatsApp désactivé ; « Appeler pour commander » partout. | `data/site.json → whatsapp` (format 336XXXXXXXX) |
| 9 | **L'e-mail qui reçoit les commandes** (onhaboutique@gmail.com, vu sur Facebook ?). | Commande prête, envoi par e-mail **pas encore branché** : le client voit « Dernière étape : un appel ». | Vercel → variables `RESEND_API_KEY`, `ORDER_NOTIFY_EMAIL`, `RESEND_FROM` |
| 10 | **Des photos** : plats, comptoir, salle, façade, les deux frères. | 2 vraies photos seulement ; illustrations au trait ailleurs. | voir `assets/A-PHOTOGRAPHIER.md` |
| 11 | **Le logo d'origine** (fichier vectoriel). | Logo redessiné en SVG d'après la photo de profil Instagram. | `public/logo.svg`, `public/logo-rond.svg` |
| 12 | **SIRET et directeur de la publication** pour les mentions légales. | SIRET trouvé sur l'annuaire des entreprises : 830 673 448 00023 (à confirmer). Directeur : à compléter. | `data/site.json → legal` |
| 13 | **Un nom de domaine** (onha-amiens.fr ?). | https://onha-amiens.vercel.app | Vercel + `data/site.json → url` |

## Note Google

4,8/5 sur 191 avis, relevée le 21 octobre 2026 (fiche restaurants-de-france). À revérifier sur la fiche Google le jour de la présentation : `data/site.json → rating`.
