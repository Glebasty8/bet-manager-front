import Router from 'next/router';
import { Cookies } from 'react-cookie';
// set up cookies
const cookies = new Cookies();
import api from 'src/api';

export async function handleAuthSSR(ctx) {
    let token = null;

    // if context has request info aka Server Side
    if (ctx.req) {
        // ugly way to get cookie value from a string of values
        // good enough for demostration
        token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }
    else {
        // we dont have request info aka Client Side
        token = cookies.get('token')
    }

    try {
        const response = await api.ping( { 'Authorization': `Bearer ${token}`});
        const tokenPingRes = await response.json();
        return token
    } catch (err) {
        console.log('err', err);
        // in case of error
        // console.log(err.response.data.msg);
        // redirect to login
        if (ctx.res) {
            ctx.res.writeHead(302, {
                Location: '/login'
            });
            ctx.res.end()
        } else {
            Router.push('/login')
        }
    }
}
