const noFetchXhr = require('./no-fetch-xhr');
const sortClassMethods = require('./sort-class-methods');
const sortImports = require('./sort-imports');

module.exports = {
  rules: {
    'no-fetch-xhr': {
      create: noFetchXhr,
      meta: {
        docs: {
          description: 'Правило, запрещающее использование fetch и XMLHttpRequest при разработке ВП'
        }
      }
    },

    'sort-class-methods': {
      create: sortClassMethods,
      meta: {
        docs: {
          description: 'Правила сортировки методов в классе'
        }
      }
    },

    'sort-imports': {
      create: sortImports,
      meta: {
        docs: {
          description: 'Правила сортировки импортов'
        }
      }
    }
  }
};
