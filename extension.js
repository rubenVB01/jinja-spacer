const vscode = require('vscode');

/**
 * Function to format Jinja, SQL, and YAML templates
 * Ensures spaces inside {{ }} and {% %}
 */
function formatJinjaSpacing(text) {
    return text
		.replace(/{%(-?)\s*(.*?)\s*(-?)%}/g, '{%$1 $2 $3%}')
		.replace(/{{(-?)\s*(.*?)\s*(-?)}}/g, '{{$1 $2 $3}}');
}

/**
 * Activate the extension
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('Extension "jinja-spacer" is now active!');

    const onSaveListener = vscode.workspace.onDidSaveTextDocument(async (document) => {
        const { languageId } = document;

        // Check if the file type is Jinja, SQL, or YAML
        if (['jinja', 'sql', 'yaml', 'yml'].includes(languageId)) {
            console.log(`Formatting applied on save: ${document.fileName}`);

            const edit = new vscode.WorkspaceEdit();
            const fullRange = new vscode.Range(
                document.lineAt(0).range.start,
                document.lineAt(document.lineCount - 1).range.end
            );

            const formattedText = formatJinjaSpacing(document.getText());

            // If the formatting changed something, apply it
            if (formattedText !== document.getText()) {
                edit.replace(document.uri, fullRange, formattedText);
                await vscode.workspace.applyEdit(edit);

                // Save the document again after applying edits
                await document.save();
            }
        }
    });

    context.subscriptions.push(onSaveListener);
}

/**
 * Deactivate the extension
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
