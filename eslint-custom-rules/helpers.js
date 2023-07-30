const createError = (node, message, fix = null) => ({
  fix,
  message,
  node
});

const hasCamelCase = string => /([a-z]*)([A-Z]*?)([A-Z][a-z]+)/g.test(string);

const snakeCase = string => {
  let str = string;
  const upperChars = str.match(/([A-Z])/g);

  upperChars.forEach(char => {
    str = str.replace(new RegExp(char), '_' + char.toLowerCase());
  });

  if (str[0] === '_') {
    str = str.slice(1);
  }

  return str;
};

const simplifyString = string => {
  let str = string;

  if (hasCamelCase(str)) {
    str = snakeCase(str);
  }

  return str.toLowerCase();
};

const hasAlphabetOrderError = (currentString, nextString) => simplifyString(currentString) > simplifyString(nextString);

module.exports = {
  createError,
  hasAlphabetOrderError
};
