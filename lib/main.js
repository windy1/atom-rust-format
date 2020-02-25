'use babel';

import RustFormat from './rust-format';

export default {
    config: {
        executable: {
            type: 'string',
            default: 'rustfmt',
            description: 'Path to rustfmt executable',
            order: 1
        },
        formatOnSave: {
            type: 'boolean',
            default: false,
            order: 2
        },
        suppressErrors: {
            type: 'boolean',
            default: false,
            order: 3
        },
        edition: {
            type: 'string',
            default: '',
            description: 'Rust edition to use',
            order: 4
        },
        configPath: {
            type: 'string',
            default: '',
            description: 'Recursively searches the given path for the rustfmt.toml config file. If not found reverts to the input file path',
            order: 5
        },
        config: {
            type: 'string',
            default: '',
            description: 'Set options from command line. These settings take priority over .rustfmt.toml (e.g. "key1=val1,key2=val2...")',
            order: 6
        },
        additionalArguments: {
            type: 'string',
            default: '',
            description: 'Additional arguments to supply to the rustfmt command-line (warning: only use if you know what you are doing)',
            order: 7
        }
    },

    activate() {
        this.rustFormat = new RustFormat();
    },

    deactivate() {
        return this.rustFormat.destroy();
    }
}
