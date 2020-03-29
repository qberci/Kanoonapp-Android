// noinspection ES6CheckImport
import {Platform, StyleSheet, Image} from "react-native";
import React from "react";
import {View, Text, Icon} from "native-base";

export default class HeaderBox extends React.Component{
    render(){

        const data = this.props.data;

        return(
            <View style={Style.HeaderBase}>
                <View>
                    <Image style={Style.HeaderItemsImage} source={require('./../../../assets/images/indexheaderbg.jpg')}>
                        <View style={Style.HeaderItemsProfile} >
                            <Image style={Style.HeaderItemsProfileImage} source={
                                (data.header.profile_photo !== '')? {uri:data.header.profile_photo} : require('./../../../assets/images/profile.png')
                            }/>
                            <Text style={Style.HeaderItemsProfileText1}>{data.header.hello_note}</Text>
                            <Text style={Style.HeaderItemsProfileText2}>{data.header.kanoon_name}</Text>
                        </View>
                    </Image>
                </View>
                <View style={Style.HeaderItemsLineView}>
                    <View style={Style.HeaderItemsLineViewItem}>
                        <Icon name='md-folder' style={Style.HeaderItemsLineViewIcon}/>
                        <Text style={Style.HeaderItemsLineViewText}>{data.account_data.hajm}</Text>
                    </View>
                    <View style={Style.HeaderItemsLineViewItem}>
                        <Icon name='md-bookmarks' style={Style.HeaderItemsLineViewIcon}/>
                        <Text style={Style.HeaderItemsLineViewText}>{data.account_data.perseneli_count}</Text>
                    </View>
                    <View style={Style.HeaderItemsLineViewItem}>
                        <Icon name='md-people' style={Style.HeaderItemsLineViewIcon}/>
                        <Text style={Style.HeaderItemsLineViewText}>{data.account_data.User_count}</Text>
                    </View>
                    <View style={Style.HeaderItemsLineViewItem}>
                        <Icon name='md-cart' style={Style.HeaderItemsLineViewIcon}/>
                        <Text style={Style.HeaderItemsLineViewText}>{data.account_data.un_pay_invoice}</Text>
                    </View>
                </View>
            </View>
        )
    }

}

const Style = StyleSheet.create({
    HeaderBase : {
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'stretch',
        alignContent:'stretch'
    },
    HeaderItemsImage:{
        width:'100%',
        height:140,
    },
    HeaderItemsProfile:{
        flex:1,
        flexDirection:'column',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center'
    },
    HeaderItemsProfileImage:{
        width:70,
        height:70,
        borderRadius:50,
    },
    HeaderItemsProfileText1:{
        ...Platform.select({
            ios: {
                fontFamily : 'IRANSansMobile',
                fontWeight : "bold"
            },
            android: {
                fontFamily : 'IRANSansMobile_Bold',
            },
        }),
        fontSize:16,
        color:'#130f40',
    },
    HeaderItemsProfileText2:{
        fontFamily:'IRANSansMobile',
        fontSize:10,
        color:'#221579',
    },
    HeaderItemsLineView:{
        elevation:3,
        backgroundColor:'#fff',
        height:40,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
        alignContent:'center'
    },
    HeaderItemsLineViewItem:{
        flex:1,
        margin:5,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    HeaderItemsLineViewIcon:{
        fontSize:20,
        color:'#696969'
    },
    HeaderItemsLineViewText:{
        marginLeft:10,
        fontSize:18,
        color:'#696969'
    },
});