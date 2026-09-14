# VSCode Workbench Reset

Instantly reset your Visual Studio Code layout to a clean, focused state with a single keyboard shortcut.

## Shortcut

| Shortcut | Command | Action |
| :--- | :--- | :--- |
| `Alt+\`` | `vscodeWorkbenchReset.reset` | Reset Workbench Layout |

## What It Does

1. Closes the bottom panel (Terminal, Output, Problems, Debug Console).
2. Closes the secondary sidebar / auxiliary bar (Chat, AI panels).
3. Opens and focuses the Explorer view.
4. Collapses all expanded folders in the Explorer.
5. Resets and restores the Explorer sidebar to a clean default width.

## Configuration

| Setting | Default | Description |
| :--- | :--- | :--- |
| `vscodeWorkbenchReset.widthResetSteps` | `2` | Adjustment steps to size the Explorer sidebar. |
| `vscodeWorkbenchReset.showNotification` | `true` | Show status bar message on reset. |