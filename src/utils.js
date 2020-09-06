import isEmpty from 'lodash/isEmpty';

export const dataOrNull = (data) => {
  if (typeof data === 'object') {
    return isEmpty(data) ? null : data;
  }

  return data || null;
};

export const getFullUrl = (url = '') => {
  if (!url) {
    return null;
  }

  return url.startsWith('//') && !url.startsWith('http')
    ? `https:${url}`
    : url;
};
