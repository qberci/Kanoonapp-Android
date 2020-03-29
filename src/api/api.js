import Axios from 'axios';

export default class Api extends Axios{

    static async GET(url, config) {

        try {

            return await Api.get( 'https://api.kanoonapp.ir' + url, config);

        } catch (e) {

            return e;

        }

    }

    static TranslateError (errorId){
        errorId = errorId.toString();
        switch (errorId) {
            case "-1":
                return "آیتم مورد نظر پیدا نشد !";
            case "0":
                return "ارور در کوئری ارسال شده";
            case "-2":
                return "مشکل در مقدار ورودی ارسال شده";
            case "-3":
                return "نام کاربری یا رمز عبور اشتباه است";
            case "-4":
                return "شما مجوز لازم برای این بخش را ندارید";
            case "-5":
                return "کاربر مورد نظر پیدا نشد";
            case "-6":
                return "این محصول را خریداری نکرده اید";
            case "-7":
                return "صورتحساب خود را پرداخت نکرده اید";
            case "-8":
                return "مقادیر ارسال شده در سیستم موجود است";
            case "-9":
                return "حجم اکانت شما به اتمام رسیده است";
            case "-100":
                return "ارور در سیستم ! با پشتبانی تماس بگیرید";
            default:
                return "ارور ناشناخته";
        }
    }
}