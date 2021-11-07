import axios from "axios";
import * as actions from "../api";

const api =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (action.type !== actions.apiCallBegan.type) return next(action);
        const { url, onStart, onSuccess, onError, options } =
            action.payload;

        if (onStart) dispatch({ type: onStart });
        next(action);
        var data = options
        var method = "Post"
        try {
            const response = await axios.request({
                baseURL: "https://api.spacexdata.com/v4/",
                url,
                method,
                data,
            });
            // General
            dispatch(actions.apiCallSucess(response.data));
            // Specific
            if (onSuccess)
                dispatch({ type: onSuccess, payload: response.data });
        } catch (error) {
            // General
            dispatch(actions.apiCallFailed(error.message));
            // Specific
            if (onError) dispatch({ type: onError, payload: error.message });
        }
    };

export default api;