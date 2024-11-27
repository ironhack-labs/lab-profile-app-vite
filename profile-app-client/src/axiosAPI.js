import axios from "axios";

const backendUri = (import.meta.env.VITE_BACKEND_URI || "http://localhost:3000");

async function axiosGet(uriPath, token = null, username = null) {
    const header = createHeader(token, username);
    const uri = backendUri + uriPath;
    console.log("GET", uriPath);

    return await axios.get(uri, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(">GET", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(">GET", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

async function axiosPost(uriPath, requestBody, username = null) {
    if (typeof (requestBody) !== "object" || Object.values(requestBody).some((value) => !value || value == "")) {
        console.error("POST", "Reqest Body has empty values");
        return false;
    }
    const header = createHeader(null, username);
    const uri = backendUri + uriPath;
    console.log("POST", uriPath, requestBody);

    return await axios.post(uri, requestBody, header)
        .then((response) => {
            const responseMessage = response.data.message ? response.data.message : getStatusMeaning(response.status)[0];
            console.log(">POST", responseMessage);

            return { data: response.data, statusCode: response.status, message: responseMessage, success: true };
        })
        .catch((error) => {
            console.log(error);

            const responseMessage = error?.response?.data?.message ? error.response.data.message : getStatusMeaning(error.status)[0];
            console.log(">POST", responseMessage);

            return { statusCode: error.status, message: responseMessage, success: false };
        });
}

function createHeader(token) {
    const headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    console.log("Headers:", headers);
    
    return { headers };
}

function getStatusMeaning(statusCode) {
    switch (statusCode) {
        case 200:
            return ["OK", "The request has succeeded."];
        case 201:
            return ["Created", "The request has succeeded and a new resource has been created."];
        case 204:
            return ["No Content", "The server successfully processed the request, but is not returning any content."];
        case 400:
            return ["Bad Request", "The server could not understand the request due to invalid syntax."];
        case 401:
            return ["Unauthorized", "The client must authenticate itself to get the requested response."];
        case 403:
            return ["Forbidden", "The client does not have access rights to the content."];
        case 404:
            return ["Not Found", "The server can not find the requested resource."];
        case 500:
            return ["Internal Server Error", "The server has encountered a situation it doesn't know how to handle."];
        case 502:
            return ["Bad Gateway", "The server, while acting as a gateway or proxy, received an invalid response from the upstream server."];
        case 503:
            return ["Service Unavailable", "The server is not ready to handle the request."];
        case 504:
            return ["Gateway Timeout", "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server."];
        default:
            return ["Unknown Status Code", "The status code is not recognized."];
    }
}

function useAxiosAPI() {
    return {
        axiosGet,
        axiosPost,
    };
}

export default useAxiosAPI;