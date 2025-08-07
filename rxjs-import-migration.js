module.exports = function transformer(file, api) {
	const j = api.jscodeshift;
	const root = j(file.source);

	// Find all `rxjs/operators` imports
	const operatorImportDecls = root.find(j.ImportDeclaration, {
		source: { value: 'rxjs/operators' }
	});

	if (!operatorImportDecls.size()) return;

	// Extract all imported operator specifiers
	const operatorSpecifiers = [];
	operatorImportDecls.forEach(path => {
		path.node.specifiers.forEach(spec => {
			if (spec.type === 'ImportSpecifier') {
				operatorSpecifiers.push(spec);
			}
		});
	});

	// Remove the `rxjs/operators` import
	operatorImportDecls.remove();

	// Find existing `rxjs` import (if any)
	const rxjsImport = root.find(j.ImportDeclaration, {
		source: { value: 'rxjs' }
	});

	if (rxjsImport.size()) {
		// Append operator specifiers to existing rxjs import (de-duplicate)
		const existingSpecifiers = rxjsImport.get(0).node.specifiers;
		const existingNames = new Set(existingSpecifiers.map(s => s.imported.name));

		operatorSpecifiers.forEach(spec => {
			if (!existingNames.has(spec.imported.name)) {
				existingSpecifiers.push(spec);
			}
		});
	} else {
		// Create a new import declaration for rxjs
		const newImport = j.importDeclaration(operatorSpecifiers, j.literal('rxjs'));
		root.get().node.program.body.unshift(newImport);
	}

	return root.toSource({ quote: 'single' });
};
