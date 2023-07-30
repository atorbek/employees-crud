/**
 * Проверяет запущено ли приложение в development режиме.
 * @returns {boolean}
 */
const isDevelopmentMode = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export {
  isDevelopmentMode
};
