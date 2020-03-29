import React from 'react';
// noinspection ES6CheckImport
import {Dimensions, Image, Platform, StyleSheet} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import {Spinner, Text, View} from "native-base";

export class Loading extends React.Component{
    render(){
        return(
            <View style={Style.LoadingContent}>
                <Spinner style={{marginTop:30,marginBottom:30}} />
            </View>
        )
    }
}

export class Error extends React.Component{
    render(){
        return(
            <View style={Style.ErrorContent}>
                <Image style={Style.ErrorImage} source={require('./../assets/images/error1.png')}/>
                <Text style={Style.ErrorText}>ارور ! </Text>
                <Text>{this.props.note}</Text>
            </View>
        )
    }
}

const Style = StyleSheet.create({
    LoadingContent : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },

    ErrorContent : {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        marginTop:20,
        marginBottom:20
    },

    ErrorText : {
        fontFamily:'IRANSansMobile',
        fontSize:16,
        color:'#696915',
    },

    ErrorImage : {
        width:200,
        height:141
    }
});