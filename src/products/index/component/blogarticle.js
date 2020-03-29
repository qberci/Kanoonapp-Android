import React from 'react';
import {Image, Linking, Platform, StyleSheet , TouchableOpacity} from 'react-native';
import { View,Text } from 'native-base';


export default class Article extends React.Component {
    render(){
        let data = this.props;
        return(
            <TouchableOpacity onPress={() => this.openURL(data.url)}>
                <View style={Style.MainView}>
                    <Image style={Style.Image} source={{uri:data.image}}>
                        <View style={Style.TextView}>
                            <Text style={Style.Text}>{data.text}</Text>
                        </View>
                    </Image>
                </View>
            </TouchableOpacity>
        )
    }

    openURL(url) {

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't open URI: " + url);
            }
        });

    }
}


const Style = StyleSheet.create({
    MainView:{
        width:200,
        margin:5,
        elevation:2,
    },
    Image:{
        width:null,
        height:100,
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'flex-end',
        alignItems:'stretch',
        alignContent:'stretch',
    },
    TextView:{
        height:30,
        backgroundColor:'rgba(255,255,255,0.5)',
    },
    Text:{
        margin:5,
        ...Platform.select({
            ios: {
                fontFamily : 'IRANSansMobile',
                fontWeight : "bold"
            },
            android: {
                fontFamily : 'IRANSansMobile_Bold',
            },
        }),
        fontSize:12,
        color:'#08155e',
    }
});