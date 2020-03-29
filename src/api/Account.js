import Api from './api';

export default class Account extends Api{

    static async accountInfo(token) {

        try {

            return await Account.GET('/Get/Account', {
                params: {
                    token: token,
                }
            });

        } catch (e) {

            console.log(e)

        }

    }

}