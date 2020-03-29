import React from 'react';
// noinspection ES6CheckImport
import {AsyncStorage, Image, StyleSheet} from 'react-native';
import { View , Text , Button , Form , Item , Icon , Input  } from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class Login extends React.Component {

    componentWillMount(){
        // noinspection JSIgnoredPromiseFromCall
        //zUser.getToken('scepter','00080801');

        this.state = {
            email : {
                value : '',
                error : ''
            },
            password : {
                value: '',
                error : ''
            }
        }
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


        // noinspection JSIgnoredPromiseFromCall
        Login.requestLoginFromApi({
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

    static async requestLoginFromApi(params) {
        try {
            let { email , password } = params;
            let response = await fetch('http://roocket.org/api/login', {
                method : 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email,
                    password
                })
            });
            let json = await response.json();

            if(response.status === 200) {
                // login
                await Login.setDataUser(json.data.api_token)
            }

            if(response.status === 422) {
                // Validate
                console.log('validate');
            }

            if(response.status === 302) {
                // Auth
                console.log('auth')
            }

        } catch(error) {
            console.log(error);
        }
    }

    static async setDataUser(apiToken) {
        try {
            await AsyncStorage.setItem('apiToken',apiToken);
            Actions.reset('root');
        } catch(error) {
            console.log(error);
        }
    }


}


const Style = StyleSheet.create({
    MainBody : {
        display:'flex',
        flex:1,
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
    },
    CardBox : {
        width:300,
        backgroundColor:'#fdfdfd',
        borderRadius:5,
        elevation:1,
        padding:5
    },
    logoImage : {
        width: 250,
        height: 100
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