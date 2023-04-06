import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
export const httpFetcher = async (url) => {
    var data = await axios.get(url);
    return data.data;
}

export const updateMacaamiilInfo = async (body, theUserId) => {
    try {
        const { data } = await axios.post(
            `api/client-update/${theUserId}/`,
            body
        );
        return data;
    } catch (error) {
        return null;
    }
};
export const createMacaamiilInfo = async (body) => {
    try {
        const { data } = await axios.post(
            `api/client-create/`,
            body
        );
        return data;
    } catch (error) {
        return null;
    }
};
export const createTransactionForTheUser = async (body) => {
    try {
        const { data } = await axios.post(
            `api/transactionMoney-create/`,
            body
        );
        return data;
    } catch (error) {
        return null;
    }
};
export const createBoss = async (body) => {
    try {
        const { data } = await axios.post(
            `api/booska-create/`,
            body
        );
        return data;
    } catch (error) {
        return null;
    }
};

export const createBooskaChanges = async (body) => {
    try {
        const { data } = await axios.post(
            `api/booskaChanges-create/`,
            body
        );
        return data;
    } catch (error) {
        return null;
    }
};