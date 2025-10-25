import LocalStorageAdapter from './local-storage-adapter.js';

const localStorageKey = 'elrouss-portfolio:auth';

class Auth {
  static isWebsiteFirstVisit = false;

  static authorize = () => {
    if (LocalStorageAdapter.getItem(localStorageKey)) {
      this.isWebsiteFirstVisit = true;
    } else {
      LocalStorageAdapter.setItem(localStorageKey, true);
    }
  };
}

export default Auth;
