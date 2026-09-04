import { useReducer } from 'react'

const httpReducer = (state, action) => {
    switch (action.type) {
        case 'SEND':
            return { data: null, error: null, status: 'pending' };
        case 'SUCCESS':
            return { data: action.responseData, error: null, status: 'completed' };
        case 'ERROR':
            return { data: null, error: action.errorMessage, status: 'completed' };
    }
};

const useHttp = (requestFunction, startWithPending = false) => {

    const [httpState, dispatch] = useReducer(httpReducer, {
        data: null,
        error: null,
        status: startWithPending ? 'pending' : null,
    });

    const sendRequest = async (...requestData) => {
        try {
            dispatch({ type: 'SEND' });
            const responseData = await requestFunction(...requestData);
            dispatch({ type: 'SUCCESS', responseData });
        } catch (error) {
            console.dir(error);
            dispatch({ type: 'ERROR', errorMessage: error.response?.data?.message});
        }
    };

    return {
        sendRequest,
        ...httpState
    };
};

export default useHttp;