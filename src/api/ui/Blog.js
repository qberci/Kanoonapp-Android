import Ui from './ui';
// noinspection ES6CheckImport
import { AsyncStorage } from "react-native";

export default class Blog extends Ui {

    static async getBlog( url ,config) {

        let cfg = {
            token : '',
        };

        let token;


        try {

            token = await AsyncStorage.getItem('apiToken');

            cfg.token = token;

            cfg = {...cfg,...config};

            config.token = token;

            return await Blog.GET( '/dashboard' ,{
                params: cfg
            });

        } catch (e) {

            console.log(e)

        }

    }

}
