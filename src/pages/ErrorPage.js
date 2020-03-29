import React from 'react';
// noinspection ES6CheckImport
import { StyleSheet , Image} from "react-native";
import {View, Text , Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

export class ErrorBuy extends React.Component{

    render(){

        return(
            <View style={Style.main}>
                <Image source={require('./../assets/images/bear1.png')} style={Style.imageBear}/>
                <Text style={Style.Text}>شما این محصول را خریداری نکردید</Text>
                <View style={Style.button}>
                    <Button onPress={() => Actions.jump('ShopIndexPage')}>
                        <Text style={Style.Text}>فعال سازی رایگان</Text>
                    </Button>
                </View>
            </View>
        )


    }

}

export class ErrorActive extends React.Component{

    render(){

        return(
            <View style={Style.main}>
                <Image source={require('./../assets/images/bear1.png')} style={Style.imageBear}/>
                <Text style={Style.Text}>این صفحه فعال نیست</Text>
                <Text style={Style.Text}>شما یک صورتحساب پرداخت نشده دارید</Text>
                <View style={Style.button}>
                    <Button onPress={() => Actions.jump('ShopIndexPage') }>
                        <Text style={Style.Text}>پرداخت صورتحساب</Text>
                    </Button>
                </View>
            </View>
        )


    }

}

export class ErrorPermission extends React.Component{

    render(){

        return(
            <View style={Style.main}>
                <Image source={require('./../assets/images/bear1.png')} style={Style.imageBear}/>
                <Text style={Style.Text}>شما اجازه دسترسی به این صفحه را ندارید</Text>
            </View>
        )


    }

}

const Style = StyleSheet.create({
    main : {
        flex:1,
        backgroundColor:'#e1e1e1',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    imageBear : {
        width : 300,
        height: 293,
        marginBottom:2,
    },
    button:{
      margin:8
    },
    Text : {
        fontSize : 16,
        fontFamily : 'IRANSansMobile'
    }
});