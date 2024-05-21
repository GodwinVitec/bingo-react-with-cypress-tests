export function useLocalStorage() {
  const getFromLocalStorage = (key) => {
    return localStorage.getItem(key);
  };

  const setInLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  return {
    getFromLocalStorage,
    setInLocalStorage
  }
}