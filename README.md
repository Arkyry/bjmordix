# BJMordix 🎣 — Boutique de pêche en ligne

Boutique e-commerce **trilingue (FR / EN / ES)** pour matériel de pêche.
Site 100 % autonome (HTML / CSS / JavaScript pur, **aucune dépendance**) :
il fonctionne sur n'importe quel navigateur (Chrome, Firefox, Edge, Safari)
et même hors-ligne.

## ✨ Fonctionnalités

- 🎨 Design moderne « océan » inspiré des meilleures boutiques
- 🌍 Traduction instantanée FR / EN / ES (interface **et** fiches produits)
- 🛒 Panier complet (ajout, quantités, sous-total, livraison offerte dès 60 €)
- 👤 Création de compte / connexion (façon Amazon)
- 🔍 Recherche de produits
- 📱 100 % responsive (mobile, tablette, ordinateur)
- 🏷️ **Prix automatiquement multipliés par 3** (marge dropshipping)

## 📂 Structure des fichiers

| Fichier | Rôle |
|---------|------|
| `index.html` | Structure de la page (en-tête, pied de page, panier, modale compte) |
| `styles.css` | Tout le design (couleurs, mise en page, responsive) |
| `data.js` | **Les produits** + illustrations + prix |
| `i18n.js` | Les traductions FR / EN / ES |
| `app.js` | La logique (rendu, panier, comptes, navigation) |

## ▶️ Voir le site

- **Le plus simple :** double-clique sur `index.html` → il s'ouvre dans ton navigateur.
- Ou via un petit serveur local : `http://localhost:8123`.

## ✏️ Modifier les produits

Tout se passe dans **`data.js`**. Pour ajouter un vrai produit AliExpress,
copie un bloc dans `PRODUCTS` et change les champs :

```js
{
  id: 'mon-produit',           // identifiant unique (sans espace)
  category: 'rods',            // rods | reels | lures | gear
  cost: 12.90,                 // PRIX FOURNISSEUR — le prix de vente = cost x 3
  image: IMAGES.rod,           // illustration (voir l'objet IMAGES en haut du fichier)
  rating: 4.7, reviews: 120, badge: 'best',  // badge: 'best' | 'new' | null
  name: { fr: '…', en: '…', es: '…' },
  desc: { fr: '…', en: '…', es: '…' },        // description courte
  long: { fr: '…', en: '…', es: '…' },        // description longue (fiche produit)
}
```

### Changer la marge (×3)
En haut de `data.js` : `const MARKUP = 3;` → mets la valeur que tu veux.

### Remplacer les illustrations par de vraies photos
Quand tu auras tes photos détourées, on remplacera `image: IMAGES.xxx`
par `image: '<img src="photos/mon-produit.png">'` (un dossier `photos/` à créer).

## 🚀 Pour aller plus loin (étapes suivantes)

1. **Mettre en ligne** gratuitement (Firebase Hosting / Netlify) → URL publique.
2. **Acheter le domaine .com** (~10-15 €/an) et le brancher.
3. **Vrais comptes** : passer le système de connexion sur Firebase Auth.
4. **Paiements** : brancher Stripe ou PayPal.
5. **Vrais produits** : via un fournisseur dropshipping officiel (CJ Dropshipping…).

> ⚠️ Catalogue actuel = **exemple** (prix indicatifs) pour la démonstration.
