#!/bin/bash

echo "🔍 Vérification Release BestCord vs Bashcord"
echo "=============================================="

echo ""
echo "📊 Bashcord Latest Release:"
echo "- URL: https://github.com/roothheo/Bashcord/releases/tag/latest"
echo "- Assets: 26 fichiers"

echo ""
echo "📦 BestCord Latest Release:"
echo "- URL: https://github.com/bestcordofficial/Bestcord/releases/tag/latest"

echo ""
echo "⚙️ Vérification du workflow GitHub Actions:"
echo "- URL: https://github.com/bestcordofficial/Bestcord/actions"

echo ""
echo "🎯 Configuration actuelle:"
echo "- Workflow: bashcord-like-release.yml"
echo "- Déclencheur: Push sur main"
echo "- Tag: latest (comme Bashcord)"
echo "- Assets attendus: 26+ fichiers"

echo ""
echo "✅ Pour vérifier que ça marche:"
echo "1. Allez sur https://github.com/bestcordofficial/Bestcord/actions"
echo "2. Vérifiez que le workflow 'BestCord Latest Release' s'exécute"
echo "3. Attendez la fin (3-5 minutes)"
echo "4. Vérifiez https://github.com/bestcordofficial/Bestcord/releases/tag/latest"

echo ""
echo "🎉 Si tout fonctionne, vous devriez avoir une release 'latest' avec 26+ assets !" 