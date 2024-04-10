
import axios, { AxiosError } from "axios";

const PutData = async (url: any, data: any, thirdValue: any): Promise<any> => {
    try {
        const response = await axios.put(url, data, thirdValue)
        console.log(response.data)
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.log("error: ",error)
        console.error('Error :', axiosError.response?.data);
        return axiosError.response;
    }
}
export default PutData;