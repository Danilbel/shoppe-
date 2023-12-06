import { configureStore } from '@reduxjs/toolkit';

import authorization from '../components/authorization/AuthorizationSlice';
import notification from '../components/notification/NotificationSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        });
    }
    return next(action);
};

const store = configureStore({
    reducer: {authorization, notification},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
});

export default store;