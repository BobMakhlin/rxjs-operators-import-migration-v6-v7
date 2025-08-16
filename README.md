# rxjs-operators-import-migration-v6-v7

Provides a script for migrating rxjs v6-v7 operators. 
Imports from `'rxjs/operators'` are gonna be deprecated soon as per docs, you should import directly from `'rxjs'` (https://github.com/ReactiveX/rxjs/blob/7.x/CHANGELOG.md#720-2021-07-05).

This script leverages the jscodeshift lib in order to process all TS files, fixing the imports. 
The script respects existing imports from 'rxjs' (operators are gonna be appended to that import). 

## Running

1. add jscodeshift as dev dep: `yarn add -D jscodeshift`
2. copy the `rxjs-import-migration.js` to your app
3. `jscodeshift -t rxjs-import-migration.js your-folder --extensions=ts --parser=ts --dry --print`: A dry run printing the results, but not applying them to the files of the 'your-folder' dir. Use to verify the script aint faling for you (smoke).
4. `jscodeshift -t rxjs-import-migration.js your-folder --extensions=ts --parser=ts`: Run the script for all ts-files within 'your-folder' directory. The changes are gonna be applied right away to your files.
