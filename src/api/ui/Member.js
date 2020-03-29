import Ui from './ui';
// noinspection ES6CheckImport
import {AsyncStorage} from "react-native";

export default class Member extends Ui{

    static async getOne(id) {

        try {

            let token = await AsyncStorage.getItem('apiToken');

            return await Member.GET('/Get/Member', {
                params: {
                    token : token,
                    id : id
                }
            });

        } catch (e) {

            console.log(e)

        }

    }

}