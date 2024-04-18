
import { userData } from "@/data/authenticate";
import axios, { AxiosError } from "axios";

const postData = async (url: any, data: any, thirdValue: any): Promise<any> => {
    const token = userData()?.token;
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error: ", error)
        console.error('Error :', axiosError.response?.data);
        return axiosError.response;
    }
}
export default postData;