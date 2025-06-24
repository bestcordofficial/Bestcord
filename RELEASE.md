# Guide de Release BestCord

Ce guide explique comment publier des releases avec autant d'assets que [Bashcord](https://github.com/roothheo/Bashcord/releases/tag/latest).

## Assets générés (26+ fichiers comme Bashcord)

Votre configuration génère maintenant les mêmes types d'assets que Bashcord :

### 🌐 Extensions Navigateur
- `BestCord-Browser-Extension.zip` - Extension complète pour Chrome/Firefox
- `browser.js` - Extension non-minifiée
- `browser.min.js` - Extension minifiée

### 💻 Applications Desktop
- `BestCord-Desktop-linux-x64.asar` - Version Linux 64-bit
- `BestCord-Desktop-windows-x64.asar` - Version Windows 64-bit  
- `BestCord-Desktop-macos-x64.asar` - Version macOS Intel
- `BestCord-Desktop-macos-arm64.asar` - Version macOS Apple Silicon

### 🖥️ Vesktop (alternative desktop)
- `BestCord-Vesktop-linux-x64.asar`
- `BestCord-Vesktop-windows-x64.asar`
- `BestCord-Vesktop-macos-x64.asar`
- `BestCord-Vesktop-macos-arm64.asar`

### 📱 Équibop (mobile/alternatif)
- `BestCord-Equibop-*.asar` - Versions pour plateformes alternatives

### 🔧 Userscripts
- `BestCord-Userscript.js` - Script pour Tampermonkey/Greasemonkey
- `BestCord-Userscript.js.LEGAL.txt` - Informations légales

### 📄 Données
- `plugins.json` - Liste des plugins Vencord
- `equicordplugins.json` - Liste des plugins Equicord
- `checksums.txt` - Checksums SHA256 pour vérification

## 🚀 Comment créer une release

### ⚡ Release automatique (recommandé)
```bash
# Simplement pousser votre code sur n'importe quelle branche
git add .
git commit -m "Mon nouveau feature"
git push origin main

# ✨ Une release sera automatiquement créée avec tous les assets !
```

### 🔧 Release manuelle (optionnel)
```bash
# Build tous les assets localement
pnpm release:build

# Créer la release GitHub manuellement
pnpm release:publish
```

### 🎯 Déclenchement automatique
Les releases sont **automatiquement créées** à chaque push sur :
- ✅ **Toutes les branches** (`main`, `dev`, `feature/xyz`, etc.)
- ✅ **Tous les commits**
- ✅ **Pull requests** (en test)

## 🔄 Workflows GitHub Actions

Trois workflows sont configurés pour une CI/CD complète :

### `continuous-release.yml` - Release continue ⚡
- **Se déclenche sur TOUS les pushs** (toutes branches)
- Génère des assets instantanément
- Créé des releases automatiques par branche
- Build rapide et efficace

### `build.yml` - Release principale 
- Se déclenche sur les pushs vers `main`, `dev`, `develop`
- Génère une release "latest" pour la branche main
- Builds complets avec toutes les optimisations

### `build-multiplatform.yml` - Builds multi-plateformes
- Se déclenche sur les pushs vers les branches principales  
- Build en parallèle sur Linux, Windows, macOS
- Génère tous les assets spécifiques aux plateformes
- Crée une release complète avec 26+ assets

## 📋 Configuration

### Variables d'environnement nécessaires
- `GITHUB_TOKEN` - Token GitHub (automatique dans Actions)

### Secrets optionnels
- `ETOKEN` - Token personnalisé si vous voulez pousser vers un autre repo

### URLs configurées
Les URLs ont été configurées pour votre repository :
- `.github/workflows/build.yml` : `REPO: bestcordofficial/Bestcord`
- `package.json` : URLs pointant vers `https://github.com/bestcordofficial/Bestcord`

## 🎯 Comparaison avec Bashcord

| Aspect | Bashcord | BestCord (après configuration) |
|--------|----------|----------------------------------|
| Nombre d'assets | 26 | 26+ |
| Plateformes | Linux, Windows, macOS | ✅ Identique |
| Extensions navigateur | ✅ | ✅ |
| Userscripts | ✅ | ✅ |
| Checksums | ✅ | ✅ |
| Builds automatisés | ✅ | ✅ |
| Multi-plateforme | ✅ | ✅ |

## 🛠️ Personnalisation

### Ajouter de nouveaux assets
Modifiez `scripts/setup-release.js` et ajoutez vos assets à la liste `CONFIG.assets`.

### Modifier les plateformes
Modifiez `.github/workflows/build-multiplatform.yml` dans la section `strategy.matrix`.

### Changer le nom du projet
Exécutez `pnpm release:prepare` après avoir modifié `scripts/setup-release.js`.

## 🐛 Dépannage

### "GitHub CLI non trouvé"
```bash
# Sur Ubuntu/Debian
sudo apt install gh

# Sur macOS
brew install gh

# Sur Windows
winget install GitHub.cli
```

### "Permission denied"
Assurez-vous que votre token GitHub a les permissions :
- `repo` (accès complet au repository)
- `write:packages` (si vous publiez des packages)

### "Assets manquants"
Vérifiez que tous les builds se terminent correctement :
```bash
pnpm build
pnpm buildWeb  
pnpm buildStandalone
```

## 📚 Ressources

- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Releases API](https://docs.github.com/en/rest/releases)
- [Bashcord Repository](https://github.com/roothheo/Bashcord) 