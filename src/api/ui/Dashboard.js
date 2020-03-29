import Ui from './ui';
// noinspection ES6CheckImport
import {AsyncStorage} from "react-native";

export default class Dashboard extends Ui {

    static async getDashboard(config) {

        let cfg = {
            token : '',
        };

        let token;


        try {

            token = await AsyncStorage.getItem('apiToken');

            cfg.token = token;

            cfg = {...cfg,...config};

            return await Dashboard.GET('/dashboard', {
                params: cfg
            });

        } catch (e) {

            console.log(e)

        }

    }

}
