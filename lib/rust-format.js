'use babel';

import { CompositeDisposable } from 'atom';
import { execSync } from 'child_process';

export default class RustFormat {
    constructor() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(atom.workspace.observeTextEditors(this.handleEditorEvent));
        this.subscriptions.add(atom.commands.add('atom-workspace', 'rust-format:format', () => {
            const editor = atom.workspace.getActiveTextEditor();
            if (editor) {
                this.format(editor);
            }
        }));
    }

    handleEditorEvent = (editor) => {
        const buffer = editor.getBuffer();

        const saveSub = buffer.onDidSave(() => {
            const scope = editor.getRootScopeDescriptor().scopes[0];
            if (atom.config.get('rust-format.formatOnSave') && scope === 'source.rust') {
                buffer.transact(() => this.format(editor));
            }
        });

        const destroySub = editor.onDidDestroy(() => {
            saveSub.dispose();
            destroySub.dispose();
            this.subscriptions.remove(saveSub);
            this.subscriptions.remove(destroySub);
        });

        this.subscriptions.add(saveSub);
        this.subscriptions.add(destroySub);
    }

    format = (editor) => {
        const buffer = editor.getBuffer();
        try {
            const exe = this.getExecutable();
            const path = editor.getPath();
            const args = this.getArguments(path);
            const stdout = execSync(`${exe} ${args}`).toString();
            buffer.setTextViaDiff(stdout);
        } catch (error) {
            atom.notifications.addError('rustfmt command failed', { dismissible: true, detail: error });
        }
    }

    getArguments = (path) => {
        let args = `-q --emit stdout ${path}`;

        const edition = atom.config.get('rust-format.edition').trim();
        if (edition) {
            args = `--edition ${edition} ${args}`;
        }

        const configPath = atom.config.get('rust-format.configPath').trim();
        if (configPath) {
            args = `--config-path ${configPath} ${args}`;
        }

        const config = atom.config.get('rust-format.config').trim();
        let configStr = '--config skip_children=true';
        if (config) {
            configStr += `,${config}`;
        }
        args = `${configStr} ${args}`;

        const additionalArgs = atom.config.get('rust-format.additionalArguments');
        if (additionalArgs) {
            args = `${additionalArgs} ${args}`;
        }

        return args;
    }

    getExecutable = () => {
        let exe = atom.config.get('rust-format.executable').trim();
        if (!exe) {
            throw 'empty executable path in configuration';
        }
        return exe;
    }

    destroy = () => {
        this.subscriptions.dispose();
    }
};
