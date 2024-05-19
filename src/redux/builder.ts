import {
  type ActionReducerMapBuilder,
  type AsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { type Draft } from 'immer';

function builder<S>(fetchSync: AsyncThunk<any, any, any>) {
  return (builder: ActionReducerMapBuilder<ReduxState<S>>) => {
    builder
      .addCase(fetchSync.pending, (state: Draft<ReduxState<S>>) => {
        state.status = ResponseStatus.Loading;
      })
      .addCase(fetchSync.fulfilled, (state: Draft<ReduxState<S>>, action) => {
        state.status = ResponseStatus.Succeeded; // Succeeded
        state.result = action.payload;
      })
      .addCase(
        fetchSync.rejected,
        (state: Draft<ReduxState<S>>, action: PayloadAction<any, string, any, any>) => {
          state.status = ResponseStatus.Failed;
          state.error = action?.error?.message;
        },
      );
  };
}

export default builder;
