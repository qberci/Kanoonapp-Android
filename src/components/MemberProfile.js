import React from 'react';
// noinspection ES6CheckImport
import {Dimensions, Image, Platform, StyleShee, StyleSheet, TouchableOpacity, BackHandler , Clipboard , ScrollView, Linking} from 'react-native';
import {Error, Loading} from "./global";
import {Body, Button, Container, Content, Header, Icon, Left, Text, Title, View} from "native-base";
import { Actions } from 'react-native-router-flux';

// Api
import Member from "../api/ui/Member";

export default class MemberProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent : false,
            data : {},
            error : false,
            errorNote : '',
            showToast: false
        };


    }

    componentWillMount(){

        if (this.props.id !== null && this.props.id !== 0){

            try {

                let response = Member.getOne(this.props.data.id)
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
                                        data: response.data.result
                                    });
                                } else {

                                    this.setState({
                                        showContent:true,
                                        error : true,
                                        errorNote : Member.TranslateError(response.data.error)
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

        } else {
            this.setState({
                showContent:true,
                error : true,
                errorNote : "مقدار ورودی شناسه یافت نشد !"
            })
        }

    }

    render() {

        let member = this.state.data;

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-forward' />
                        </Button>
                    </Left>
                    <Body>
                    <Title style={Style.titleStyle}>{ this.props.data.name }</Title>
                    </Body>
                </Header>

                { (this.state.showContent)? (!this.state.error)?
                    <MyContent data={member} />
                    :
                    <Error note={this.state.errorNote}/>
                    :
                    <Loading/>
                }


            </Container>
        )

    }


}

class MyContent extends React.Component{
    render(){
        let member = this.props.data;

        return(
            <Content style={Style.Content}>
                <ScrollView>
                    <View style={Style.MainView}>

                        <Image style={Style.imageMember} source={{uri : member['photo']}} />

                        <TextIcon name='نام' data={member['first_name'] + ' ' + member['last_name']} />
                        <TextIcon name='نام پدر' data={member['father_name']} />
                        <TextIcon name='تاریخ تولد' data={member['birthday']} />
                        <TextIcon name='آدرس' data={member['address']} />
                        <TextIcon name='کد ملی' data={member['meli_code']} />

                        <TextIconPhone name='شماره 1' data={member['mobile1']} />
                        <TextIconPhone name='شماره 2' data={member['mobile2']} />
                        <TextIconPhone name='شماره 3' data={member['mobile3']} />
                        <TextIconPhone name='منزل' data={member['home_tel']} />

                        <TextIconMember name='مربی مرتبط 1' data={member['morabi1_name']} id={member['morabi_arshad_id']} />
                        <TextIconMember name='مربی مرتبط 2' data={member['morabi2_name']} id={member['morabi_arshad2_id']} />
                        <TextIconMember name='مربی مرتبط 3' data={member['morabi3_name']} id={member['morabi_arshad3_id']} />

                        <TextIcon name='رده علمی' data={member['elmi_name']} />
                        <TextIcon name='رده تشکیلاتی' data={member['tashkilat_name']} />
                        <TextIcon name='رده فعالیت' data={member['action_name']} />
                        <TextIcon name='محله' data={member['mahale_name']} />
                        <TextIcon name='منطقه' data={member['mantaghe_name']} />

                        <TextIcon name='محل تحصیل' data={member['edu_place_name1']} />
                        <TextIcon name='مقطع تحصیلی' data={member['edu_maghta1']} />
                        <TextIcon name='ورزش' data={member['sport']} />
                        <TextIcon name='توانایی ها' data={member['tavanaie']} />
                        <TextIcon name='شغل' data={member['work']} />
                        <TextIcon name='تایم کاری' data={member['work_time']} />
                        <TextIcon name='اولیا است ؟' data={(member['is_parent'] === '0')? 'خیر' : 'بلی'} />
                        <TextIcon name='بانی است ؟' data={(member['is_bani'] === '0')? 'خیر' : 'بلی'}/>
                        <TextIcon name='توضیحات بانی' data={member['bani_info']} />
                    </View>
                </ScrollView>
            </Content>
        )

    }
}

class TextIcon extends React.Component{
    render(){
        let data = this.props;

        if (data.data === '' || data.data === 0 || data.data === null){
            return null
        } else {
            return(
                <TouchableOpacity onPress={() => {
                    Clipboard.setString(data.data);
                }}>
                    <View style={Style.TextIcon}>
                        <Text style={Style.Text}>{data.name} : {data.data}</Text>
                        <Button transparent small>
                            <Icon name='md-copy'/>
                        </Button>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}

class TextIconPhone extends React.Component{
    render(){
        let data = this.props;

        if (data.data === '' || data.data === 0 || data.data === null){
            return null
        } else {
            return(
                <TouchableOpacity onPress={() => {
                    Linking.openURL(`tel:${data.data}`)
                }}>
                    <View style={Style.TextIcon}>
                        <Text style={Style.Text}>{data.name} : {data.data}</Text>
                        <Button transparent small>
                            <Icon name='md-call'/>
                        </Button>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}

class TextIconMember extends React.Component{
    render(){
        let data = this.props;

        if (data.data === '' || data.data === 0 || data.data === null){
            return null
        } else {
            return(
                <TouchableOpacity onPress={() => {
                    Actions.push('MemberProfile',{ data : { id : data.id , name : data.data } });
                }}>
                    <View style={Style.TextIcon}>
                        <Text style={Style.Text}>{data.name} : { data.data }</Text>
                        <Button transparent small>
                            <Icon name='md-person'/>
                        </Button>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}

const Style = StyleSheet.create({
    Content : {
        backgroundColor:'#cdcdcd',
    },

    MainView : {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'stretch',
        alignContent:'center',
        elevation : 2,
        backgroundColor:'#f9f9f9',
        margin:20,
        paddingBottom:20,
        paddingTop:25,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
    },

    imageMember : {
        width:120,
        height:120,
        borderRadius:120,
        marginRight:'auto',
        marginLeft:'auto',
        marginBottom:8
    },

    TextIcon : {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop:3,
        paddingLeft:5,
        paddingRight:5,
        marginTop:3,
        marginBottom:3,
        marginRight:5,
        marginLeft:5,
        borderTopWidth:0.5,
        borderTopColor:'#b8b8b8'
    },

    Text:{
        width:'90%',
        fontFamily:'IRANSansMobile',
    },

    titleStyle :{
        fontFamily:'IRANSansMobile',
        fontSize:16
    }
});