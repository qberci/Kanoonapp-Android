import Api from './api';

export default class User extends Api{

    static async getToken(userName, passWord) {

        try {

            return await User.GET('/Get/Token', {
                params: {
                    username: userName,
                    password: passWord,
                }
            });

        } catch (e) {

            console.log(e)

        }

    }

    static async getMe(Token) {

        try {

            return await User.GET('/Get/Me', {
                params: {
                    token: Token,
                }
            });


        } catch (e) {

            console.log(e)

        }

    }

}