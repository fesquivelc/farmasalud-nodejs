import eslintjs from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';

const { node, browser } = globals;
const { configs } = eslintjs;

export default [
  {
    ignores: [
      'node_modules/**',
      'src/public/javascripts/*.min.js',
      'src/public/js/*.*',
      'coverage/**',
      'dist/**'
    ]
  },
  configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module', // ✅ ahora sí, porque usas import/export
      globals: {
        ...node,
        ...browser
      }
    },
    rules: {
      // Mejores prácticas generales
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-var': 'error',
      'prefer-const': 'error',

      // Estilo y formato
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'never'],

      // Seguridad
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',

      // Node.js específico
      'no-process-exit': 'error',
      'no-sync': 'warn',

      // Manejo de errores
      'no-throw-literal': 'error',
      'prefer-promise-reject-errors': 'error'
    }
  },
  eslintConfigPrettier
];
