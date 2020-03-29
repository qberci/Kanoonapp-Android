import React from 'react';
import {Text, View} from "react-native";
import UsersIndexPage from "./index";


export default class UsersMyGroup extends React.Component {
    render() {
        return (
            <View style={{ flex : 1  , backgroundColor : '#9857a0' , justifyContent : 'center' , alignItems : 'center'}}>
                <Text>MyGroup Page</Text>
            </View>
        )
    }
}