import React from 'react';
import { IconType } from 'react-icons';
import { Actions } from '@utils/constants/actions';

export type SnackBarType = {
  key: string;
  text: React.ReactNode;
  icon?: IconType;
  variant: 'success' | 'error' | 'warning' | 'info'; // snackbar variant
}

export type TAction = | {
  type: Actions.addSnackbar
  payload: {
    current: SnackBarType
  };
} | {
  type: Actions.removeSnackbar;
  payload: {
    key: string
  };
}


type  TStateType = {
  queue: SnackBarType[]
}


export const snackBarReducer = (state: TStateType, action: TAction) => {
  switch (action.type) {
    case 'ADD_SNACKBAR': {
      const { queue } = state;
      const { current } = action.payload;

      const isQueue = queue.some((snack) => snack.key === current.key);

      if (isQueue) {
        return state;
      }

      return {
        queue: [...queue, current]
      };
    }
    case 'REMOVE_SNACKBAR': {
      const { queue } = state;
      const { key: snackKey } = action.payload;

      return {
        queue: queue.filter((snackbar) => snackbar.key !== snackKey)
      };
    }
    default: {
      throw new Error('Unknown action type');
    }
  }
};