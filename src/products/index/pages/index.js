import React from 'react';
// noinspection ES6CheckImport
import {StyleSheet,Image,Platform,ScrollView,Dimensions, Linking , TouchableOpacity} from "react-native";

// API
import apiDashboard from '../../../api/ui/Dashboard'

// Components
import DashboardBlog from './../component/DashboardBlog'
import { Error , Loading } from './../../../components/global'
import DashboardChart from "../component/DashboardChart";
import HeaderBox from "../component/HeaderBox";


export default class IndexIndexPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showContent : false,
            alert : {
                show : false,
                title : '',
                message : ''
            },
            dashboardData : {},
            error : false,
            errorNote : ''
        };

    }

    componentWillMount(){

        try {

            let response = apiDashboard.getDashboard({
                amar:false,
                blog:false,
            })
                .catch(err => {
                    this.setState({
                        showContent:true,
                        error : true,
                        errorNote : err.toString()
                    })
                })
                .then(response => {
                    if (response.status === 200){
                        if (response.data.OK) {
                            this.setState({
                                showContent:true,
                                dashboardData: response.data
                            });
                        } else {

                            this.setState({
                                showContent:true,
                                error : true,
                                errorNote : apiDashboard.TranslateError(response.data.error)
                            })

                        }



                    } else {

                        this.setState({
                            showContent:true,
                            error : true,
                            errorNote : 'خطا در برقراری ارتباط با سرور' + response.status
                        })

                    }
                    }
                );


        } catch (e) {
            console.log(e);
        }

    }

    render() {
        if (this.state.showContent){
            if (!this.state.error) {
                return (
                    <ScrollView>
                        <HeaderBox data={this.state.dashboardData.result}/>
                        <DashboardChart/>
                        <TouchableOpacity onPress={() => this.openURL('https://t.me/kanoonapp')}>
                            <Image style={Style.ImageSoial} onP source={require('./../../../assets/images/telegrammainpage.jpg')}/>
                        </TouchableOpacity>
                        <DashboardBlog/>
                    </ScrollView>
                )
            } else {
                return(
                    <Error note={this.state.errorNote}/>
                )
            }

        } else {
            return (
                <Loading/>
            )
        }
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
    ImageSoial:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width/5.9,
    },
});


