import React, { ReactNode } from 'react';
import { ImageBackground, SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';
import { ScrollView } from "react-native-virtualized-view";
import { globalStyle } from "../styles/globalStyle";


interface Props {
    isImageBackground?: boolean,
    isScroll?: boolean,
    title?: string,
    children: ReactNode,
    styles?: StyleProp<ViewStyle>
}

const ContainerComponent = (props: Props) => {
    const {isImageBackground, isScroll, title, children, styles} = props

    const returnContainer = isScroll ? <ScrollView>{children}</ScrollView> : <View>{children}</View>
    
    return  isImageBackground ? (<ImageBackground>{returnContainer}</ImageBackground>) : (
        <SafeAreaView style = {[globalStyle.container, styles]}>
            <View>
                {returnContainer}
            </View>
        </SafeAreaView>
    )
}

export default ContainerComponent