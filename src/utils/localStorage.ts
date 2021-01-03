const { localStorage } = window;

export const setItem = (key: string, value: any) => {
  if (localStorage) {
    const item: any = JSON.stringify(value || null);
    localStorage.setItem(key, item);
  }
}

export const getItem = (key: string) => {
  if (localStorage) {
    const item: any = localStorage.getItem(key) || 'null';
    return JSON.parse(item);
  }
  return null
}


export const removeItem = (key: string) => {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}