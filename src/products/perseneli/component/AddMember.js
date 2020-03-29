import React from 'react';
// noinspection ES6CheckImport
import {Dimensions, Image, Platform, StyleShee, StyleSheet, TouchableOpacity, BackHandler , Clipboard , ScrollView, Linking} from 'react-native';
import {Error, Loading} from "./../../../components/global";
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    Header,
    Icon,
    Input,
    Item,
    Label,
    Left,
    Text,
    Title,
    View
} from "native-base";
import { Actions } from 'react-native-router-flux';

// Api
import Products from "../../../api/ui/Products";


export default class AddMember extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showContent : false,
            data : {},
            error : false,
            errorNote : '',

            selectedStartDate: null,
            addData : {
                action_id:"0",
                first_name:"",
                last_name:"",
                father_name:"",
                birthday:"",
                address:"",
                photo:"",
                meli_code:"",
                mobile1:"",
                mobile2:"",
                mobile3:"",
                home_tel:"",
                morabi_arshad_id:"0",
                morabi_arshad2_id:"0",
                morabi_arshad3_id:"0",
                edu_place_name1:"",
                edu_maghta1:"",
                wtn_child:"0",
                parents1_id:"0",
                parents2_id:"0",
                sport:"",
                tarbiat_id:"0",
                tashkilat_id:"0",
                mahale_id:"0",
                mantaghe_id:"0",
                work:"",
                work_time:"",
                tavanaie:"",
                salary:"0",
                bani_info:"",
                is_parent:"0",
                is_bani:"0",
            }
        };

        this.onChanges = this.onChanges.bind(this);
        this.textValidate = this.textValidate.bind(this);
    }

    componentWillMount(){

        try {

            let response = Products.getPage({
                page_id : 18,
                page_number : 1,
                per_page : 1,
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
                                    data: response.data.result
                                });
                            } else {

                                this.setState({
                                    showContent:true,
                                    error : true,
                                    errorNote : Products.TranslateError(response.data.error)
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

        let addData = this.state.addData;

        let first_name = this.textValidate(addData.first_name, 50, true);
        let last_name = this.textValidate(addData.last_name, 50, true);

        let address = this.textValidate(addData.address, 255);
        let meli_code = this.textValidate(addData.meli_code, 11);
        let father_name = this.textValidate(addData.father_name, 50);


        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name='arrow-forward'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={Style.titleStyle}>ممبر جدید</Title>
                    </Body>
                </Header>


                {(this.state.showContent) ? (!this.state.error) ?
                    (
                        <Content style={Style.Content}>
                            <ScrollView>
                                <View style={Style.MainView}>
                                    <Form>

                                        <Item inlineLabel error={first_name !== ''}>
                                            <Label style={Style.label}>نام : </Label>
                                            <Input
                                                maxLength={50}
                                                onChangeText={text => this.onChanges(text, 'first_name')}
                                                style={Style.input}/>
                                        </Item>
                                        {(first_name !== '') ?
                                            <Text style={Style.errorLabel}>
                                                {first_name}
                                            </Text> : null
                                        }



                                        <Item inlineLabel error={last_name !== ''}>
                                            <Label style={Style.label}>نام خانوادگی : </Label>
                                            <Input
                                                maxLength={50}
                                                onChangeText={text => this.onChanges(text, 'last_name')}
                                                style={Style.input}/>
                                        </Item>
                                        {(last_name !== '') ?
                                            <Text style={Style.errorLabel}>
                                                {last_name}
                                            </Text> : null
                                        }



                                        <Item inlineLabel error={father_name !== ''}>
                                            <Label style={Style.label}>نام پدر : </Label>
                                            <Input
                                                maxLength={50}
                                                onChangeText={text => this.onChanges(text, 'father_name')}
                                                style={Style.input}/>
                                        </Item>
                                        {(father_name !== '') ?
                                            <Text style={Style.errorLabel}>
                                                {father_name}
                                            </Text> : null
                                        }


                                        <Item inlineLabel error={address !== ''}>
                                            <Label style={Style.label}>آدرس : </Label>
                                            <Input
                                                maxLength={255}
                                                onChangeText={text => this.onChanges(text, 'address')}
                                                style={Style.input}
                                            />
                                        </Item>
                                        {(address !== '') ?
                                            <Text style={Style.errorLabel}>
                                                {address}
                                            </Text> : null
                                        }


                                        <Item inlineLabel error={meli_code !== ''}>
                                            <Label style={Style.label}>کد ملی : </Label>
                                            <Input
                                                maxLength={10}
                                                onChangeText={text => this.onChanges(text, 'meli_code')}
                                                style={Style.input}
                                                keyboardType="phone-pad"
                                            />
                                        </Item>
                                        {(meli_code !== '') ?
                                            <Text style={Style.errorLabel}>
                                                {meli_code}
                                            </Text> : null
                                        }





                                    </Form>
                                </View>
                            </ScrollView>
                        </Content>
                    )
                    :
                    <Error note={this.state.errorNote}/>
                    :
                    <Loading/>
                }

            </Container>
        )

    }

    onChanges (text,name){
        this.setState(prevState => {
            prevState.addData[name] = text;
            return { addData: prevState.addData }
        })
    }

    textValidate (text,charNumber = 50,isForce = false){
        if (isForce) { if (text === '') { return 'پر کردن این فیلد الزامی است'} }

        if (text.length < charNumber){
            return ''
        } else {
            return 'تعداد حروف نمیتواند بیشتر از ' + charNumber + ' باشد'
        }
    }




}




const Style = StyleSheet.create({
    Content : {
        backgroundColor:'#cdcdcd',
    },

    MainView : {
        flex:1,
        elevation : 2,
        backgroundColor:'#f9f9f9',
        margin:12,
        paddingBottom:20,
        paddingTop:3,
        paddingRight:13,
        borderRadius:5,
    },



    Text:{
        width:'90%',
        fontFamily:'IRANSansMobile',
    },

    titleStyle :{
        fontFamily:'IRANSansMobile',
        fontSize:16
    },

    label : {
        fontFamily:'IRANSansMobile',
        color : '#868686'
    },

    input : {
        fontFamily:'IRANSansMobile',
        color : '#373737',
        textAlign:'right'
    },

    errorLabel : {
        fontFamily:'IRANSansMobile',
        color : '#fa1200',
        marginLeft:15
    }

});