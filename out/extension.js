// Directiva que corre el programa en un contexto "estricto". Ejemplo: Sin strict mode, asumen que cualquier variable no declarada debe considerarse creada implícitamente. Con strict mode, asume que una variable no declarada generará un error.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Importa el módulo 'vscode' de la API de Extensiones con el alias "vscode" que será utilizado a lo largo del programa.
const vscode = require("vscode");
// Se llama al método "activate" al momento de activar la extensión dentro de Visual Studio Code. Como parámetro de la función activate se pasa una instancia de contexto "ExtensionContext" del alias vscode.
function activate(context) {
    // Imprime mensaje informativo una vez que se active la extensión, gracias al método showInformationMessage que se encuentra incluido en el namespace de window, que esta relacionado con todo lo concerniente a la actual pantalla del editor.
    vscode.window.showInformationMessage('¡Hola desde mi primera extensión!. Ahora esta extensión está Activa');
    // El comando 'extension.gapline', que fue definido en el archivo package.json que se ejecutará cuando se ingrese el título asignado, que en este caso es "Line Gapper", también definido en package.json. Este comando se implementa en este archivo gracias al método "registerCommand" que se encuentra en el namespace "commands". Esto se guarda dentro de la variable "disposable".
    let disposable = vscode.commands.registerCommand('extension.gapline', () => {
        // El siguiente código será ejecutado cada vez que se ejecute el comando anterior, el cual es llamado desde Visual Studio Code mediante el título que se le asignó en el archivo package.json
        // Se define la variable editor, la cual guarda al actual editor de texto. Esto mediante el namespace window el cual define la interfaz TextEditor. Es decir, la variable editor guarda un elemento de tipo vscode.TextEditor
        var editor = vscode.window.activeTextEditor;
        // Si no existe un editor, termina el método albergado en el comando.
        if (!editor) {
            return;
        }
        // Se define la variable "selection", la cual será de tipo vscode.Selection. Esta selección es una propiedad del actual editor de texto, la cual indica las líneas que están seleccionadas en su contenido.
        var selection = editor.selection;
        // Aquí se extrae el texto que se encuentra en la variable selection y se almacena en la variable "text". Esto gracias al método "getText" la cual recibe como parámetro un rango, en este caso el rango de selección.
        var text = editor.document.getText(selection);
        // Con la función "showInputBox" se mostrará un prompt al usuario dentro de la ventada del editor, solicitando el número de líneas que quiere mantener juntas antes de ingresar una línea en blanco. El número ingresado por el usuario es guardado como tipo string en la variable/parámetro "value", realizandose posteriormente una función de callback con éste parámetro.
        vscode.window
            .showInputBox({ prompt: '¿Cada cuántas líneas quieres insertar una línea en blanco?' })
            .then((value) => {
            // Se imprime en la ventana del editor un mensaje informativo con el número de líneas indicadas usando el mismo método que anteriormente se explicó "showInformationMessage".
            vscode.window.showInformationMessage('Has indicado que se inserte cada ' + value + ' lineas');
            // Se guarda dentro de la variable "numberOfLines" el valor del parámetro "value", forzado a convertirse en tipo number gracias al símbolo + que le precede.
            let numberOfLines = +value;
            // Se define la variable "textInChunks" de tipo Array que contendrá strings
            var textInChunks = [];
            // Aquí es donde se lleva a cabo el algoritmo para separar los párrafos con líneas en blanco.
            // En la variable "text" que se había mencionado anteriormente y que contiene el contenido seleccionado, se llama al método "split" el cual recibe un separador como parámetro el cual es "\n" que significa salto de línea y divide en subcadenas el contenido guardandolo en un arreglo. Correrá la función de callback por cada elemento de array que haya, recibiendo como parámetro el texto en la línea actual, así como el numero de línea en el que se encuentra.
            text.split('\n').forEach((currentLine, lineIndex) => {
                // Dentro del array de strings "textInChunks" se agregará en su última posición el texto de la línea en la cual se encuentra, el cual se obtuvo gracias a la separación por '\n'.
                textInChunks.push(currentLine);
                // Aquí pregunta, que si el módulo del número de línea en el que se encuentra, más uno, dividido entre el número de líneas que indicó el usuario es exactamente igual a cero, agregará al arreglo "textInChunks" un nuevo elemento con un string vacío ''.
                if ((lineIndex + 1) % numberOfLines === 0) {
                    textInChunks.push('');
                }
                // Como se mencionó anteriormente esto se ejecutará tantas veces como líneas de contenido haya en el texto seleccionado.
            });
            // Dentro de la variable "text" ahora se guardará todos los elementos del Array "textInChunks" separados por '\n' que se ingresa como parámetro.
            text = textInChunks.join('\n');
            // Mediante el método edit del actual editor de texto se modificará su contenido
            editor.edit((editBuilder) => {
                // Se declara la variable "range", en la cual se genera un rango para un nuevo módulo vscode, el cual recibe como parámetros en su constuctor un valor (número) inicial, un caracter de inicio, un valor (número) final y un caracter final.
                var range = new vscode.Range(
                // Valor de la línea de inicio de la selección en el editor
                selection.start.line, 
                // Caracter de inicio
                0, 
                // Valor de la línea final de la selección en el editor
                selection.end.line, 
                // Caracter final, el cual se obtiene con la longitud del texto de la última línea de selección.
                editor.document.lineAt(selection.end.line).text.length);
                // El método replace ejecuta la acción de reemplazo en el rango indicado por el parámetro "range" obtenido anteriormente, con el texto guardado en el la variable "text", pasado también como parámetro.
                editBuilder.replace(range, text);
            });
            // Imprime en pantalla la acción gracias al método "showInformationMessage".
            vscode.window.showInformationMessage('Se ha realizado la inserción de líneas en blanco.');
        });
    });
    // El contenido de la variable "disposable" creada al activarse la extensión es ingresada mediante el método "push" a "subscriptions" que es un arreglo en donde se agregarán todos aquellos "desechables" que se eliminarán cuando la extensión sea desactivada.
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// El método "deactivate" será llamado cuando la extensión se desactiva, ejecutando las líneas de código que contenga.
function deactivate() {
    // En este caso como ejemplo se imprime una despedida al usuario como mensaje de error en la pantalla.
    vscode.window.showErrorMessage('¡Adiós desde mi primera extensión!. Ahora esta extensión está Desactiva');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map