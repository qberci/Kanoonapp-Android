import React from 'react';
// noinspection ES6CheckImport
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme} from "victory-native";
import apiDashboard from "../../../api/ui/Dashboard";
import {Error, Loading} from "../../../components/global";
import {Picker, View  , Icon} from "native-base";

export default class DashboardChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartSelected: '0',
            showContent : false,
            data : {},
            error : false,
            errorNote : '',
            chartData : {}
        }
    }

    componentWillMount(){

        try {

            let response = apiDashboard.getDashboard({
                amar:true,
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
                        if (response.status === 200 && response.data.OK === true){

                            let innerData = response.data.result.amar[0];
                            let setAmar = innerData.set;
                            let Data = [];

                            for (let i = 0; i < setAmar.length; i++) {
                                Data.push({
                                    x:setAmar[i].date,
                                    y:setAmar[i].count
                                })
                            }

                            this.setState({
                                showContent:true,
                                data: response.data,
                                chartSelected : innerData['ID'],
                                chartData : Data.reverse()
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

                let amar = this.state.data.result.amar;

                return (
                    <View style={Style.ChartMainView}>
                        <View style={Style.ChartMainPicker}>
                            <Picker
                                mode="dropdown"
                                iosHeader="نوع آمار را انتخاب کنید"
                                iosIcon={<Icon name="arrow-down"/>}
                                textStyle={{fontFamily:'IRANSansMobile',textAlign:'center',fontSize:12}}
                                itemTextStyle={{fontFamily:'IRANSansMobile',textAlign:'center',fontSize:12}}
                                itemStyle={{paddingTop:3,paddingRight:8,paddingLeft:8}}
                                style={{width: undefined}}
                                selectedValue={this.state.chartSelected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {amar.map((item,key) => <Picker.Item label={item.name} value={item.ID} key={key}/>)}
                            </Picker>
                        </View>
                        <View>
                            <View style={Style.ChartView}>
                                <ChartView data={this.state.chartData} />
                            </View>
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

    onValueChange(value: string) {
        let amar = this.state.data.result.amar;
        let innerData = amar.find((item) => item.ID === value);
        let setAmar = innerData.set;
        let Data = [];

        for (let i = 0; i < setAmar.length; i++) {
            Data.push({
                x:setAmar[i].date,
                y:setAmar[i].count
            })
        }

        this.setState({
            chartData : Data.reverse()
        });

        this.setState({
            chartSelected: value
        });
    }
}

export class ChartView extends React.Component{
    render(){
        return(
            <View style={Style.ChartView}>
                <VictoryChart width={ Dimensions.get('window').width+40 } height={180} theme={VictoryTheme.material}>
                    <VictoryLine
                        data={this.props.data}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        labels={(datum) => datum.y}
                        labelComponent={<VictoryLabel renderInPortal dy={-30}/>}
                        interpolation="natural"
                    />
                    <VictoryAxis
                        theme={VictoryTheme.material}
                    />
                </VictoryChart>
            </View>
        )
    }
}


const Style = StyleSheet.create({
    ChartMainView:{
        flexDirection:'column',
        flexWrap:'nowrap',
        justifyContent:'center',
        alignItems:'stretch',
        backgroundColor:'#fff',
        margin:8,
        elevation:2,

    },

    ChartMainPicker :{
        marginLeft:10,
        marginTop:4,
        marginBottom:5,
        marginRight:10,
    },

    PickerStyle : {
        fontFamily:'IRANSansMobile',
        fontSize:10,
        textAlign:'right'
    },

    ChartView:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'#fff',
        margin:8,

    },

});