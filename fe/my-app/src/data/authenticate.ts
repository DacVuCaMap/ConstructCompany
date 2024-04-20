
import Cookies from 'js-cookie'
import { cookies } from 'next/headers';

export const userData = () => {
    const email = Cookies.get('email');
    const admin = Cookies.get('admin') === 'true';
    const token = Cookies.get('jwt');
    if (!email) {
        return null;
    }
    return { email, admin, token }
}
export const saveCookieUser = (data: any) => {

    const day = data.remember ? new Date('2200-12-03') : null;
    const key = ['id', 'email', 'admin'];
    key.map(item => {
        setCookie(item, data[item], day);
    })
    setCookie('jwt', data.token, day);

}
const setCookie = (name: string, value: any, day: Date | null) => {
    const expires = new Date();
    if (day) {
        expires.setTime(day.getTime() + 24 * 60 * 60 * 1000);
        value = value.toString();
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
        return;
    }
    document.cookie = name + '=' + encodeURIComponent(value) + ';path=/';
}
