const vscode = require('vscode');
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

let isEnabled = true;
let extensionContext;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    try {
        console.log('Chicken On Tree Screaming extension is now active!');
        extensionContext = context;

        const config = vscode.workspace.getConfiguration('chickenOnTreeScreaming');
        isEnabled = config.get('enabled', true);

        // Stable API - detect when a command finishes with non-zero exit code (VS Code 1.93+)
        if (vscode.window.onDidEndTerminalShellExecution) {
            console.log('Using stable onDidEndTerminalShellExecution API');
            context.subscriptions.push(
                vscode.window.onDidEndTerminalShellExecution(e => {
                    if (!isEnabled) return;
                    if (e.exitCode !== undefined && e.exitCode !== 0) {
                        console.log('Command failed with exit code:', e.exitCode);
                        playChickenOnTreeScreamingSound();
                    }
                })
            );
        }

        // If stable API is not available, warn the user
        if (!vscode.window.onDidEndTerminalShellExecution) {
            vscode.window.showWarningMessage('Chicken On Tree Screaming: Terminal monitoring API not available. Please update VS Code to 1.93+.');
        }

        // Register commands
        context.subscriptions.push(
            vscode.commands.registerCommand('chickenOnTreeScreaming.toggle', () => {
                isEnabled = !isEnabled;
                vscode.workspace.getConfiguration('chickenOnTreeScreaming')
                    .update('enabled', isEnabled, vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage(
                    `Chicken On Tree Screaming sound ${isEnabled ? 'enabled' : 'disabled'}`
                );
            })
        );

        context.subscriptions.push(
            vscode.commands.registerCommand('chickenOnTreeScreaming.testSound', () => {
                playChickenOnTreeScreamingSound();
                vscode.window.showInformationMessage('Playing chicken-on-tree-screaming sound...');
            })
        );

        // Listen for configuration changes
        context.subscriptions.push(
            vscode.workspace.onDidChangeConfiguration(e => {
                if (e.affectsConfiguration('chickenOnTreeScreaming.enabled')) {
                    isEnabled = vscode.workspace.getConfiguration('chickenOnTreeScreaming').get('enabled', true);
                }
            })
        );

        vscode.window.showInformationMessage('Chicken On Tree Screaming extension activated!');
        console.log('Activation complete!');
    } catch (error) {
        console.error('Error activating extension:', error);
        vscode.window.showErrorMessage('Chicken On Tree Screaming failed to activate: ' + error.message);
    }
}

function playChickenOnTreeScreamingSound() {
    try {
        const config = vscode.workspace.getConfiguration('chickenOnTreeScreaming');
        const volume = config.get('volume', 0.5);
        const soundPath = path.join(extensionContext.extensionPath, 'sounds', 'chicken-on-tree-screaming.mp3');

        if (!fs.existsSync(soundPath)) {
            vscode.window.showWarningMessage('Chicken On Tree Screaming sound file not found at: ' + soundPath);
            return;
        }

        if (process.platform === 'linux') {
            exec(`ffplay -nodisp -autoexit -volume ${Math.round(volume * 100)} "${soundPath}" 2>/dev/null || paplay "${soundPath}" 2>/dev/null || aplay "${soundPath}" 2>/dev/null`);
        } else if (process.platform === 'darwin') {
            exec(`afplay "${soundPath}" -v ${volume}`);
        } else if (process.platform === 'win32') {
            exec(`powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`);
        }
    } catch (error) {
        console.error('Error playing sound:', error);
    }
}

function deactivate() {
    console.log('Chicken On Tree Screaming extension deactivated');
}

module.exports = {
    activate,
    deactivate
};
