# rxjs-operators-import-migration-v6-v7

Provides a script for migrating rxjs v6-v7 operators: imports from 'rxjs/operators' are gonna be deprecated soon as per docs -> import directly from 'rxjs'. This script leverages the jscodeshift lib in order to process all ts files, fixing the imports. The script respects existing imports from 'rxjs' - operators are gonna be appended to that import. 

## Running

1. add jscodeshift as dev dep: `yarn install -D jscodeshift`
2. copy the `rxjs-import-migration.js` to your app
3. `jscodeshift -t rxjs-import-migration.js your-folder --extensions=ts --parser=ts --dry --print`: A dry run printing the results, but not applying them to the files of the 'your-folder' dir. Use to verify the script aint faling for you (smoke).
4. `jscodeshift -t rxjs-import-migration.js your-folder --extensions=ts --parser=ts`: Run the script for all ts-files within 'your-folder' directory. The changes are gonna be applied right away to your files.
