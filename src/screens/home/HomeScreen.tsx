import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardWeatherDaily, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../component';
import { FONTFAMILY } from '../../../assets/fonts';
import IMAGES from '../../assets/images';
import moment from 'moment';
import getWeatherAPI from '../../apis/GetWeatherAPI';
import COLORS from '../../assets/colors/Colors';
import { Calendar, SearchNormal } from 'iconsax-react-native';

const HomeScreen = () => {
    const API_KEY = '96a8b599ab97029749963af8579c73fc';
    const CITY_NAME = 'Hoi An'
    const [search, setSearch] = useState('');
    const [weather, setWeather] = useState<any>({})
    useEffect(() => {
        const getWeather = async () => {
            try {
                const respone = await getWeatherAPI.HandleGetWeatherAPI(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}`)
                setWeather(respone)

            } catch (error) {
                console.log(error);

            }
        }
        getWeather()
    })
    const currentDate = new Date();
    const futureTimes = weather?.list?.filter((item: any) => new Date(item.dt_txt) > currentDate);
    const closestTime = futureTimes?.reduce((closest: any, item: any) => {
        const itemDate = new Date(item.dt_txt);
        const timeDiff = Math.abs(itemDate.getTime() - currentDate.getTime());

        if (!closest || timeDiff < closest.diff) {
            return { item, diff: timeDiff };
        }
        return closest;
    }, null)?.item;
    const capitalizeFirstLetter = (string: any) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };
    const convertCelsius = (k: number) => {
        return Math.round(k - 273.15)
    }
    const imageWeather = (key: string) => {
        switch (key) {
            case 'Clouds': return (<Image style={{ width: 250, height: 250 }} source={IMAGES.Cloud} />)
            case 'Rain': return (<Image style={{ width: 250, height: 250 }} source={IMAGES.ModeRateRain} />)
            case 'Thunderstorm': return (<Image style={{ width: 250, height: 250 }} source={IMAGES.HeavenRain} />)
            case 'Mist': return (<Image style={{ width: 250, height: 250 }} source={IMAGES.Mist} />)
            default: return (<TextComponent text={'Chưa cập nhật'} />)
        }
    }
    // Giả sử ngày hiện tại là "2024-08-15"
    const formattedList: [] = weather?.list?.map((item: any) => {
        const date: Date = new Date(item.dt_txt);
        return {
            date: date.toISOString().split('T')[0], // Chỉ lấy phần ngày
            time: date.toISOString().split('T')[1], // Chỉ lấy phần giờ
            original: item // Lưu lại đối tượng gốc
        };
    });

    // Tạo đối tượng để lưu các đối tượng đầu tiên của mỗi ngày
    const uniqueDates: Set<string> = new Set();
    const earliestTimes: any = [];

    // Duyệt qua từng phần tử để lọc
    formattedList?.forEach(({ date, original }) => {
        // Bỏ qua ngày hiện tại
        if (!uniqueDates.has(date) && date !== currentDate.toISOString().split('T')[0]) {
            uniqueDates.add(date);
            earliestTimes.push(original); // Lấy đối tượng gốc
        }
    });

    // Sắp xếp mảng earliestTimes theo ngày và giờ
    earliestTimes.sort((a: any, b: any) => new Date(a.dt_txt).getTime() - new Date(b.dt_txt).getTime());
    return (
        <ContainerComponent styles={{ backgroundColor: COLORS.BLUE_BLACK }}>
            <SectionComponent styles={{ marginTop: 60 }}>
                <InputComponent
                    value={search}
                    suffix={<SearchNormal color={COLORS.HEX_LIGHT_GREY} size={22}/>}
                    onChange={val => setSearch(val)}
                    placeholder="Tìm kiếm"
                />
                <RowComponent justify="center">
                    <TextComponent
                        text={`${weather?.city?.name}, `}
                        font={FONTFAMILY.montserrat_bold}
                        size={32}
                    />
                    <TextComponent
                        text={`${weather?.city?.country}`}
                        font={FONTFAMILY.montserrat_regular}
                        size={32}
                    />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='center'>
                    {imageWeather(closestTime?.weather[0]?.main)}
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='center'>
                    <TextComponent text={`${convertCelsius(closestTime?.main?.temp)}°`} styles={{ marginStart: 25 }} font={FONTFAMILY.montserrat_medium} size={60} />
                </RowComponent>
                <RowComponent styles={{ marginTop: -20 }} justify='center'>
                    <TextComponent text={capitalizeFirstLetter(closestTime?.weather[0]?.description)} size={20} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent>
                        <Image style={{ width: 25, height: 25, marginEnd: 10 }} source={IMAGES.Wind_Icon} />
                        <TextComponent text={`${closestTime?.wind?.speed} m/s`} />
                    </RowComponent>
                    <RowComponent>
                        <Image style={{ width: 25, height: 25, marginEnd: 10 }} source={IMAGES.Drop_Icon} />
                        <TextComponent text={`${closestTime?.main?.humidity}%`} />
                    </RowComponent>
                    <RowComponent>
                        <Image style={{ width: 25, height: 25, marginEnd: 10 }} source={IMAGES.Sun_Icon} />
                        <TextComponent text={moment(closestTime?.dt_txt).format('HH:mm')} />
                    </RowComponent>
                </RowComponent>
            </SectionComponent>
            <SpaceComponent height={10} />
            <SectionComponent>
                <RowComponent>
                    <Calendar color={COLORS.WHITE} size={22} variant='Bold' />
                    <TextComponent text=' Weather for the next 5 days' font={FONTFAMILY.montserrat_regular} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <FlatList horizontal showsHorizontalScrollIndicator={false} data={earliestTimes} keyExtractor={(item) => item.dt_txt} renderItem={({ item }) => (
                    <CardWeatherDaily imageDescription={item?.weather[0]?.main} date={item?.dt_txt} humidity={item?.main?.temp} />
                )} />
            </SectionComponent>
        </ContainerComponent>
    );
}

export default HomeScreen