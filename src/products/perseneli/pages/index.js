import React from 'react';
// noinspection ES6CheckImport
import {StyleSheet, ImageBackground, Dimensions, FlatList , Alert} from "react-native";
import {
    Container,
    Button,
    Left,
    Right,
    Icon,
    Footer,
    Item,
    Input,
    Spinner,
    View,
    Text
} from 'native-base';
import ActionSheet from 'react-native-actionsheet'

// Api
import apiProducts from "../../../api/ui/Products";

// components
import {Error, Loading} from "../../../components/global";
import MemberContent from '../component/MemberContent'
import {Actions} from "react-native-router-flux";


export default class PerseneliIndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showContent : false,
            data : {},
            items : [],
            error : false,
            errorNote : '',
            search : '',
            page : 1,
            perPage : 10,
            loading : false,
            refreshing : false,
            endItems : false,
            ActionSheet : {
                title : ''
            }
        };

    }

    componentWillMount(){

        try {

            let response = apiProducts.getPage({
                page_id : 18,
                page_number : this.state.page,
                per_page : this.state.perPage,
                search : this.state.search
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
                                    data: response.data.result,
                                    items: response.data.result.items
                                });

                            } else {

                                this.setState({
                                    showContent:true,
                                    error : true,
                                    errorNote : 'خطا ' + apiProducts.TranslateError(response.data.error)
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

    static renderItem({ item }) {
        return <MemberContent id={item['ID']} name={item.name} description={item['morabi']} Label1={item['note_up']} Label2={item['note_down']} image={{uri: item['photo']}} longTouchHandler={this.longTouchHandler.bind(this)} />
    }

    renderFooter() {
        if(!this.state.loading && this.state.search !== '') return null;
        return <Spinner />
    }

    handleLoadMore() {
        if(this.state.items.length > 0 && !this.state.endItems) {
            this.setState({page : this.state.page + 1 , loading : true}, () => {
                this.getItemRequest()
            })
        }
    }

    handleRefresh() {
        this.setState({ page : 1 , refreshing : true , endItems : false } , () => {
            this.getItemRequest();
        })
    }

    getItemRequest(searchMode = false) {

        try {

            let response = apiProducts.getPage({
                page_id : 18,
                page_number : this.state.page,
                per_page : this.state.perPage,
                search : this.state.search
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

                                let items = response.data.result.items;

                                if(items.length > 0) {
                                    this.setState(prevState => {
                                        return {
                                            items : (searchMode) ? items :  this.state.page === 1 ? items : [...prevState.items , ...items],
                                            refreshing : false,
                                            showContent:true,
                                            error : false,
                                        }
                                    })
                                } else {

                                    if (searchMode) {

                                        this.setState({
                                            showContent:true,
                                            error : true,
                                            errorNote : 'ممبری یافت نشد !'
                                        })

                                    }  else {

                                        this.setState({
                                            loading : false,
                                            refreshing : false,
                                            endItems : true
                                        })

                                    }

                                }

                            } else {

                                this.setState({
                                    showContent:true,
                                    error : true,
                                    errorNote : 'خطا ' + apiProducts.TranslateError(response.data.error)
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

    longTouchHandler(data){
        this.setState({
            ActionSheet : {
                title : data.name
            }
        });
        this.ActionSheet.show();
    }

    searchTextChanges(text){
        this.setState({
            items : [],
            search : text,
            page : 1,
            loading : false,
            refreshing : false,
            endItems : false,
            showContent : false,
            error : false
        },() => {
            this.getItemRequest(true)
        })
    }

    render() {

        return (
            <ImageBackground source={require('./../../../assets/images/pagebg1.png')} style={Style.MainView}>
                <Container>

                    { (this.state.showContent)? (!this.state.error)?
                        <FlatList
                            data={this.state.items}
                            renderItem={PerseneliIndexPage.renderItem.bind(this)}
                            keyExtractor={(item) => item['ID']}
                            ListEmptyComponent={() => <Spinner />}
                            ListFooterComponent={this.renderFooter.bind(this)}
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleRefresh.bind(this)}
                            onEndReached={this.handleLoadMore.bind(this)}
                            onEndReachedThreshold={0.5}
                        />
                        :
                        <Error note={this.state.errorNote}/>
                        :
                        <Loading/>
                    }


                    <Footer style={Style.MainFooter}>
                        <Left>
                            <Button onPress={() => Actions.push('AddMember')} primary rounded style={{marginLeft:10}}>
                                <Icon size={35} name='md-add'/>
                            </Button>
                        </Left>
                        <Right>
                            <Item style={{width:Dimensions.get('window').width-80,backgroundColor:'#f7f7f7',marginRight:10}} rounded>
                                <Icon active name='md-search' style={{marginLeft:10}}/>
                                <Input style={{fontFamily:'IRANSansMobile', fontSize:15,}} placeholder='جستجو ..' onChangeText={this.searchTextChanges.bind(this)}/>
                            </Item>
                        </Right>
                    </Footer>

                </Container>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<View style={Style.ActionView}><Icon name='md-person' style={{color:"#a78a8a",fontSize:15}} /><Text style={Style.ActionText}> {this.state.ActionSheet.title}</Text></View>}
                    options={
                        [
                            <View style={Style.ActionView}><Icon name='md-build' style={{color:"#5455ff",fontSize:15}} /><Text style={Style.ActionText}> ویرایش</Text></View>,
                            <View style={Style.ActionView}><Icon name='md-trash' style={{color:"#fa1200",fontSize:15}}/><Text style={Style.ActionText}> حذف</Text></View>,
                            <View style={Style.ActionView}><Icon name='md-close' style={{color:"#a78a8a",fontSize:15}}/><Text style={Style.ActionText}> بیخیال</Text></View>
                        ]
                    }
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => {
                        if (index === 0){

                        }  else if (index === 1){

                        }
                    }}
                />


            </ImageBackground>
        )

    }
}


const Style = StyleSheet.create({
    MainView:{
        flex:1
    },
    MainHeader:{
        backgroundColor:'rgba(255,255,255,0.7)',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center',
        alignContent:'center'
    },
    MainFooter:{
        backgroundColor:"rgba(0,0,0,0)"
    },
    HeaderItemsLineViewItem:{
        flex:1,
        margin:5,
        flexDirection:'column',
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
        fontFamily:'IRANSansMobile',
        fontSize:15,
    },
    ActionView : {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ActionText : {
        fontFamily:'IRANSansMobile',
        fontSize:15,
        marginRight:3,
        marginLeft:3
    }
});