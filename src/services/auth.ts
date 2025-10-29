import LocalStorageAdapter from './local-storage-adapter';

const localStorageKey = 'elrouss-portfolio:auth';

class Auth {
  static isWebsiteFirstVisit = true;

  static authorize = () => {
    if (LocalStorageAdapter.getItem<true>(localStorageKey)) {
      this.isWebsiteFirstVisit = false;
    } else {
      LocalStorageAdapter.setItem(localStorageKey, true);
    }
  };
}

export default Auth;
