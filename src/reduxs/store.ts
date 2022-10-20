import { AnyAction, configureStore, MiddlewareArray, Store, ThunkDispatch } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// logger, 
export type RootState = ReturnType<typeof rootReducer>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppStore = Omit<Store<RootState, AnyAction>, "dispatch"> & {
  dispatch: AppThunkDispatch;
};

const resettableRootReducer = (state: ReturnType<typeof rootReducer> | undefined, action: AnyAction) => {
  if (action.type === 'auth/logoutAction') {
    return rootReducer(undefined, action);
  };

  return rootReducer(state, action);
};

const store: AppStore = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: resettableRootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})


export default store;