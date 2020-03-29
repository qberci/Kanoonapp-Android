import React from 'react';
// noinspection ES6CheckImport
import {Image, Platform, StyleSheet , TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
} from 'native-base';

export default class MemberContent extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.longTouchHandler = this.longTouchHandler.bind(this);
    }

    render(){
        let data = this.props;
        let id = data.id;
        return(
            <ListItem  thumbnail onPress={() => Actions.push('MemberProfile',{ data : data })} onLongPress={() => this.longTouchHandler(data)}>
                <Left>
                    <Thumbnail source={data.image} />
                </Left>
                <Body>
                <Text style={Style.NameText}>{data.name}</Text>
                <Text style={Style.NameDescription} note>{data.description}</Text>
                </Body>
                <Right>
                    <Text style={Style.Label} note>{data.Label1}</Text>
                    <Text style={Style.Label} note>{data.Label2}</Text>
                </Right>
            </ListItem>
        )
    }


    longTouchHandler(data){
        this.props.longTouchHandler(data);
    }
}

const Style = StyleSheet.create({
    ListItem:{

    },
    NameText:{
        ...Platform.select({
            ios: {
                fontFamily : 'IRANSansMobile',
                fontWeight : "bold"
            },
            android: {
                fontFamily : 'IRANSansMobile_Bold',
            },
        }),
        fontSize:15,
    },
    NameDescription:{
        fontFamily:'IRANSansMobile',
        fontSize:10,
    },
    Label:{
        fontFamily:'IRANSansMobile',
        fontSize:10,
    }
});