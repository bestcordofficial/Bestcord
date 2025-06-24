#!/usr/bin/env node

/**
 * Script de configuration pour les releases BestCord
 * Similaire à la configuration de Bashcord
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONFIG = {
    // Configuration de base
    name: "BestCord",
    description: "The other cutest Discord client mod but better",
    repository: "https://github.com/bestcordofficial/Bestcord",
    
    // Assets à inclure dans les releases (comme Bashcord)
    assets: [
        // Extensions navigateur
        "browser/browser.js",
        "browser/browser.min.js", 
        "BestCord-Browser-Extension.zip",
        
        // Userscripts
        "BestCord-Userscript.js",
        "BestCord-Userscript.js.LEGAL.txt",
        
        // Desktop builds pour différentes plateformes
        "BestCord-Desktop-linux-x64.asar",
        "BestCord-Desktop-windows-x64.asar", 
        "BestCord-Desktop-macos-x64.asar",
        "BestCord-Desktop-macos-arm64.asar",
        
        // Vesktop builds
        "BestCord-Vesktop-linux-x64.asar",
        "BestCord-Vesktop-windows-x64.asar",
        "BestCord-Vesktop-macos-x64.asar", 
        "BestCord-Vesktop-macos-arm64.asar",
        
        // Données des plugins
        "plugins.json",
        "equicordplugins.json",
        
        // Équibop/mobile builds
        "BestCord-Equibop-*.asar",
        
        // Fichiers de vérification
        "checksums.txt"
    ],
    
    // Commandes de build
    buildCommands: [
        "pnpm buildWebStandalone",
        "pnpm buildWeb --minify", 
        "pnpm buildStandalone",
        "pnpm build --minify",
        "pnpm generatePluginJson dist/plugins.json",
        "pnpm generateEquicordPluginJson dist/equicordplugins.json"
    ]
};

function setupReleaseConfiguration() {
    console.log(`🚀 Configuration des releases ${CONFIG.name}...`);
    
    // Vérifier les dépendances nécessaires
    try {
        execSync('gh --version', { stdio: 'ignore' });
        console.log('✅ GitHub CLI détecté');
    } catch (error) {
        console.error('❌ GitHub CLI non trouvé. Installez-le : https://cli.github.com/');
        process.exit(1);
    }
    
    // Créer les dossiers nécessaires
    const dirs = ['dist/release', 'artifacts', 'temp'];
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Dossier créé : ${dir}`);
        }
    });
    
    // Mettre à jour le package.json avec les informations de release
    const packageJsonPath = path.join(__dirname, '..', 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.name = CONFIG.name;
        packageJson.description = CONFIG.description;
        
        // Ajouter des scripts de release
        packageJson.scripts = {
            ...packageJson.scripts,
            "release:prepare": "node scripts/setup-release.js",
            "release:build": "node scripts/build-all-platforms.js", 
            "release:publish": "gh release create latest --generate-notes"
        };
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ package.json mis à jour');
    }
    
    console.log(`🎉 Configuration ${CONFIG.name} terminée !`);
    console.log('\nPour créer une release :');
    console.log('1. git tag v1.0.0');
    console.log('2. git push origin v1.0.0');
    console.log('3. Les workflows GitHub Actions se chargeront du reste');
    
    console.log('\nAssets qui seront générés :');
    CONFIG.assets.forEach(asset => console.log(`  - ${asset}`));
}

// Script de build pour toutes les plateformes
function createBuildAllScript() {
    const buildScript = `#!/usr/bin/env node

/**
 * Script de build pour toutes les plateformes
 * Génère tous les assets comme Bashcord
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const platforms = [
    { name: 'linux-x64', os: 'linux' },
    { name: 'windows-x64', os: 'win32' }, 
    { name: 'macos-x64', os: 'darwin' },
    { name: 'macos-arm64', os: 'darwin' }
];

function buildForAllPlatforms() {
    console.log('🔨 Building ${CONFIG.name} for all platforms...');
    
    // Nettoyer les builds précédents
    if (fs.existsSync('dist')) {
        fs.rmSync('dist', { recursive: true, force: true });
    }
    
    // Exécuter les commandes de build
    ${JSON.stringify(CONFIG.buildCommands)}.forEach(cmd => {
        console.log(\`Executing: \${cmd}\`);
        try {
            execSync(cmd, { stdio: 'inherit' });
        } catch (error) {
            console.error(\`Failed to execute: \${cmd}\`);
            process.exit(1);
        }
    });
    
    console.log('✅ All builds completed successfully!');
    console.log('📦 Assets ready for release in dist/ directory');
}

if (require.main === module) {
    buildForAllPlatforms();
}

module.exports = { buildForAllPlatforms };
`;

    fs.writeFileSync(path.join(__dirname, 'build-all-platforms.js'), buildScript);
    console.log('✅ Script build-all-platforms.js créé');
}

if (require.main === module) {
    setupReleaseConfiguration();
    createBuildAllScript();
}

module.exports = { CONFIG, setupReleaseConfiguration }; 