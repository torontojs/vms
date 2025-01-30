import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Rules} */
const rules = {
	'accessor-pairs': 'error',
	'array-callback-return': 'error',
	'arrow-body-style': 'error',
	'block-scoped-var': 'warn',
	'camelcase': 'warn',
	'capitalized-comments': 'warn',
	'class-methods-use-this': 'off',
	'complexity': 'error',
	'consistent-return': 'off',
	'consistent-this': ['warn', 'self'],
	'constructor-super': 'error',
	'curly': 'error',
	'default-case-last': 'error',
	'default-case': 'warn',
	'default-param-last': 'off',
	'dot-notation': 'off',
	'eqeqeq': ['error', 'smart'],
	'for-direction': 'error',
	'func-name-matching': 'error',
	'func-names': ['warn', 'as-needed'],
	'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
	'getter-return': ['error', { allowImplicit: true }],
	'grouped-accessor-pairs': 'error',
	'guard-for-in': 'warn',
	'id-denylist': 'off',
	'id-length': ['warn', {
		min: 3,
		max: 50,
		properties: 'never',
		exceptions: ['i', 'j', 'n', 'w', 'x', 'y', 'z', 'id', 'fs', 'up', '_', 't']
	}],
	'id-match': 'off',
	'init-declarations': 'off',
	'line-comment-position': ['error', { position: 'above' }],
	'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
	'max-classes-per-file': 'off',
	'max-depth': 'warn',
	'max-lines-per-function': ['warn', { max: 512 }],
	'max-lines': ['warn', 512],
	'max-nested-callbacks': 'warn',
	'max-params': 'off',
	'max-statements': ['warn', 512],
	'multiline-comment-style': 'off',
	'new-cap': 'error',
	'no-alert': 'error',
	'no-array-constructor': 'off',
	'no-async-promise-executor': 'error',
	'no-await-in-loop': 'error',
	'no-bitwise': 'error',
	'no-caller': 'error',
	'no-case-declarations': 'error',
	'no-class-assign': 'error',
	'no-compare-neg-zero': 'error',
	'no-cond-assign': ['error', 'always'],
	'no-console': ['warn', { allow: ['warn', 'error'] }],
	'no-const-assign': 'error',
	'no-constant-binary-expression': 'error',
	'no-constant-condition': 'error',
	'no-constructor-return': 'error',
	'no-continue': 'off',
	'no-control-regex': 'error',
	'no-debugger': 'warn',
	'no-delete-var': 'error',
	'no-div-regex': 'error',
	'no-dupe-args': 'error',
	'no-dupe-class-members': 'off',
	'no-dupe-else-if': 'error',
	'no-dupe-keys': 'error',
	'no-duplicate-case': 'error',
	'no-duplicate-imports': 'off',
	'no-else-return': 'warn',
	'no-empty-character-class': 'error',
	'no-empty-function': 'off',
	'no-empty-pattern': 'error',
	'no-empty-static-block': 'error',
	'no-empty': 'warn',
	'no-eq-null': 'error',
	'no-eval': 'error',
	'no-ex-assign': 'error',
	'no-extend-native': 'error',
	'no-extra-bind': 'error',
	'no-extra-boolean-cast': 'error',
	'no-extra-label': 'error',
	'no-fallthrough': 'error',
	'no-func-assign': 'error',
	'no-global-assign': 'error',
	'no-implicit-coercion': 'error',
	'no-implicit-globals': 'warn',
	'no-implied-eval': 'off',
	'no-import-assign': 'error',
	'no-inline-comments': ['warn', { ignorePattern: '(?:@vite-ignore|@ts-expect-error).+' }],
	'no-inner-declarations': ['error', 'both'],
	'no-invalid-regexp': 'error',
	'no-invalid-this': 'off',
	'no-irregular-whitespace': ['error', {
		skipStrings: true,
		skipTemplates: true,
		skipComments: false,
		skipRegExps: true
	}],
	'no-iterator': 'error',
	'no-label-var': 'error',
	'no-labels': 'error',
	'no-lone-blocks': 'error',
	'no-lonely-if': 'warn',
	'no-loop-func': 'off',
	'no-loss-of-precision': 'error',
	'no-magic-numbers': 'off',
	'no-misleading-character-class': 'error',
	'no-multi-assign': 'error',
	'no-multi-str': 'error',
	'no-negated-condition': 'off',
	'no-nested-ternary': 'error',
	'no-new-func': 'error',
	'no-new-native-nonconstructor': 'error',
	'no-new-symbol': 'error',
	'no-new-wrappers': 'error',
	'no-new': 'error',
	'no-nonoctal-decimal-escape': 'error',
	'no-object-constructor': 'error',
	'no-obj-calls': 'error',
	'no-octal-escape': 'error',
	'no-octal': 'error',
	'no-param-reassign': 'warn',
	'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
	'no-promise-executor-return': 'error',
	'no-proto': 'error',
	'no-prototype-builtins': 'warn',
	'no-redeclare': 'off',
	'no-regex-spaces': 'error',
	'no-restricted-exports': 'off',
	'no-restricted-globals': ['error', 'event'],
	'no-restricted-imports': 'off',
	'no-restricted-properties': 'off',
	'no-restricted-syntax': 'off',
	'no-return-assign': 'error',
	'no-script-url': 'error',
	'no-self-assign': ['error', { props: true }],
	'no-self-compare': 'error',
	'no-sequences': 'error',
	'no-setter-return': 'error',
	'no-shadow-restricted-names': 'error',
	'no-shadow': 'off',
	'no-sparse-arrays': 'error',
	'no-template-curly-in-string': 'warn',
	'no-ternary': 'off',
	'no-this-before-super': 'error',
	'no-throw-literal': 'off',
	'no-undef-init': 'warn',
	'no-undef': 'off', // Typescript provides better support
	'no-undefined': 'off',
	'no-underscore-dangle': ['error', { allow: ['_errors'] }],
	'no-unexpected-multiline': 'error',
	'no-unmodified-loop-condition': 'error',
	'no-unneeded-ternary': 'error',
	'no-unreachable-loop': 'error',
	'no-unreachable': 'error',
	'no-unsafe-finally': 'error',
	'no-unsafe-negation': 'error',
	'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
	'no-unused-expressions': 'off',
	'no-unused-labels': 'error',
	'no-unused-private-class-members': 'error',
	'no-unused-vars': 'off',
	'no-use-before-define': 'off',
	'no-useless-backreference': 'error',
	'no-useless-call': 'error',
	'no-useless-catch': 'error',
	'no-useless-computed-key': 'error',
	'no-useless-concat': 'error',
	'no-useless-constructor': 'off',
	'no-useless-escape': 'error',
	'no-useless-rename': 'error',
	'no-useless-return': 'error',
	'no-var': 'warn',
	'no-void': ['error', { allowAsStatement: true }],
	'no-warning-comments': 'warn',
	'no-with': 'error',
	'object-shorthand': 'warn',
	'one-var': ['warn', 'never'],
	'operator-assignment': 'warn',
	'prefer-arrow-callback': 'warn',
	'prefer-const': 'warn',
	'prefer-destructuring': 'off',
	'prefer-exponentiation-operator': 'warn',
	'prefer-named-capture-group': 'off',
	'prefer-numeric-literals': 'warn',
	'prefer-object-has-own': 'error',
	'prefer-object-spread': 'error',
	'prefer-promise-reject-errors': 'off',
	'prefer-regex-literals': 'warn',
	'prefer-rest-params': 'warn',
	'prefer-spread': 'warn',
	'prefer-template': 'warn',
	'radix': ['error', 'as-needed'],
	'require-atomic-updates': 'off',
	'require-await': 'off',
	'require-unicode-regexp': 'warn',
	'require-yield': 'error',
	'sort-imports': ['off', { ignoreCase: true, ignoreDeclarationSort: true }],
	'sort-keys': 'off',
	'sort-vars': 'warn',
	'strict': 'off',
	'symbol-description': 'error',
	'unicode-bom': 'error',
	'use-isnan': 'error',
	'valid-typeof': 'warn',
	'vars-on-top': 'warn',
	'yoda': 'error',

	// Typescript
	'@typescript-eslint/adjacent-overload-signatures': 'error',
	'@typescript-eslint/array-type': ['error', { default: 'array', readonly: 'array' }],
	'@typescript-eslint/await-thenable': 'error',
	'@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': false, 'ts-ignore': true, 'ts-nocheck': true, 'ts-check': false, 'minimumDescriptionLength': 3 }],
	'@typescript-eslint/ban-tslint-comment': 'error',
	'@typescript-eslint/ban-types': 'off',
	'@typescript-eslint/class-literal-property-style': ['error', 'fields'],
	'@typescript-eslint/class-methods-use-this': 'off',
	'@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
	'@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
	'@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }],
	'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
	'@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
	'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: true }],
	'@typescript-eslint/default-param-last': ['error'],
	'@typescript-eslint/dot-notation': ['error', {
		allowPattern: '^[a-z]+(_[a-z]+)+$',
		allowPrivateClassPropertyAccess: false,
		allowProtectedClassPropertyAccess: false,
		allowIndexSignaturePropertyAccess: false
	}],
	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/explicit-member-accessibility': 'off',
	'@typescript-eslint/explicit-module-boundary-types': 'off',
	'@typescript-eslint/init-declarations': ['off'],
	'@typescript-eslint/max-params': ['warn', { max: 6 }],
	'@typescript-eslint/member-ordering': 'off',
	'@typescript-eslint/method-signature-style': ['error', 'method'],
	'@typescript-eslint/naming-convention': ['error', {
		selector: 'default',
		format: ['PascalCase', 'camelCase'],
		leadingUnderscore: 'allow',
		trailingUnderscore: 'forbid',
		filter: {
			regex: '^(_id|__v)$',
			match: false
		}
	}, {
		selector: 'enumMember',
		format: ['UPPER_CASE'],
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid'
	}, {
		selector: 'variable',
		format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid',
		filter: {
			regex: '^(_id|__v)$',
			match: false
		}
	}, {
		selector: 'variable',
		format: ['camelCase', 'UPPER_CASE'],
		modifiers: ['unused'],
		leadingUnderscore: 'require',
		trailingUnderscore: 'forbid'
	}, {
		selector: 'objectLiteralMethod',
		format: null,
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid'
	}, {
		selector: 'objectLiteralProperty',
		format: null,
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid',
		filter: {
			regex: '^(_id|__v)$',
			match: false
		}
	}, {
		selector: 'typeProperty',
		format: null,
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid',
		filter: {
			regex: '^(_id|__v)$',
			match: false
		}
	}, {
		selector: 'typeMethod',
		format: null,
		leadingUnderscore: 'forbid',
		trailingUnderscore: 'forbid'
	}, {
		selector: 'typeLike',
		format: ['PascalCase']
	}],
	'@typescript-eslint/no-array-constructor': ['error'],
	'@typescript-eslint/no-array-delete': 'error',
	'@typescript-eslint/no-base-to-string': 'error',
	'@typescript-eslint/no-confusing-non-null-assertion': 'error',
	'@typescript-eslint/no-confusing-void-expression': ['error', { ignoreArrowShorthand: true, ignoreVoidOperator: true }],
	'@typescript-eslint/no-dupe-class-members': ['error'],
	'@typescript-eslint/no-duplicate-enum-values': 'error',
	'@typescript-eslint/no-duplicate-type-constituents': 'error',
	'@typescript-eslint/no-dynamic-delete': 'error',
	'@typescript-eslint/no-empty-function': ['error'],
	'@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
	'@typescript-eslint/no-explicit-any': 'warn',
	'@typescript-eslint/no-extra-non-null-assertion': 'error',
	'@typescript-eslint/no-extraneous-class': ['error', { allowConstructorOnly: true, allowEmpty: false, allowStaticOnly: true, allowWithDecorator: true }],
	'@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true, ignoreIIFE: true }],
	'@typescript-eslint/no-for-in-array': 'error',
	'@typescript-eslint/no-implicit-any-catch': 'off',
	'@typescript-eslint/no-implied-eval': ['error'],
	'@typescript-eslint/no-import-type-side-effects': 'error',
	'@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: false, ignoreProperties: false }],
	'@typescript-eslint/no-invalid-this': ['error', { capIsConstructor: true }],
	'@typescript-eslint/no-invalid-void-type': ['error', { allowInGenericTypeArguments: true, allowAsThisParameter: true }],
	'@typescript-eslint/no-loop-func': ['error'],
	'@typescript-eslint/no-loss-of-precision': ['off'],
	'@typescript-eslint/no-magic-numbers': ['warn', {
		enforceConst: true,
		ignoreDefaultValues: true,
		ignoreArrayIndexes: true,
		ignore: [-1, 0, 1, 16, 1000000, '-1n', '0n', '1n'],
		ignoreEnums: true,
		ignoreNumericLiteralTypes: true,
		ignoreReadonlyClassProperties: true
	}],
	'@typescript-eslint/no-meaningless-void-operator': ['error', { checkNever: false }],
	'@typescript-eslint/no-misused-new': 'error',
	'@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
	'@typescript-eslint/no-mixed-enums': 'error',
	'@typescript-eslint/no-namespace': ['error', { allowDeclarations: false, allowDefinitionFiles: true }],
	'@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
	'@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
	'@typescript-eslint/no-non-null-assertion': 'error',
	'@typescript-eslint/no-redeclare': ['error', { builtinGlobals: true, ignoreDeclarationMerge: true }],
	'@typescript-eslint/no-redundant-type-constituents': 'warn',
	'@typescript-eslint/no-require-imports': 'error',
	'@typescript-eslint/no-restricted-imports': ['error', {
		paths: [
			{
				name: 'error',
				message: 'Do not use this module!',
				allowTypeImports: true
			},
			{
				name: 'domain',
				message: 'Do not use this module!',
				allowTypeImports: true
			},
			{
				name: 'v8',
				message: 'Do not use this module!',
				allowTypeImports: true
			},
			{
				name: 'vm',
				message: 'Do not use this module!',
				allowTypeImports: true
			}
		]
	}],
	'@typescript-eslint/no-shadow': ['warn', {
		builtinGlobals: true,
		hoist: 'all',
		allow: ['name', 'status', 'event', 'prompt', 'alert', 'top', 'origin', 'self', 'length', 'close', 'open', 'stop', 'focus', 'blur', 'Image'],
		ignoreTypeValueShadow: true,
		ignoreFunctionTypeParameterNameValueShadow: false
	}],
	'@typescript-eslint/no-this-alias': ['error', { allowDestructuring: false, allowedNames: [] }],
	'@typescript-eslint/no-type-alias': 'off',
	'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
	'@typescript-eslint/no-unnecessary-condition': 'off',
	'@typescript-eslint/no-unnecessary-qualifier': 'error',
	'@typescript-eslint/no-unnecessary-template-expression': 'warn',
	'@typescript-eslint/no-unnecessary-type-arguments': 'error',
	'@typescript-eslint/no-unnecessary-type-assertion': 'error',
	'@typescript-eslint/no-unnecessary-type-constraint': 'error',
	'@typescript-eslint/no-unsafe-argument': 'off',
	'@typescript-eslint/no-unsafe-assignment': 'off',
	'@typescript-eslint/no-unsafe-call': 'off',
	'@typescript-eslint/no-unsafe-declaration-merging': 'error',
	'@typescript-eslint/no-unsafe-enum-comparison': 'error',
	'@typescript-eslint/no-unsafe-member-access': 'off',
	'@typescript-eslint/no-unsafe-return': 'off',
	'@typescript-eslint/no-unsafe-unary-minus': 'error',
	'@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
	'@typescript-eslint/no-unused-vars': ['warn', { args: 'all', caughtErrors: 'all', argsIgnorePattern: '^_' }],
	'@typescript-eslint/no-use-before-define': ['error', { functions: true, classes: true, variables: true, enums: true, typedefs: true, ignoreTypeReferences: false }],
	'@typescript-eslint/no-useless-constructor': ['error'],
	'@typescript-eslint/no-useless-empty-export': 'warn',
	'@typescript-eslint/no-var-requires': 'error',
	'@typescript-eslint/non-nullable-type-assertion-style': 'off',
	'@typescript-eslint/only-throw-error': ['error'],
	'@typescript-eslint/parameter-properties': ['error'],
	'@typescript-eslint/prefer-as-const': 'error',
	'@typescript-eslint/prefer-destructuring': 'warn',
	'@typescript-eslint/prefer-enum-initializers': 'error',
	'@typescript-eslint/prefer-find': 'warn',
	'@typescript-eslint/prefer-for-of': 'error',
	'@typescript-eslint/prefer-function-type': 'error',
	'@typescript-eslint/prefer-includes': 'warn',
	'@typescript-eslint/prefer-literal-enum-member': 'error',
	'@typescript-eslint/prefer-namespace-keyword': 'off',
	'@typescript-eslint/prefer-nullish-coalescing': 'warn',
	'@typescript-eslint/prefer-optional-chain': 'error',
	'@typescript-eslint/prefer-promise-reject-errors': 'warn',
	'@typescript-eslint/prefer-readonly-parameter-types': 'off',
	'@typescript-eslint/prefer-readonly': 'off',
	'@typescript-eslint/prefer-reduce-type-parameter': 'off',
	'@typescript-eslint/prefer-regexp-exec': 'warn',
	'@typescript-eslint/prefer-return-this-type': 'error',
	'@typescript-eslint/prefer-string-starts-ends-with': 'error',
	'@typescript-eslint/prefer-ts-expect-error': 'error',
	'@typescript-eslint/promise-function-async': 'warn',
	'@typescript-eslint/require-array-sort-compare': ['error', { ignoreStringArrays: true }],
	'@typescript-eslint/require-await': ['error'],
	'@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: true, allowNumberAndString: true }],
	'@typescript-eslint/restrict-template-expressions': ['off', {
		allowNumber: true,
		allowBoolean: false,
		allowAny: false,
		allowNullish: true
	}],
	'@typescript-eslint/return-await': ['warn', 'in-try-catch'],
	'@typescript-eslint/sort-type-constituents': 'warn',
	'@typescript-eslint/sort-type-union-intersection-members': 'off',
	'@typescript-eslint/strict-boolean-expressions': ['off', { allowNullableBoolean: true, allowNullableString: true, allowNullableObject: true }],
	'@typescript-eslint/switch-exhaustiveness-check': 'error',
	'@typescript-eslint/triple-slash-reference': 'off',
	'@typescript-eslint/typedef': 'off',
	'@typescript-eslint/unbound-method': ['off', { ignoreStatic: true }],
	'@typescript-eslint/unified-signatures': 'error'
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.LanguageOptions} */
const languageOptions = {
	globals: {
		...globals.browser,
		...globals.es2020,
		...globals.worker,
		...globals['shared-node-browser']
	},
	ecmaVersion: 'latest',
	sourceType: 'module',
	parser: tsParser,
	parserOptions: {
		ecmaFeatures: { impliedStrict: true },
		project: true,
		tsconfigRootDir: import.meta.dirname
	}
};

const ignores = ['node_modules/**/*', 'dist/**/*', 'public/**/*', 'dev-dist/**/*', 'src/content/**/*'];

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.Plugins} */
const plugins = {
	'@typescript-eslint': tsPlugin
};

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
	{
		name: 'Default TS config',
		files: ['src/**/*.{js,mjs,cjs,ts,cts,mts}'],
		ignores,
		languageOptions,
		plugins,
		rules
	}
];
