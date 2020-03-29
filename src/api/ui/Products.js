import Ui from './ui';
// noinspection ES6CheckImport
import {AsyncStorage} from "react-native";

export default class Products extends Ui {

    static async getProducts(config) {

        let cfg = {
            token : '',
        };

        let token;


        try {

            token = await AsyncStorage.getItem('apiToken');

            cfg.token = token;

            cfg = {...cfg,...config};

            return await Products.GET('/GetProducts', {
                params: cfg
            });

        } catch (e) {

            console.log(e)

        }

    }


    static async getPage(config) {

        let cfg = {
            token : '',
        };

        let token;


        try {

            token = await AsyncStorage.getItem('apiToken');

            cfg.token = token;

            cfg = {...cfg,...config};

            return await Products.GET('/pages', {
                params: cfg
            });

        } catch (e) {

            console.log(e)

        }

    }

}
