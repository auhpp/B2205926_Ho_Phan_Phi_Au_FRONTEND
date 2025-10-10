import axios from "axios";

const commomConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
}

export default (baseURL) => {
    return axios.create(
        {
            baseURL,
            ...commomConfig
        }
    )
}