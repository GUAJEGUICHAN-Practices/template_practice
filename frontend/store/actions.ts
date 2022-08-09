import { createAction } from "@reduxjs/toolkit";

export const setTitle = createAction<string | undefined>('SET_TITLE')
