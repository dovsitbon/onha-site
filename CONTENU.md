# ONHA – Vietnam Street-Food : contenu du site (à valider)

Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.

## À faire valider en priorité

- **« Ở nhà » = « à la maison »** : c'est le fil conducteur du bloc « Notre histoire ». Est-ce bien l'origine du nom ?
- **L'histoire** : rédigée à partir de ce qu'on sait (deux frères, cuisine de famille, « fait maison & en famille » dans la bio Instagram, « On prend le temps » dans un reel). Prénoms, origine de la famille, date d'ouverture à ajouter.
- **Les prix** : relevés sur leur carte publiée (bánh mì 6,70 €, bún thịt 8,20 €, bò bún 9,30 €, boisson 2 €, dessert 3,50 €) et sur la carte « ONHA Café » (cafés). Prix manquants : bò bún végan, tofu bowl, nems aux légumes.
- **La carte café** (cà phê đen, sữa, trứng, filtres) : vient d'une carte « ONHA Café ». Est-elle servie rue Saint-Leu ?
- **La formule du midi** : aucun prix connu. Le site affiche « plat + boisson 2 € + dessert 3,50 € » tant que `data/menu-du-jour.json → formula.price` est vide.
- **Les horaires** (bio Instagram) : à confirmer, d'autres sites indiquent 14 h le midi. La note Google affichée : 4,8/5 sur 191 avis, relevée le 2026-10-21.
- **Les allergènes** et ce qui est réellement végan (sauces, nems, desserts).

## Référencement (balises title / description)

**FR** · Restaurant vietnamien à Amiens Saint-Leu : bánh mì, bò bún | ONHA Vietnam Street-Food

> Street-food vietnamienne faite maison, en famille, au 11 rue Saint-Leu à Amiens : bánh mì, bò bún, bún thịt, bowls, desserts et options véganes. Sur place ou à emporter, commande en ligne.

**EN** · Vietnamese restaurant in Amiens Saint-Leu: bánh mì, bò bún | ONHA Vietnam Street-Food

> Homemade Vietnamese street food, cooked by a family at 11 rue Saint-Leu in Amiens: bánh mì, bò bún, bún thịt, bowls, desserts and vegan options. Eat in or take away, order online.

## Horaires (data/horaires.json)

- Lundi : 11:30 – 13:30
- Mardi : 11:30 – 13:30, 18:30 – 20:30
- Mercredi : 11:30 – 13:30
- Jeudi : 11:30 – 13:30, 18:30 – 20:30
- Vendredi : 11:30 – 13:30, 18:30 – 20:30
- Samedi : 11:30 – 13:30
- Dimanche : fermé

## La carte et les prix (data/carte.json)

Relevés le 2026-11-05.

- Garnitures : Porc laqué / Lacquered pork · Poulet saté / Satay chicken · Tofu cinq parfums (végé) / Five-spice tofu (veggie)
- Sauces : Mayo épicée / Spicy mayo · Cacahuète et soja fumé / Peanut and smoked soy · Soja salé / Salty soy

### Bánh mì / Bánh mì

| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Bánh mì | Bánh mì | Bánh mì | 6,70 € | Option végé | Le sandwich baguette croustillant : votre garniture, légumes pickles, concombre et herbes fraîches. | The crunchy baguette sandwich: your filling, pickled vegetables, cucumber and fresh herbs. |

### Bún / Bún

| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Bún thịt | Bún thịt | Bún thịt | 8,20 € | Option végé | Un bol frais et généreux : vermicelles de riz, votre garniture, légumes pickles et herbes fraîches. | A fresh, generous bowl: rice vermicelli, your filling, pickled vegetables and fresh herbs. |
| Bò bún | Bò bún | Bò bún | 9,30 € | Option végé | Le bol gourmand : vermicelles de riz, nem croustillant, légumes, herbes fraîches et sauce maison. | The hearty bowl: rice vermicelli, a crispy spring roll, vegetables, fresh herbs and our own sauce. |
| Bò bún végan | Vegan bò bún | Bò bún chay | **à confirmer** | Végan | La version sans produit animal : tofu cinq parfums, vermicelles, légumes croquants et herbes. | The plant-based version: five-spice tofu, vermicelli, crunchy vegetables and herbs. |

### Bowls & nems / Bowls & spring rolls

| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Tofu bowl, sauce piquante | Tofu bowl, hot sauce | Tofu bowl | **à confirmer** | Végétarien, Épicé | Tofu, légumes croquants, herbes fraîches et une sauce qui pique juste ce qu'il faut. | Tofu, crunchy vegetables, fresh herbs and a sauce with just the right kick. |
| Nems aux légumes | Vegetable spring rolls | Nem chay | **à confirmer** | Végétarien | Croustillants, avec leur sauce à tremper. | Crispy, with their dipping sauce. |

### Desserts / Desserts

| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Dessert du jour | Dessert of the day | Tráng miệng | 3,50 € |  | Une douceur différente chaque jour, souvent au lait de coco. Elle est en story à la une sur Instagram. | A different sweet every day, often with coconut milk. It's in our Instagram highlights. |
| Perles de tapioca | Tapioca pearls | Chè bột báng | 3,50 € | Végétarien | Perles de tapioca fondantes au lait de coco. | Soft tapioca pearls in coconut milk. |
| Banane au tapioca | Banana and tapioca | Chè chuối | 3,50 € | Végétarien | Banane, perles de tapioca et lait de coco. | Banana, tapioca pearls and coconut milk. |
| Dessert à la mangue | Mango dessert | Xoài | 3,50 € | Végétarien | Frais et fruité, à la mangue. | Fresh and fruity, with mango. |

### Boissons & cà phê / Drinks & cà phê

| Plat (FR) | Dish (EN) | Nom vietnamien | Prix | Pastilles | Description FR | Description EN |
|---|---|---|---|---|---|---|
| Boisson au choix | Drink of your choice |  | 2,00 € |  | Une boisson fraîche, à choisir au comptoir. | A cold drink, picked at the counter. |
| Café noir vietnamien | Vietnamese black coffee | Cà phê đen | 2,00 € | Végan | Préparé au phin, le filtre vietnamien : corsé et intense. | Brewed in a phin, the Vietnamese drip filter: strong and intense. |
| Café au lait concentré | Coffee with condensed milk | Cà phê sữa | 2,50 € | Végétarien | Le café du phin sur du lait concentré sucré : rond et gourmand. | Phin coffee over sweet condensed milk: smooth and indulgent. |
| Café à l'œuf | Egg coffee | Cà phê trứng | 3,50 € | Végétarien | Café noir surmonté d'un sabayon à l'œuf sucré, comme à Hanoï. | Black coffee topped with a sweet egg sabayon, Hanoi-style. |
| Filtre du jour | Batch brew of the day |  | M · 200 ml 2,20 €, L · 350 ml 3,00 € | Végan | Café filtre doux, à l'amertume légère, facile à boire. | Gentle filter coffee with a light bitterness, easy to drink. |
| Filtre à la demande (V60) | Pour-over (V60) |  | 4,00 € | Végan | Préparé à la main, aux notes fruitées. Comptez quelques minutes. | Brewed by hand, with fruity notes. Allow a few minutes. |

## Menu du jour (data/menu-du-jour.json)

- Formule : Un plat, une boisson et le dessert du jour (prix : **à confirmer**)
- Texte affiché quand le plat du jour n'est pas saisi : Chaque matin, un plat du jour en plus de la carte. Il est écrit sur l'ardoise et posté dans nos stories Instagram.

## Textes du site

### nav

- `nav.skip`
  - FR : Aller au contenu
  - EN : Skip to content
- `nav.menu`
  - FR : Menu
  - EN : Menu
- `nav.close`
  - FR : Fermer
  - EN : Close
- `nav.home`
  - FR : ONHA, accueil
  - EN : ONHA, home
- `nav.carte`
  - FR : La carte
  - EN : Menu
- `nav.today`
  - FR : Menu du jour
  - EN : Today's special
- `nav.order`
  - FR : À emporter
  - EN : Takeaway
- `nav.story`
  - FR : Notre histoire
  - EN : Our story
- `nav.infos`
  - FR : Infos
  - EN : Info
- `nav.orderCta`
  - FR : Commander à emporter
  - EN : Order takeaway
- `nav.orderShort`
  - FR : Commander
  - EN : Order
- `nav.call`
  - FR : Appeler
  - EN : Call
- `nav.instagram`
  - FR : ONHA sur Instagram
  - EN : ONHA on Instagram
- `nav.facebook`
  - FR : ONHA sur Facebook
  - EN : ONHA on Facebook
- `nav.lang`
  - FR : Langue
  - EN : Language

### intro

- `intro.skip`
  - FR : Passer
  - EN : Skip

### announce

- `announce.close`
  - FR : Fermer le bandeau
  - EN : Close the banner

### hero

- `hero.eyebrow`
  - FR : Street-food vietnamienne · Saint-Leu, Amiens
  - EN : Vietnamese street food · Saint-Leu, Amiens
- `hero.title`
  - FR : La cuisine de la maison, version street-food
  - EN : Home cooking, street-food style
- `hero.sub`
  - FR : Bánh mì croustillant, bò bún généreux, herbes fraîches et pickles maison. Faits en famille, à manger sur place ou à emporter.
  - EN : Crunchy bánh mì, generous bò bún, fresh herbs and homemade pickles. Cooked by a family, to eat in or take away.
- `hero.ctaMenu`
  - FR : Voir la carte
  - EN : See the menu
- `hero.ctaOrder`
  - FR : Commander à emporter
  - EN : Order takeaway
- `hero.rating`
  - FR : {value}/5 sur Google
  - EN : {value}/5 on Google
- `hero.ratingCount`
  - FR : {count} avis
  - EN : {count} reviews
- `hero.ratingNote`
  - FR : Note Google relevée le {date}
  - EN : Google rating checked on {date}

### status

- `status.open`
  - FR : Ouvert maintenant
  - EN : Open now
- `status.closed`
  - FR : Fermé en ce moment
  - EN : Closed right now
- `status.until`
  - FR : jusqu'à {time}
  - EN : until {time}
- `status.opens`
  - FR : ouvre {day} à {time}
  - EN : opens {day} at {time}
- `status.today`
  - FR : aujourd'hui
  - EN : today
- `status.tomorrow`
  - FR : demain
  - EN : tomorrow

### tiles

- `tiles.title`
  - FR : Par où commencer
  - EN : Where to start
- `tiles.items.banh-mi`
  - FR : Bánh mì
  - EN : Bánh mì
- `tiles.items.bun`
  - FR : Bún
  - EN : Bún
- `tiles.items.bowls`
  - FR : Bowls
  - EN : Bowls
- `tiles.items.vege`
  - FR : Végé & végan
  - EN : Veggie & vegan
- `tiles.items.desserts`
  - FR : Desserts
  - EN : Desserts

### today

- `today.eyebrow`
  - FR : Menu du jour
  - EN : Today's special
- `today.title`
  - FR : Aujourd'hui chez ONHA
  - EN : Today at ONHA
- `today.dish`
  - FR : Le plat
  - EN : The dish
- `today.dessert`
  - FR : Le dessert
  - EN : The dessert
- `today.formula`
  - FR : La formule du midi
  - EN : Lunch deal
- `today.formulaPrice`
  - FR : {price} la formule
  - EN : {price} for the deal
- `today.formulaDetail`
  - FR : Votre plat, une boisson à {drink} et le dessert du jour à {dessert}.
  - EN : Your main, a drink for {drink} and the dessert of the day for {dessert}.
- `today.noEntry`
  - FR : Le plat du jour
  - EN : Dish of the day
- `today.follow`
  - FR : Voir les stories
  - EN : See our stories
- `today.dateLabel`
  - FR : {date}
  - EN : {date}

### story

- `story.eyebrow`
  - FR : Notre histoire
  - EN : Our story
- `story.title`
  - FR : Ở nhà, « à la maison »
  - EN : Ở nhà, “at home”
- `story.p1`
  - FR : ONHA vient de « ở nhà », qui veut dire « à la maison » en vietnamien. C'est exactement ce qu'on cuisine : les plats de notre famille, version street-food.
  - EN : ONHA comes from “ở nhà”, which means “at home” in Vietnamese. That's exactly what we cook: our family's dishes, street-food style.
- `story.p2`
  - FR : Derrière le comptoir de la rue Saint-Leu, on est deux frères. Les pickles, les sauces et les marinades sont faits ici, chaque jour, et le menu reste court pour que tout soit frais.
  - EN : Behind the counter on rue Saint-Leu, we're two brothers. The pickles, sauces and marinades are made here every day, and the menu stays short so everything is fresh.
- `story.p3`
  - FR : Ici, on prend le temps. Le café coule goutte à goutte dans son phin, le plat du jour change chaque matin, et on est contents de vous expliquer ce qu'il y a dans le bol.
  - EN : Here, we take our time. Coffee drips slowly through its phin, the dish of the day changes every morning, and we're happy to tell you what's in your bowl.
- `story.facts[0]`
  - FR : Fait maison, en famille
  - EN : Homemade, by a family
- `story.facts[1]`
  - FR : Un plat du jour chaque matin
  - EN : A new dish every morning
- `story.facts[2]`
  - FR : Options végé et végan
  - EN : Veggie and vegan options
- `story.photoNote`
  - FR : Les deux frères
  - EN : The two brothers

### gallery

- `gallery.eyebrow`
  - FR : Instagram
  - EN : Instagram
- `gallery.title`
  - FR : Dans nos bols cette semaine
  - EN : In our bowls this week
- `gallery.follow`
  - FR : Suivre @onha_family
  - EN : Follow @onha_family
- `gallery.close`
  - FR : Fermer
  - EN : Close
- `gallery.prev`
  - FR : Photo précédente
  - EN : Previous photo
- `gallery.next`
  - FR : Photo suivante
  - EN : Next photo
- `gallery.counter`
  - FR : {n} sur {total}
  - EN : {n} of {total}
- `gallery.open`
  - FR : Agrandir la photo
  - EN : Enlarge photo

### order

- `order.eyebrow`
  - FR : À emporter
  - EN : Takeaway
- `order.title`
  - FR : Commandez, on prépare, vous passez
  - EN : You order, we cook, you pick up
- `order.intro`
  - FR : Choisissez vos plats et votre heure de retrait. On vous rappelle si besoin, et vous réglez au comptoir, par carte ou paiement mobile.
  - EN : Choose your dishes and a pick-up time. We'll call you if needed, and you pay at the counter by card or mobile payment.
- `order.callTitle`
  - FR : Plus simple au téléphone ?
  - EN : Easier on the phone?
- `order.callText`
  - FR : Appelez-nous pendant le service, on note tout.
  - EN : Call us during service and we'll take it down.
- `order.callCta`
  - FR : Appeler pour commander
  - EN : Call to order
- `order.itemsTitle`
  - FR : Vos plats
  - EN : Your dishes
- `order.pickupTitle`
  - FR : Retrait
  - EN : Pick-up
- `order.prefsTitle`
  - FR : Vos préférences
  - EN : Your preferences
- `order.contactTitle`
  - FR : Vos coordonnées
  - EN : Your details
- `order.dish`
  - FR : Plat
  - EN : Dish
- `order.quantity`
  - FR : Quantité
  - EN : Quantity
- `order.garniture`
  - FR : Garniture
  - EN : Filling
- `order.sauce`
  - FR : Sauce
  - EN : Sauce
- `order.size`
  - FR : Taille
  - EN : Size
- `order.addLine`
  - FR : Ajouter un plat
  - EN : Add a dish
- `order.removeLine`
  - FR : Retirer ce plat
  - EN : Remove this dish
- `order.day`
  - FR : Jour
  - EN : Day
- `order.time`
  - FR : Heure
  - EN : Time
- `order.today`
  - FR : Aujourd'hui
  - EN : Today
- `order.tomorrow`
  - FR : Demain
  - EN : Tomorrow
- `order.noSlots`
  - FR : Plus de créneau ce jour-là : choisissez un autre jour.
  - EN : No time left that day: please pick another day.
- `order.prefs.noCoriander`
  - FR : Sans coriandre
  - EN : No coriander
- `order.prefs.mild`
  - FR : Pas épicé
  - EN : Not spicy
- `order.prefs.spicy`
  - FR : Bien épicé
  - EN : Extra spicy
- `order.prefs.vegan`
  - FR : Version végan
  - EN : Vegan version
- `order.name`
  - FR : Nom
  - EN : Name
- `order.phone`
  - FR : Téléphone
  - EN : Phone
- `order.email`
  - FR : E-mail (facultatif)
  - EN : Email (optional)
- `order.emailHint`
  - FR : Pour recevoir le récapitulatif de votre commande.
  - EN : To get a summary of your order.
- `order.message`
  - FR : Un mot pour la cuisine ?
  - EN : A note for the kitchen?
- `order.messagePh`
  - FR : Allergie, sans cacahuète, couverts…
  - EN : Allergy, no peanuts, cutlery…
- `order.total`
  - FR : Total estimé
  - EN : Estimated total
- `order.totalNote`
  - FR : Certains prix restent à confirmer au comptoir.
  - EN : Some prices are confirmed at the counter.
- `order.submit`
  - FR : Envoyer ma commande
  - EN : Send my order
- `order.sending`
  - FR : Envoi…
  - EN : Sending…
- `order.payNote`
  - FR : Pas de paiement en ligne : vous réglez au retrait, par carte ou paiement mobile.
  - EN : No online payment: you pay when you pick up, by card or mobile payment.
- `order.errors.lines`
  - FR : Choisissez au moins un plat.
  - EN : Please choose at least one dish.
- `order.errors.day`
  - FR : Choisissez un jour.
  - EN : Please choose a day.
- `order.errors.time`
  - FR : Choisissez une heure de retrait.
  - EN : Please choose a pick-up time.
- `order.errors.name`
  - FR : Indiquez votre nom.
  - EN : Please enter your name.
- `order.errors.phone`
  - FR : Indiquez un numéro de téléphone valide.
  - EN : Please enter a valid phone number.
- `order.errors.email`
  - FR : Cette adresse e-mail ne semble pas valide.
  - EN : This email address doesn't look right.
- `order.errors.send`
  - FR : L'envoi n'a pas fonctionné. Appelez-nous, on prend votre commande au téléphone.
  - EN : Sending didn't work. Give us a call and we'll take your order over the phone.
- `order.done.title`
  - FR : C'est noté !
  - EN : Got it!
- `order.done.text`
  - FR : Votre commande est partie en cuisine. Si on a une question, on vous appelle.
  - EN : Your order is in the kitchen. If we have a question, we'll call you.
- `order.done.pendingTitle`
  - FR : Dernière étape : un appel
  - EN : One last step: a call
- `order.done.pendingText`
  - FR : Votre récapitulatif est prêt. Appelez-nous pour confirmer la commande, on la lance tout de suite.
  - EN : Your summary is ready. Call us to confirm the order and we'll get cooking right away.
- `order.done.mail`
  - FR : Un récapitulatif a été envoyé à {email}.
  - EN : A summary has been sent to {email}.
- `order.done.again`
  - FR : Nouvelle commande
  - EN : New order
- `order.whatsapp`
  - FR : Envoyer sur WhatsApp
  - EN : Send on WhatsApp
- `order.mail.subject`
  - FR : Commande à emporter
  - EN : Takeaway order
- `order.mail.title`
  - FR : Nouvelle commande à emporter
  - EN : New takeaway order
- `order.mail.lines`
  - FR : Plats
  - EN : Dishes
- `order.mail.pickup`
  - FR : Retrait
  - EN : Pick-up
- `order.mail.prefs`
  - FR : Préférences
  - EN : Preferences
- `order.mail.name`
  - FR : Nom
  - EN : Name
- `order.mail.phone`
  - FR : Téléphone
  - EN : Phone
- `order.mail.email`
  - FR : E-mail
  - EN : Email
- `order.mail.message`
  - FR : Message
  - EN : Message
- `order.mail.total`
  - FR : Total estimé
  - EN : Estimated total
- `order.mail.lang`
  - FR : Langue du client
  - EN : Customer language
- `order.mail.confirmSubject`
  - FR : ONHA : votre commande à emporter
  - EN : ONHA: your takeaway order
- `order.mail.confirmIntro`
  - FR : Bonjour {name}, merci pour votre commande ! La voici :
  - EN : Hi {name}, thanks for your order! Here it is:
- `order.mail.confirmOutro`
  - FR : Vous réglez au retrait, par carte ou paiement mobile. Une question ? Appelez-nous au 09 87 18 79 29. ↵  ↵ À tout à l'heure, ↵ ONHA, 11 rue Saint-Leu, Amiens
  - EN : You pay when you pick up, by card or mobile payment. Any question? Call us on +33 9 87 18 79 29. ↵  ↵ See you soon, ↵ ONHA, 11 rue Saint-Leu, Amiens

### infos

- `infos.eyebrow`
  - FR : Infos pratiques
  - EN : Practical info
- `infos.title`
  - FR : Rue Saint-Leu, au bord de l'eau
  - EN : Rue Saint-Leu, by the water
- `infos.address`
  - FR : Adresse
  - EN : Address
- `infos.access`
  - FR : Venir
  - EN : Getting here
- `infos.accessText`
  - FR : Au cœur du quartier Saint-Leu, à quelques minutes à pied de la cathédrale et des quais de la Somme. Le quartier se visite à pied : garez-vous en centre-ville.
  - EN : In the heart of the Saint-Leu quarter, a few minutes' walk from the cathedral and the banks of the Somme. The quarter is best explored on foot: park in the city centre.
- `infos.phone`
  - FR : Téléphone
  - EN : Phone
- `infos.hours`
  - FR : Horaires
  - EN : Opening hours
- `infos.route`
  - FR : Itinéraire
  - EN : Directions
- `infos.mapTitle`
  - FR : Carte : ONHA, 11 rue Saint-Leu, Amiens
  - EN : Map: ONHA, 11 rue Saint-Leu, Amiens
- `infos.days[0]`
  - FR : Lundi
  - EN : Monday
- `infos.days[1]`
  - FR : Mardi
  - EN : Tuesday
- `infos.days[2]`
  - FR : Mercredi
  - EN : Wednesday
- `infos.days[3]`
  - FR : Jeudi
  - EN : Thursday
- `infos.days[4]`
  - FR : Vendredi
  - EN : Friday
- `infos.days[5]`
  - FR : Samedi
  - EN : Saturday
- `infos.days[6]`
  - FR : Dimanche
  - EN : Sunday
- `infos.closed`
  - FR : Fermé
  - EN : Closed
- `infos.services`
  - FR : Sur place · À emporter · Carte bancaire · Paiement mobile
  - EN : Eat in · Takeaway · Card · Mobile payment

### faq

- `faq.eyebrow`
  - FR : Questions fréquentes
  - EN : FAQ
- `faq.title`
  - FR : Bon à savoir
  - EN : Good to know
- `faq.items[0].q`
  - FR : Avez-vous des plats végétariens et végans ?
  - EN : Do you have vegetarian and vegan dishes?
- `faq.items[0].a`
  - FR : Oui. Chaque bánh mì et chaque bún existe avec du tofu cinq parfums. Demandez la version végan à la commande : on adapte la sauce et les garnitures. Il y a aussi un bò bún végan et un tofu bowl.
  - EN : Yes. Every bánh mì and every bún comes with five-spice tofu if you like. Ask for the vegan version when you order and we'll adapt the sauce and toppings. There's also a vegan bò bún and a tofu bowl.
- `faq.items[1].q`
  - FR : Et les allergènes ?
  - EN : What about allergens?
- `faq.items[1].a`
  - FR : Nos plats peuvent contenir de la cacahuète (sauce cacahuète, topping), du soja (sauces, tofu) et du gluten (pain du bánh mì, certaines sauces). Le café trứng contient de l'œuf. Signalez votre allergie en commandant : on vous dit précisément ce qu'il y a dans chaque plat.
  - EN : Our dishes may contain peanuts (peanut sauce, topping), soy (sauces, tofu) and gluten (bánh mì bread, some sauces). The egg coffee contains egg. Tell us about your allergy when you order and we'll tell you exactly what's in each dish.
- `faq.items[2].q`
  - FR : Comment commander à emporter ?
  - EN : How do I order takeaway?
- `faq.items[2].a`
  - FR : Avec le formulaire du site : choisissez vos plats et votre heure de retrait, on prépare. Vous pouvez aussi appeler le 09 87 18 79 29 pendant le service, ou passer directement au comptoir.
  - EN : Use the form on this site: choose your dishes and a pick-up time, and we'll cook. You can also call +33 9 87 18 79 29 during service, or just come to the counter.
- `faq.items[3].q`
  - FR : Comment payer ?
  - EN : How can I pay?
- `faq.items[3].a`
  - FR : Au comptoir, par carte bancaire ou paiement mobile. Il n'y a pas de paiement en ligne.
  - EN : At the counter, by card or mobile payment. There's no online payment.
- `faq.items[4].q`
  - FR : Êtes-vous ouverts le soir ?
  - EN : Are you open in the evening?
- `faq.items[4].a`
  - FR : Le midi du lundi au samedi, de 11 h 30 à 13 h 30. Le soir le mardi, le jeudi et le vendredi, de 18 h 30 à 20 h 30. Fermé le dimanche.
  - EN : Lunch Monday to Saturday, 11:30 am to 1:30 pm. Evenings on Tuesday, Thursday and Friday, 6:30 pm to 8:30 pm. Closed on Sunday.
- `faq.items[5].q`
  - FR : Peut-on manger sur place ?
  - EN : Can we eat in?
- `faq.items[5].a`
  - FR : Oui, dans une salle moderne et calme. Le midi, venez tôt ou commandez à emporter pour ne pas attendre.
  - EN : Yes, in a modern, quiet dining room. At lunchtime, come early or order takeaway to skip the wait.

### footer

- `footer.tagline`
  - FR : Street-food vietnamienne faite maison, en famille, rue Saint-Leu à Amiens.
  - EN : Homemade Vietnamese street food, cooked by a family on rue Saint-Leu in Amiens.
- `footer.menu`
  - FR : La carte
  - EN : Menu
- `footer.legal`
  - FR : Mentions légales
  - EN : Legal notice
- `footer.rights`
  - FR : © {year} ONHA – Vietnam Street-Food
  - EN : © {year} ONHA – Vietnam Street-Food

### placeholder

- `placeholder.soon`
  - FR : Photo à venir
  - EN : Photo coming soon

### carte (textes autour de la carte)

- `carte.eyebrow`
  - FR : La carte
  - EN : The menu
- `carte.title`
  - FR : Une carte courte, tout fait maison
  - EN : A short menu, all homemade
- `carte.intro`
  - FR : Choisissez votre base, puis votre garniture et votre sauce. C'est tout, et c'est voulu.
  - EN : Pick your base, then your filling and your sauce. That's it, on purpose.
- `carte.tabsLabel`
  - FR : Catégories de la carte
  - EN : Menu categories
- `carte.tabs.banh-mi`
  - FR : Bánh mì
  - EN : Bánh mì
- `carte.tabs.bun`
  - FR : Bún
  - EN : Bún
- `carte.tabs.bowls`
  - FR : Bowls & nems
  - EN : Bowls & spring rolls
- `carte.tabs.vege`
  - FR : Végé & végan
  - EN : Veggie & vegan
- `carte.tabs.desserts`
  - FR : Desserts
  - EN : Desserts
- `carte.tabs.boissons`
  - FR : Boissons & cà phê
  - EN : Drinks & cà phê
- `carte.garnitureTitle`
  - FR : Garniture au choix
  - EN : Choose your filling
- `carte.sauceTitle`
  - FR : Sauce au choix
  - EN : Choose your sauce
- `carte.garnitures.porc-laque`
  - FR : Porc laqué
  - EN : Lacquered pork
- `carte.garnitures.poulet-sate`
  - FR : Poulet saté
  - EN : Satay chicken
- `carte.garnitures.tofu-5-parfums`
  - FR : Tofu cinq parfums (végé)
  - EN : Five-spice tofu (veggie)
- `carte.sauces.mayo-epicee`
  - FR : Mayo épicée
  - EN : Spicy mayo
- `carte.sauces.cacahuete-soja-fume`
  - FR : Cacahuète et soja fumé
  - EN : Peanut and smoked soy
- `carte.sauces.soja-sale`
  - FR : Soja salé
  - EN : Salty soy
- `carte.priceOnSite`
  - FR : Prix sur place
  - EN : Price in the shop
- `carte.rotation`
  - FR : Selon le jour
  - EN : Depends on the day
- `carte.add`
  - FR : Commander
  - EN : Order
- `carte.addLabel`
  - FR : Commander : {name}
  - EN : Order: {name}
- `carte.seeFull`
  - FR : Toute la carte
  - EN : Full menu
- `carte.vegeIntro`
  - FR : Le tofu cinq parfums remplace la viande dans chaque bánh mì et chaque bún. Dites-nous « végan » à la commande : on adapte la sauce et les garnitures.
  - EN : Five-spice tofu replaces the meat in every bánh mì and every bún. Say “vegan” when you order and we'll adapt the sauce and toppings.
- `carte.allergens`
  - FR : Allergènes : cacahuète, soja, gluten (pain, sauces), œuf (café trứng). Demandez-nous, on vous dit tout plat par plat.
  - EN : Allergens: peanut, soy, gluten (bread, sauces), egg (cà phê trứng). Just ask and we'll go through each dish with you.
- `carte.checked`
  - FR : Prix relevés le {date}
  - EN : Prices checked on {date}

## Pages

### La carte / The menu

- `pages.carte.slug`
  - FR : carte
  - EN : menu
- `pages.carte.title`
  - FR : La carte
  - EN : The menu
- `pages.carte.metaTitle`
  - FR : Carte et prix : bánh mì, bò bún, bún thịt à Amiens | ONHA
  - EN : Menu and prices: bánh mì, bò bún, bún thịt in Amiens | ONHA
- `pages.carte.metaDescription`
  - FR : La carte d'ONHA, street-food vietnamienne à Amiens Saint-Leu : bánh mì 6,70 €, bún thịt 8,20 €, bò bún 9,30 €, desserts, café vietnamien. Options végé et végan, à emporter.
  - EN : ONHA's menu, Vietnamese street food in Amiens Saint-Leu: bánh mì €6.70, bún thịt €8.20, bò bún €9.30, desserts, Vietnamese coffee. Veggie and vegan options, takeaway.
- `pages.carte.eyebrow`
  - FR : Street-food vietnamienne · Amiens
  - EN : Vietnamese street food · Amiens
- `pages.carte.lead`
  - FR : Une base, une garniture, une sauce. Tout est préparé ici, chaque jour.
  - EN : One base, one filling, one sauce. Everything is made here, every day.

### Mentions légales / Legal notice

- `pages.legal.slug`
  - FR : mentions-legales
  - EN : legal
- `pages.legal.title`
  - FR : Mentions légales
  - EN : Legal notice
- `pages.legal.metaTitle`
  - FR : Mentions légales | ONHA Vietnam Street-Food
  - EN : Legal notice | ONHA Vietnam Street-Food
- `pages.legal.editor`
  - FR : Éditeur du site
  - EN : Publisher
- `pages.legal.host`
  - FR : Hébergement
  - EN : Hosting
- `pages.legal.data`
  - FR : Données personnelles
  - EN : Personal data
- `pages.legal.dataText`
  - FR : Les informations envoyées avec le formulaire de commande (nom, téléphone, e-mail facultatif) servent uniquement à préparer et confirmer votre commande. Elles ne sont ni revendues ni utilisées pour de la publicité. Pour les faire supprimer, écrivez à {email}.
  - EN : The details you send with the order form (name, phone, optional email) are only used to prepare and confirm your order. They are never sold or used for advertising. To have them deleted, write to {email}.
- `pages.legal.photos`
  - FR : Photos
  - EN : Photos
- `pages.legal.photosText`
  - FR : Photos : ONHA (Instagram @onha_family). Aucune image de banque.
  - EN : Photos: ONHA (Instagram @onha_family). No stock images.
- `pages.legal.siret`
  - FR : SIRET
  - EN : SIRET
- `pages.legal.director`
  - FR : Directeur de la publication
  - EN : Publication director
- `pages.legal.toConfirm`
  - FR : à compléter
  - EN : to be completed

## Textes alternatifs des photos (accessibilité, Google Images)

- `alt.banh-mi-poulet-sate`
  - FR : Bánh mì au poulet saté, carottes pickles et coriandre fraîche dans une baguette croustillante
  - EN : Bánh mì with satay chicken, pickled carrots and fresh coriander in a crunchy baguette
- `alt.cafe-phin-comptoir`
  - FR : Deux cafés vietnamiens qui coulent dans leur phin, sur le comptoir en bois d'ONHA
  - EN : Two Vietnamese coffees dripping through their phin filters on ONHA's wooden counter
