import { View, Text, TouchableOpacity, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import SectionComponent from './SectionComponent'
import IMAGES from '../assets/images'
import TextComponent from './TextComponent'
import COLORS from '../assets/colors/Colors'
import moment from 'moment'

interface Props {
    imageDescription: string,
    date?: Date,
    humidity: number
}

const CardWeatherDaily = (props:Props) => {
    const {imageDescription, date, humidity} = props
    
    const imageWeather = (key: string) => {
        switch (key) {
            case 'Clouds': return (<Image style = {{height: 80, width: 80, marginBottom: 10}} source={IMAGES.Cloud} />)
            case 'Rain': return (<Image style = {{height: 80, width: 80, marginBottom: 10}} source={IMAGES.ModeRateRain} />)
            case 'Thunderstorm': return (<Image style = {{height: 80, width: 80, marginBottom: 10}} source={IMAGES.HeavenRain} />)
            case 'Mist': return (<Image style = {{height: 80, width: 80, marginBottom: 10}} source={IMAGES.Mist} />)
            default: return (<TextComponent text={'Chưa cập nhật'} />)
        }
    }
    const convertCelsius = (k: number) => {
        return Math.round(k - 273.15)
    }
    return (
        <TouchableOpacity>
            <SectionComponent styles = {{padding: 10, borderRadius: 15, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginEnd: 10}}>
                {imageWeather(imageDescription)}
                <TextComponent text={moment(date).format('dddd')} styles = {{textAlign: 'center'}}/>
                <TextComponent text={`${convertCelsius(humidity)}°`} styles = {{textAlign: 'center'}}/>
            </SectionComponent>
        </TouchableOpacity>
    )
}

export default CardWeatherDaily