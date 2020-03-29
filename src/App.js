import React from 'react';
import {Router, Scene, Tabs} from 'react-native-router-flux';
import {View, Icon, Spinner } from 'native-base';
// noinspection ES6CheckImport
import {AsyncStorage, BackHandler, I18nManager, Image, NetInfo, Platform, StyleSheet, StatusBar } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts'

I18nManager.forceRTL(true);

// Main Pages
import login from "./pages/login";
import submit from './pages/submit'

// products
import index from './products/index/pages';
import AmarIndexPage from './products/amar/pages/index';
import perseneli from './products/perseneli/pages/index';
import shop from './products/shop/pages/index';
import UsersIndexPage from './products/users/pages/index';

// Perseneli Pages
import perseneliTashkilat from './products/perseneli/pages/tashkilat';
import perseneliElmi from './products/perseneli/pages/elmi';
import perseneliAction from './products/perseneli/pages/action';
import perseneliMahale from './products/perseneli/pages/mahale';
import perseneliMantaghe from './products/perseneli/pages/mantaghe';
import AddMember from './products/perseneli/component/AddMember'

//Users Pages
import UsersMyGroup from './products/users/pages/MyGroup';
import UsersMyPeygiri from './products/users/pages/MyPeygiri';
import UsersMyList from './products/users/pages/MyList';

//Amar Pages
import AmarTahlilAmari from './products/amar/pages/TahlilAmari';

// Api
import apiProducts from "./api/ui/Products";
import ApiUser from "./api/User";

// Profiles
import MemberProfile from './components/MemberProfile';

// Error Pages
import { ErrorActive, ErrorBuy , ErrorPermission } from './pages/ErrorPage'

export default class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            renderRouter : false,
            isLogin : true,
            data : [
                {
                    ID: '1',
                    name: 'پرسنلی',
                    description: 'مدیریت اشخاص کانون',
                    price: '0',
                    icon: 'fa fa-book',
                    is_buy: 0,
                    is_active: 0,
                    pages: [
                        {
                            page_ID: '18',
                            name: 'پرسنلی',
                            permilink: 'perseneli',
                            permission: 0
                        },
                        {
                            page_ID: '22',
                            name: 'رده تشکیلاتی',
                            permilink: 'tashkilat',
                            permission: 0
                        },
                        {
                            page_ID: '23',
                            name: 'رده علمی',
                            permilink: 'elmi',
                            permission: 0
                        },
                        {
                            page_ID: '24',
                            name: 'رده های فعالیت',
                            permilink: 'action',
                            permission: 0
                        },
                        {
                            page_ID: '25',
                            name: 'محلات',
                            permilink: 'mahale',
                            permission: 0
                        },
                        {
                            page_ID: '26',
                            name: 'مناطق',
                            permilink: 'mantaghe',
                            permission: 0
                        },
                        {
                            page_ID: '29',
                            name: 'جستجو پیشرفته',
                            permilink: 'advance-search',
                            permission: 0
                        }
                    ]
                },
                {
                    ID: '2',
                    name: 'کاربران',
                    description: 'ثبت و مدیریت کاربران',
                    price: '3500',
                    icon: 'fa fa-users',
                    is_buy: 0,
                    is_active: 0,
                    pages: [
                        {
                            page_ID: '19',
                            name: 'کاربران',
                            permilink: 'users',
                            permission: 0
                        },
                        {
                            page_ID: '20',
                            name: 'گروه من',
                            permilink: 'mygroup',
                            permission: 0
                        },
                        {
                            page_ID: '21',
                            name: 'پیگیری من',
                            permilink: 'mypeygiri',
                            permission: 0
                        },
                        {
                            page_ID: '28',
                            name: 'لیست من',
                            permilink: 'mylist',
                            permission: 0
                        }
                    ]
                },
                {
                    ID: '3',
                    name: 'آمار',
                    description: 'ثبت و مدیریت آمار کانون',
                    price: '5800',
                    icon: 'fa fa-line-chart',
                    is_buy: 0,
                    is_active: 0,
                    pages: [
                        {
                            page_ID: '27',
                            name: 'ثبت آمار',
                            permilink: 'amar',
                            permission: 0
                        },
                        {
                            page_ID: '30',
                            name: 'تحلیل آماری',
                            permilink: 'main-chart',
                            permission: 0
                        }
                    ]
                }
            ],
            alert : {
                show : false,
                title : '',
                message : ''
            }
        };

        App.CheckUserLogin = App.CheckUserLogin.bind(this);
        App.CheckTokenExist = App.CheckTokenExist.bind(this);


    }

    componentWillMount(){

        NetInfo.isConnected.fetch().then(isConnected => {

            if (isConnected) {

                App.CheckUserLogin().then(status => {

                    if(status) {

                        try {

                            let response = apiProducts.getProducts()
                                .catch(err => {
                                    this.setState({
                                        alert : {
                                            show : true,
                                            title : "خطا در برقراری ارتباط با سرور !!",
                                            message : err.toString()
                                        }
                                    });
                                })
                                .then(response => {

                                        if (response.status === 200){

                                            if (response.data.OK) {



                                                this.setState({
                                                    renderRouter : true,
                                                    data : response.data.result,
                                                });

                                            } else {

                                                this.setState({
                                                    alert : {
                                                        show : true,
                                                        title : "خطا در برقراری ارتباط با سرور !!",
                                                        message : ApiUser.TranslateError(response.data.error)
                                                    }
                                                });

                                            }

                                        } else {

                                            this.setState({
                                                alert : {
                                                    show : true,
                                                    title : "خطا در برقراری ارتباط با سرور !!",
                                                    message : "ارور " + response.status
                                                }
                                            });

                                        }
                                    }
                                );


                        } catch (e) {
                            console.log(e);
                        }

                    } else {
                        this.setState({
                            renderRouter : true,
                            isLogin : false,
                        })
                    }
                });


            } else {

                this.setState({
                    alert : {
                        show : true,
                        title : "اتصال به اینترنت ممکن نیست !!",
                        message : "لطفا اتصال اینترنت خود را چک کنید"
                    }
                });


            }

        });

    }

    static async CheckUserLogin() {
        try {
            let apiToken = await AsyncStorage.getItem('apiToken');
            let checkToken = await App.CheckTokenExist(apiToken);
            return (apiToken === null) ? false : checkToken;
        } catch(error) {
            console.log(error)
        }
    }

    static async CheckTokenExist(apiToken) {
        try {
            let response = await ApiUser.getMe(apiToken);
            return response.status === 200 && response.data.OK;
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        if (this.state.renderRouter){

            let data = this.state.data;
            let perseneliData = data[0];
            let usersData = data[1];
            let amarData = data[2];

            return (
                <Router>
                    <Scene key='app'>

                        <Scene initial={!this.state.isLogin} key="auth" hideNavBar>
                            <Scene key="login" component={login} initial hideNavBar={true}/>
                            <Scene key="submit" component={submit} hideNavBar={true}/>
                        </Scene>


                        <Scene key="MemberProfile" component={MemberProfile} hideNavBar/>
                        <Scene key="AddMember" component={AddMember} hideNavBar/>


                        <Scene
                            initial={this.state.isLogin}
                            key="mainApp"
                            hideNavBar

                            lazy={true}
                            tabs={true}
                            default="IndexIndexPage"
                            tabBarPosition="bottom"
                            activeTintColor='#34495e'
                            inactiveTintColor='#9b59b6'
                            swipeEnabled={true}
                            activeBackgroundColor='#d5ffcc'
                            inactiveBackgroundColor='#ffffff'
                            labelStyle={Style.MainTab}
                        >


                            <Scene key='IndexIndexPage' iconName="md-home" icon={TabIcon} component={index} title='داشبورد' titleStyle={this.props.focused} hideNavBar={true} initial/>

                            <Tabs
                                key='Perseneli'
                                default="PerseneliPageIndex"
                                iconName="md-bookmarks"
                                icon={TabIcon}
                                title='پرسنلی'
                                tabs={true}
                                lazy={true}
                                activeTintColor='#a03537'
                                inactiveTintColor='#c74244'
                                swipeEnabled={true}

                            >
                                <Scene
                                    key='PerseneliPageIndex'
                                    iconName="md-bookmarks"
                                    icon={TabIcon2}
                                    title='پرسنلی'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][0]['permission'] === 1 ?
                                                    perseneli
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                    initial
                                />
                                <Scene
                                    key='PerseneliPageTashkilat'
                                    iconName="md-attach"
                                    icon={TabIcon2}
                                    title='تشکیلاتی'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][1]['permission'] === 1 ?
                                                    perseneliTashkilat
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='PerseneliPageEmli'
                                    iconName="md-cube"
                                    icon={TabIcon2}
                                    title='عملی'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][2]['permission'] === 1 ?
                                                    perseneliElmi
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='PerseneliPageAction'
                                    iconName="md-jet"
                                    icon={TabIcon2}
                                    title='فعلایت'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][3]['permission'] === 1 ?
                                                    perseneliAction
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='PerseneliPageMahale'
                                    iconName="md-locate"
                                    icon={TabIcon2}
                                    title='محلات'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][4]['permission'] === 1 ?
                                                    perseneliMahale
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='PerseneliPageMantaghe'
                                    iconName="md-map"
                                    icon={TabIcon2}
                                    title='مناطق'
                                    component={
                                        perseneliData['is_buy'] === 1 ?
                                            perseneliData['is_active'] === 1 ?
                                                perseneliData['pages'][5]['permission'] === 1 ?
                                                    perseneliMantaghe
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                            </Tabs>

                            <Tabs
                                key='Users'
                                default="PerseneliPageIndex"
                                iconName="md-people"
                                icon={TabIcon}
                                title='کاربران'
                                tabs={true}
                                lazy={true}
                                activeTintColor='#a03537'
                                inactiveTintColor='#c74244'
                                swipeEnabled={true}
                            >
                                <Scene
                                    key='UsersIndexPage'
                                    iconName="md-bookmarks"
                                    icon={TabIcon2}
                                    title='کاربران'
                                    component={
                                        usersData['is_buy'] === 1 ?
                                            usersData['is_active'] === 1 ?
                                                usersData['pages'][0]['permission'] === 1 ?
                                                    UsersIndexPage
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                    initial
                                />
                                <Scene
                                    key='UsersMyGroup'
                                    iconName="md-people"
                                    icon={TabIcon2}
                                    title='گروه من'
                                    component={
                                        usersData['is_buy'] === 1 ?
                                            usersData['is_active'] === 1 ?
                                                usersData['pages'][1]['permission'] === 1 ?
                                                    UsersMyGroup
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='UsersMyPeygiri'
                                    iconName="md-contacts"
                                    icon={TabIcon2}
                                    title='پیگیری من'
                                    component={
                                        usersData['is_buy'] === 1 ?
                                            usersData['is_active'] === 1 ?
                                                usersData['pages'][2]['permission'] === 1 ?
                                                    UsersMyPeygiri
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                                <Scene
                                    key='UsersMyList'
                                    iconName="md-paper"
                                    icon={TabIcon2}
                                    title='لیست من'
                                    component={
                                        usersData['is_buy'] === 1 ?
                                            usersData['is_active'] === 1 ?
                                                usersData['pages'][3]['permission'] === 1 ?
                                                    UsersMyList
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                            </Tabs>

                            <Tabs
                                key='Amar'
                                default="AmarIndexPage"
                                iconName="md-analytics"
                                icon={TabIcon}
                                title='آمار'
                                tabs={true}
                                lazy={true}
                                activeTintColor='#a03537'
                                inactiveTintColor='#c74244'
                                swipeEnabled={true}
                            >
                                <Scene
                                    key='AmarIndexPage'
                                    iconName="md-pie"
                                    icon={TabIcon2}
                                    title='ثبت آمار'
                                    component={
                                        amarData['is_buy'] === 1 ?
                                            amarData['is_active'] === 1 ?
                                                amarData['pages'][0]['permission'] === 1 ?
                                                    AmarIndexPage
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                    initial
                                />
                                <Scene
                                    key='AmarTahlilAmari'
                                    iconName="md-stats"
                                    icon={TabIcon2}
                                    title='تحلیل آماری'
                                    component={
                                        amarData['is_buy'] === 1 ?
                                            amarData['is_active'] === 1 ?
                                                amarData['pages'][1]['permission'] === 1 ?
                                                    AmarTahlilAmari
                                                    :
                                                    ErrorPermission
                                                :
                                                ErrorActive
                                            :
                                            ErrorBuy
                                    }
                                    hideNavBar={true}
                                />
                            </Tabs>

                            <Scene key='ShopIndexPage' iconName="md-cart" icon={TabIcon} component={shop} title='فروشگاه' hideNavBar={true} />
                        </Scene>
                    </Scene>
                </Router>
            )

        }  else {

            return(
                <View style={Style.mainLoader}>
                    <StatusBar backgroundColor='#0c2238'/>
                    <Image style={Style.imageLogo} source={require('./assets/images/kanoonapplogolightsmall.png')} />
                    <View style={{marginTop:20}}>
                        <Spinner/>
                    </View>

                    <AwesomeAlert
                        show={this.state.alert.show}
                        title={this.state.alert.title}
                        message={this.state.alert.message}
                        showCancelButton={true}
                        showConfirmButton={true}

                        confirmText="تلاش دوباره"
                        onConfirmPressed={ () => {
                            this.setState({
                                alert : {
                                    show : false,
                                }
                            });
                            this.componentWillMount()
                        }}

                        onDismiss={ () => this.componentWillMount() }

                        cancelText="خروج"
                        onCancelPressed={() => {
                            BackHandler.exitApp();
                        }}

                        titleStyle={{
                            fontFamily:'IRANSansMobile',
                        }}

                        messageStyle={{
                            fontFamily:'IRANSansMobile',
                        }}

                        cancelButtonTextStyle={{
                            fontFamily:'IRANSansMobile',
                            color:'#363636'
                        }}

                        confirmButtonTextStyle={{
                            fontFamily:'IRANSansMobile',
                            color:'#363636'
                        }}
                    />
                </View>
            )

        }

    }
}

class TabIcon extends React.Component {
    render() {
        const color = this.props.focused ? '#34495e' : '#9b59b6';
        return (
            <Icon style={{color: color}} name={this.props.iconName} size={20}/>
        );
    }
}

class TabIcon2 extends React.Component {
    render() {
        const color = this.props.focused ? '#a03537' : '#c79a6d';
        return (
            <Icon style={{color: color}} name={this.props.iconName} size={18}/>
        );
    }
}

const Style = StyleSheet.create({
    MainTab : {
        ...Platform.select({
            ios: {
                fontFamily : 'IRANSansMobile',
                fontWeight : "bold"
            },
            android: {
                fontFamily : 'IRANSansMobile_Bold',
            },
        }),
    },
    mainLoader : {
        flex:1,
        backgroundColor:'#0c2238',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    imageLogo : {
        width : 200,
        height: 226
    }
});