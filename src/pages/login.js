import React from 'react';
// noinspection ES6CheckImport
import {AsyncStorage, BackHandler, Image, StyleSheet , NativeModules} from 'react-native';
import { View , Text , Button , Form , Item , Icon , Input  } from 'native-base';
import AwesomeAlert from 'react-native-awesome-alerts'
import { Actions } from 'react-native-router-flux';
import User from '../api/User';


export default class Login extends React.Component {

    constructor(){
        super();

        this.state = {
            email : {
                value : '',
                error : ''
            },
            password : {
                value: '',
                error : ''
            },
            alert : {
                show : false,
                progress : false,
                text : '',
                message:''
            }
        };

        this.requestLoginFromApi = this.requestLoginFromApi.bind(this);
        this.setDataUser = this.setDataUser.bind(this);
    }


    render() {

        const emailError = this.state.email.error;
        const passwordError = this.state.password.error;

        return(
            <View style={Style.MainBody}>
                <View>
                    <Image source={require('./../assets/images/logo-dark.png')} style={Style.logoImage}/>
                </View>
                <View style={Style.CardBox}>
                    <Form style={form.StyleForm}>
                        <Item rounded style={form.item} error={emailError !== ''}>
                            <Input
                                placeholder='نام کاربری خود را وارد کنید'
                                style={form.input}
                                onChangeText={this.changeEmailInput.bind(this)}
                            />
                            <Icon active name='md-person' />
                        </Item>
                        <Text style={[form.error , Login._checkDisplay(emailError)]}>پر کردن این فیلد الزامی است</Text>
                        <Item rounded style={form.item} error={passwordError !== ''}>
                            <Input
                                placeholder='پسورد خود را وارد کنید'
                                style={form.input}
                                secureTextEntry
                                onChangeText={this.changePasswordInput.bind(this)}
                            />
                            <Icon active name='md-key' />
                        </Item>
                        <Text style={[form.error , Login._checkDisplay(passwordError)]}>پر کردن این فیلد الزامی است</Text>
                        <Button full style={form.submitButton} onPress={this.login.bind(this)}>
                            <Text style={form.submitText}>ورود</Text>
                        </Button>
                    </Form>
                </View>
                <View>
                    <Button full onPress={() => Actions.reset('submit') } success style={Style.submitBtn}>
                        <Text style={form.input}>هنوز ثبتنام نکردید ؟ رایگان ثبتنام کنید</Text>
                    </Button>
                </View>

                <AwesomeAlert
                    show={this.state.alert.show}
                    title={this.state.alert.text}
                    message={this.state.alert.message}
                    showProgress={this.state.alert.progress}
                    closeOnTouchOutside={true}

                    titleStyle={{
                        fontFamily:'IRANSansMobile',
                    }}

                    messageStyle={{
                        fontFamily:'IRANSansMobile',
                    }}

                    alertContainerStyle={{zIndex:998}}
                    contentContainerStyle={{zIndex:999}}
                />
            </View>
        )
    }


    static _checkDisplay(field) {
        return { display: field === '' ? 'none' : 'flex'}
    }

    login() {

        let { email , password } = this.state;
        if(email.value === '') {
            this.setState({
                email : {
                    value : '',
                    error : 'فیلد ایمیل نمی تواند خالی بماند'
                }
            });
            return;
        }

        if(password.value === '') {
            this.setState({
                password : {
                    value : '',
                    error : 'فیلد پسورد نمی تواند خالی بماند'
                }
            });
            return;
        }


        this.setState({
            alert : {
                show : true,
                progress : true,
                text:"منتظر باشید ...",
                message : 'برقراری ارتباط با سرور',
            }
        });

        // noinspection JSIgnoredPromiseFromCall
        this.requestLoginFromApi({
            email : email.value,
            password : password.value
        })

    }

    changeEmailInput(text) {
        this.setState({
            email : {
                value : text,
                error : ''
            }
        })
    }

    changePasswordInput(text) {
        this.setState({
            password : {
                value : text,
                error : ''
            }
        })
    }


    async requestLoginFromApi(params) {
        try {
            let { email , password } = params;
            let response = await User.getToken(email,password);

            if(response.status === 200) {

                let data = response.data;

                if (data.OK){

                    await this.setDataUser(data.result);

                } else {

                    console.log(data);

                    this.setState({
                        alert : {
                            show : true,
                            progress : false,
                            text:'خطا !',
                            message : User.TranslateError(data.error),
                        }
                    });

                }

            } else {
                console.log(response)
            }

        } catch(error) {
            console.log(error);
        }
    }

    async setDataUser(data) {
        try {
            await AsyncStorage.setItem('apiToken',data.token);

            this.setState({
                alert : {
                    show : true,
                    progress : false,
                    text : 'خوش آمدید',
                    message:'شما با موفقیت وارد شدید'
                }
            });

            setTimeout(() => BackHandler.exitApp() ,2000);

        } catch(error) {
            console.log(error);
        }
    }
}


const Style = StyleSheet.create({
    MainBody : {
        flex:1,
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        zIndex:1
    },
    CardBox : {
        zIndex:1,
        width:300,
        backgroundColor:'#fdfdfd',
        borderRadius:5,
        //elevation:1,
        padding:5
    },
    logoImage : {
        width: 250,
        height: 100
    },
    submitBtn : {
        width: 250,
        marginTop:15
    }
});

export const form = StyleSheet.create({
    StyleForm : {
        padding: 10
    },
    item : {
        borderRadius : 5,
        marginBottom:10,
        paddingRight:10,
        paddingLeft: 10,
    },
    input : {
        fontFamily: 'IRANSansMobile',
        fontSize:14,
        textAlign:'right'
    },
    submitButton : {
        borderRadius: 5,
        backgroundColor: '#6e89ff'
    },
    submitText : {
        fontSize : 16,
        fontFamily : 'IRANSansMobile'
    },
    error : {
        fontFamily : 'IRANSansMobile',
        fontSize:12 ,
        color : '#ed2f2f',
        marginBottom: 10
    }
});