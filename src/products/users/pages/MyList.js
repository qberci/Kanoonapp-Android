import React from 'react';
import {Text, View} from "react-native";
import UsersIndexPage from "./index";


export default class UsersMyList extends React.Component {
    render() {
        return (
            <View style={{ flex : 1  , backgroundColor : '#0d09a0' , justifyContent : 'center' , alignItems : 'center'}}>
                <Text>MyList Page</Text>
            </View>
        )
    }
}