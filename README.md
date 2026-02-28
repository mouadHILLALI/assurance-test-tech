# 🛡️ Gestion de Fiches Assurance

Application frontend de gestion de fiches d'assurance construite avec **Next.js 14 (App Router)**, **React**, **TypeScript** et **Tailwind CSS**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)

---

## 📋 Fonctionnalités

### Page Liste
- Affichage paginé (10 fiches/page) avec navigation
- Filtre par **produit** (AUTO, MRH, RCPRO, SANTÉ, VIE, PRÉVOYANCE)
- Filtre par **statut** (Nouveau, Assigné, En cours, Clôturé)
- **Recherche** par nom client (temps réel)
- Badges colorés par statut
- Loading skeleton animé
- Message si liste vide
- Design responsive (table desktop / cards mobile)

### Page Détail
- Section **Client** : nom, téléphone, email
- Section **Produit** : type, garanties, prime mensuelle
- Section **Conseiller** : affichage du conseiller assigné
- **Changer le statut** via modal avec React Hook Form + Zod
- **Assigner un conseiller** via modal avec React Hook Form + Zod

### Gestion des rôles (simulation)
- **ADMIN** → voit toutes les fiches
- **ADVISOR** → voit uniquement ses fiches + les non-assignées
- Sélecteur d'utilisateur dans le header pour tester les rôles

---

## 🏗️ Architecture & Choix Techniques

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout racine (providers)
│   ├── page.tsx            # Page liste (client component)
│   ├── globals.css         # Styles globaux + Tailwind
│   └── fiche/[id]/
│       └── page.tsx        # Page détail fiche
├── components/
│   ├── layout/
│   │   └── Header.tsx      # Navbar + sélecteur de rôle
│   ├── ui/                 # Composants UI réutilisables
│   │   ├── EmptyState.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── ProductBadge.tsx
│   │   ├── Skeleton.tsx
│   │   └── StatusBadge.tsx
│   ├── AssignModal.tsx     # Modal assignation (RHF + Zod)
│   ├── ChangeStatusModal.tsx # Modal changement statut (RHF + Zod)
│   ├── FicheFilters.tsx    # Barre de filtres
│   └── FicheTable.tsx      # Table/liste des fiches
├── data/
│   └── mock.ts             # Données simulées (25 fiches)
├── hooks/
│   └── use-fiches.ts       # Custom hooks (React Query)
├── lib/
│   ├── api.ts              # API simulée avec délais réseau
│   ├── auth-context.tsx    # Context d'authentification
│   ├── query-provider.tsx  # TanStack Query provider
│   └── utils.ts            # Helpers (formatage, configs)
└── types/
    └── index.ts            # Types TypeScript
```

### Pourquoi ces choix ?

| Technologie | Justification |
|---|---|
| **Next.js 14 App Router** | Architecture moderne, file-system routing, layouts imbriqués |
| **TanStack React Query** | Cache intelligent, état serveur, invalidation automatique, `placeholderData` pour UX fluide |
| **React Hook Form + Zod** | Formulaires performants (uncontrolled), validation type-safe avec schémas Zod |
| **Tailwind CSS** | Styling utilitaire rapide, design system cohérent via `theme.extend` |
| **API simulée** | Mock réaliste avec délais réseau aléatoires, mutations en mémoire |
| **Architecture modulaire** | Séparation claire : types / data / hooks / components / lib |

### Gestion de l'état

- **État serveur** : TanStack React Query gère le fetching, le cache et les invalidations
- **État UI local** : `useState` pour filtres, pagination, modals
- **État global** : React Context pour l'authentification/rôle simulé
- **Formulaires** : React Hook Form avec résolution Zod pour la validation

### Performance

- `placeholderData` dans React Query pour éviter les flash de chargement
- Animations CSS (pas de JS) pour les transitions
- Composants décomposés pour limiter les re-renders
- Import dynamique possible via Next.js (prêt à l'emploi)

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js ≥ 18
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone <repo-url>
cd gestion-fiches-assurance

# Installer les dépendances
npm install
```

### Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

### Build production

```bash
npm run build
npm start
```

---

## 🧪 Comment tester

1. **Rôles** : Utilisez le sélecteur en haut à droite pour basculer entre Admin et Conseillers
2. **Filtres** : Combinez produit, statut et recherche — la pagination se réinitialise automatiquement
3. **Détail** : Cliquez "Voir" pour accéder à une fiche, modifiez le statut ou assignez un conseiller
4. **Responsive** : Redimensionnez la fenêtre — la table passe en mode cartes sur mobile

---

## 📝 Notes

- Les données sont simulées en mémoire (25 fiches). Les modifications (statut, assignation) persistent pendant la session.
- Les délais réseau sont simulés (300-700ms) pour un comportement réaliste.
- L'architecture est prête pour une vraie API REST — il suffit de remplacer les fonctions dans `lib/api.ts`.
