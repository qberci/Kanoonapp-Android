import React from 'react';
// noinspection ES6CheckImport
import {Dimensions, Platform, StyleSheet} from 'react-native';
import apiDashborad from "../../../api/ui/Dashboard";
import {Error, Loading} from "../../../components/global";
import {View, Icon, Text} from "native-base";
import Article from "./blogarticle";
import Carousel from 'react-native-snap-carousel';

export default class DashboardBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent : false,
            data : {},
            error : false,
            errorNote : '',
        }
    }

    componentWillMount(){

        try {

            let response = apiDashborad.getDashboard({
                amar:false,
                blog:true
            })
                .catch(err => {
                    this.setState({
                        showContent:true,
                        error : true,
                        errorNote : err.toString()
                    })
                })
                .then(response => {
                        if (response.status === 200 && response.data.OK === true){

                            let innerData = response.data.result.blog;

                            this.setState({
                                showContent:true,
                                data: innerData,
                            });


                        } else {

                            this.setState({
                                showContent:true,
                                error : true,
                                errorNote : 'خطا در برقراری ارتباط با سرور'
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

            if (!this.state.error){

                return(
                    <View style={Style.ArticleMain}>
                        <View style={Style.HeaderItemsLineViewItem}>
                            <Icon name='md-cafe' style={Style.HeaderItemsLineViewIcon}/>
                            <Text style={Style.ArticleMainTitle}>وبلاگ کانون اپ</Text>
                        </View>
                        <View>
                            <CarouselView data={this.state.data}/>
                        </View>
                    </View>
                )

            } else {
                return (
                    <View style={{
                        backgroundColor:'#fff',
                        margin:8,
                        elevation:2,
                    }}>
                        <Error note={this.state.errorNote}/>
                    </View>
                )
            }

        } else {
            return(
                <View style={{
                    backgroundColor:'#fff',
                    margin:8,
                    elevation:2,
                }}>
                    <Loading/>
                </View>
            )
        }
    }
}


export class CarouselView extends React.Component {

    _renderItem ({item, index}) {
        return (
            <Article index={index} text={decodeURIComponent(item.title)} image={item.photo} url={item.url}/>
        );
    }

    render () {

        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.props.data}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={200}
                loop={true}
                autoplay={true}
                autoplayDelay={4000}
                autoplayInterval={2000}
                activeSlideAlignment={'end'}
            />
        );
    }
}



const Style = StyleSheet.create({
    HeaderItemsLineViewIcon:{
        fontSize:20,
        color:'#696969'
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
    ArticleMainTitle:{
        fontFamily:'IRANSansMobile',
        fontSize:16,
        color:'#696969',
        marginLeft:5
    },
    ArticleMain:{
        backgroundColor:'#fff',
        margin:5,
        elevation:2,
    },
    ArticleView:{
        flexDirection:'row',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'stretch',
        alignContent:'stretch',
    }
});