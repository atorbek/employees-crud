/**
 * Проверяет запущено ли приложение в development режиме.
 * @returns {boolean}
 */
const isDevelopmentMode = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Проверяет необходимость формировать заглушку, вместо реальных данных.
 * @returns {boolean}
 */
const needStubs = (): boolean => process.env.NEED_STUB === 'true';

const formatTimestamp = (timestamp: number | string) => {
  const date = new Date(+timestamp);
  const hours = date.getHours();
  let minutes = date.getMinutes();

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

export {
  isDevelopmentMode,
  needStubs,
  formatTimestamp
};
