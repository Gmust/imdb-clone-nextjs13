'use client';
import { createContext, Dispatch, SetStateAction, useCallback, useContext, useReducer, useState } from 'react';
import { snackBarReducer, SnackBarType, TAction } from '@utils/reducers';
import { Snackbar } from '@/assets/Snackbar/Snackbar';

interface ViewContextParams {
  showModal: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  queue: SnackBarType[],
  dispatch: Dispatch<TAction>
}


export const ViewContext = createContext<ViewContextParams>(
  {
    showModal: false,
    setShowModal: () => false,
    queue: [] as SnackBarType[],
    dispatch: () => {
    }
  });

export const ViewProvider = ({ children }: any) => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [{ queue }, dispatch] = useReducer(snackBarReducer, { queue: [] });

  return (
    <ViewContext.Provider value={{
      showModal,
      setShowModal,
      queue,
      dispatch
    }}>
      {queue.map((snack, index) =>
        <Snackbar
          key={snack.key}
          // @ts-ignore
          className={`-mt-${index + 1} left-${index + 4}`}
          text={snack.text}
          // @ts-ignore
          variant={snack.variant}
          icon={snack.icon}
          handleClose={() =>
            dispatch({ type: 'REMOVE_SNACKBAR', payload: { key: snack.key } })
          }
        />
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
    throw new Error("useSnackbar was called outside SnackbarProvider");
  }
  const { dispatch } = context;

  return useCallback(
    (snack: SnackbarType) => {
      // @ts-ignore
      dispatch({ type: "ADD_SNACKBAR", payload: { current: snack } });
    },
    [dispatch]
  );
};