import React, { ReactNode } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import COLORS from '../assets/colors/Colors';

interface Props {
    children: ReactNode;
}

const KeyboardAvoidingViewWrapper = (props: Props) => {

    const {children} = props
    return (
        <KeyboardAvoidingView style = {{flex : 1, backgroundColor: COLORS.WHITE}}>
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        {children}
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default KeyboardAvoidingViewWrapper