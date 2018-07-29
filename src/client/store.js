import { CookieStorage } from 'redux-persist-cookie-storage';
import {
  applyMiddleware,
  createStore
} from 'redux';
import {
  composeWithDevTools
} from 'redux-devtools-extension/developmentOnly';
import {
  autoRehydrate,
  persistStore
} from 'redux-persist-immutable';
import {
  persistReducer
} from 'redux-persist';
import thunk from 'redux-thunk';

import allReducers from './reducers';

class Store {
  constructor(reducers, storage) {
    const persistedReducer = persistReducer({ key: 'root', storage }, reducers);

    this.store = createStore(
      persistedReducer,
      composeWithDevTools(
        applyMiddleware(thunk),
        autoRehydrate()
      )
    );

    this.hydrateStore();

    if (module.hot) {
      module.hot.accept(reducers, () => {
        const nextRootReducer = reducers.default;
        this.store.replaceReducer(nextRootReducer);
      });
    }
  }

  getHydratedState() {
    return this.hydrateStore()
      .then(() => this.store.getState());
  }

  getStore() {
    return this.store;
  }

  hydrateStore() {
    if (!this.hydratedStore) {
      this.hydratedStore = new Promise((resolve, reject) => {
        persistStore(
          this.store,
          {},
          (err, state) => {
            if (err) { reject(err); }
            resolve(state);
          }
        );
      });
    }

    return this.hydratedStore;
  }
}

const store = new Store(allReducers, new CookieStorage({ cookies: {} }));

export default store;
