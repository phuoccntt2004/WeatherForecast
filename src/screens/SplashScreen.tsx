import React from 'react';
import { ActivityIndicator, Image } from 'react-native';
import COLORS from '../assets/colors/Colors';
import IMAGES from '../assets/images';
import { ContainerComponent, SectionComponent, SpaceComponent, TextComponent } from '../component';
import { FONTFAMILY } from './../../assets/fonts';

const SplashScreen = () => {

    return (
        <ContainerComponent styles={{justifyContent: 'center', alignItems: 'center'}}>
            <SectionComponent styles={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={IMAGES.Splash}/>
                <TextComponent text="WEATHER" styles={{ fontFamily: FONTFAMILY.montserrat_medium , marginTop: -200}} title color={COLORS.BLACK}/>
            </SectionComponent>
            <SpaceComponent height={16} />
            <ActivityIndicator color={COLORS.ORANGE} size={40} />
        </ContainerComponent>
    )
}

export default SplashScreen