import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
  title: ''
}

const reducer = createReducer(initialState, {
  'SET_TITLE': (state, { payload }) => (
    {
      ...state,
      title: payload
    }
  )
})

export default reducer;