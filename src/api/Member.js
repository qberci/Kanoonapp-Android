import Api from './api';
// noinspection ES6CheckImport
import {AsyncStorage} from "react-native";

export default class Member extends Api{

    static async getOne(id) {

        try {

            let token = await AsyncStorage.getItem('apiToken');

            return await Member.GET('/Get/Member', {
                params: {
                    token : token,
                    option : JSON.stringify({
                        filter : {
                            ID : id
                        }
                    })
                }
            });

        } catch (e) {

            console.log(e)

        }

    }

}