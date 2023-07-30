const report = (context, node, expressionName) => {
  const {name} = node.callee;

  if (name === expressionName) {
    let message = '';
    message += 'Для взаимодействия встроенного приложения и SMP вместо fetch и XMLHttpRequest необходимо использовать методы restCall* jsAPI. \r\n';
    message += 'Подробнее о доступных методах см.: https://www.naumen.ru/docs/sd/NSD_manual.htm#applications/JSAPI_metods.htm';

    context.report({node, message});
  }
};

module.exports = function (context) {
  return {
    CallExpression (node) {
      report(context, node, 'fetch');
    },
    NewExpression (node) {
      report(context, node, 'XMLHttpRequest');
    }
  };
};
