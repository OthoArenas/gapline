'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    vscode.window.showInformationMessage('¡Hola desde mi primera extensión!. Ahora esta extensión está Activa');
    let disposable = vscode.commands.registerCommand('extension.gapline', () => {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        var selection = editor.selection;
        var text = editor.document.getText(selection);
        vscode.window
            .showInputBox({ prompt: '¿Cada cuántas líneas quieres insertar una línea en blanco?' })
            .then((value) => {
            let numberOfLines = +value;
            var textInChunks = [];
            text.split('\n').forEach((currentLine, lineIndex) => {
                textInChunks.push(currentLine);
                if ((lineIndex + 1) % numberOfLines === 0) {
                    textInChunks.push('');
                }
            });
            text = textInChunks.join('\n');
            editor.edit((editBuilder) => {
                var range = new vscode.Range(selection.start.line, 0, selection.end.line, editor.document.lineAt(selection.end.line).text.length);
                editBuilder.replace(range, text);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {
    vscode.window.showInformationMessage('¡Adiós desde mi primera extensión!. Ahora esta extensión está Desactiva');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension3.js.map