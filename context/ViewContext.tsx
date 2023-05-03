'use client';
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useReducer, useState } from 'react';
import { snackBarReducer, SnackBarType, TAction } from '@utils/reducers';
import { Snackbar } from '@/assets/Snackbar/Snackbar';
import { Actions } from '@utils/constants/actions';

interface ViewContextParams {
  queue: SnackBarType[],
  dispatch: Dispatch<TAction>
}


export const ViewContext = createContext<ViewContextParams>(
  {
    queue: [] as SnackBarType[],
    dispatch: () => {
    }
  });

export const ViewProvider = ({ children }: any) => {

  const [{ queue }, dispatch] = useReducer(snackBarReducer, { queue: [] });

  return (
    <ViewContext.Provider value={{
      queue,
      dispatch
    }}>
      {queue.map((snack, index) => {
          setTimeout(() => {
            dispatch({ type: Actions.removeSnackbar, payload: { key: snack.key } });
          }, 5000);
          return (
            <Snackbar
              key={snack.key}
              // @ts-ignore
              className={`-mt-${index + 1} left-${index + 4}`}
              text={snack.text}
              variant={snack.variant}
              icon={snack.icon}
              handleClose={() =>
                dispatch({ type: Actions.removeSnackbar, payload: { key: snack.key } })
              }
            />
          );
        }
      )}

      {children}
    </ViewContext.Provider>
  );
};

class SnackbarType {
}

export const useSnackbar = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useSnackbar was called outside SnackbarProvider');
  }
  const { dispatch } = context;

  return useCallback(
    (snack: SnackbarType) => {
      // @ts-ignore
      dispatch({ type: Actions.addSnackbar, payload: { current: snack } });
    },
    [dispatch]
  );
};