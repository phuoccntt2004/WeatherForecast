import axiosClient from "./axiosClient";

class GetWeatherAPI {
    HandleGetWeatherAPI = async (
        url: string,
    ) => {
        return await axiosClient(`${url}`,{
            method:  'get',
        });
    }
}

const getWeatherAPI = new GetWeatherAPI()

export default getWeatherAPI;