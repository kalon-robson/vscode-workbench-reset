import * as vscode from 'vscode';

const OUTPUT_CHANNEL_NAME = 'VSCode Workbench Reset';

async function runCommand(command: string, out: vscode.OutputChannel): Promise<boolean> {
	try {
		await vscode.commands.executeCommand(command);
		return true;
	} catch (err) {
		out.appendLine(`[WARN] ${command}: ${err instanceof Error ? err.message : String(err)}`);
		return false;
	}
}

async function resetLayout(out: vscode.OutputChannel): Promise<void> {
	const config = vscode.workspace.getConfiguration('vscodeWorkbenchReset');
	const steps = Math.max(0, Math.min(100, config.get<number>('widthResetSteps', 2)));
	const notify = config.get<boolean>('showNotification', true);

	await runCommand('workbench.action.closePanel', out);
	await runCommand('workbench.action.closeAuxiliaryBar', out);
	await runCommand('workbench.view.explorer', out);
	await runCommand('workbench.files.action.collapseExplorerFolders', out);
	await runCommand('workbench.action.resetViewSizes', out);

	await runCommand('workbench.action.focusFirstEditorGroup', out);
	for (let i = 0; i < 25; i++) {
		if (!(await runCommand('workbench.action.increaseViewWidth', out))) break;
	}

	for (let i = 0; i < steps; i++) {
		if (!(await runCommand('workbench.action.decreaseViewWidth', out))) break;
	}

	await runCommand('workbench.files.action.focusFilesExplorer', out);

	if (notify) {
		vscode.window.setStatusBarMessage('$(check) Workbench layout reset', 3000);
	}
}

export function activate(context: vscode.ExtensionContext): void {
	const out = vscode.window.createOutputChannel(OUTPUT_CHANNEL_NAME);
	context.subscriptions.push(out);
	context.subscriptions.push(
		vscode.commands.registerCommand('vscodeWorkbenchReset.reset', () => resetLayout(out))
	);
}

export function deactivate(): void { }
