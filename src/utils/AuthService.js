import api from 'src/api';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class AuthService {
    login = async (creeds) => {
        // Get a token
        const res = await api.login(creeds);
        if (!res.ok && res.status === 400) {
            return res.json()
        }
        const token = await res.text();
        this.setToken(token);
        const profileRes = await api.getProfile(this.getToken());
        const profile = await profileRes.json();
        if (!profileRes.ok && profileRes.status === 400) {
            return await res.json()
        }
        this.setProfile(profile);
        return profileRes;
    };

    register = async (data) => {
        // Get a token
        const res = await api.register(data);
        const token = await res.text();
        this.setToken(token);
        const profile = await api.getProfile(token);
        const profileInJSON = await profile.json();
        this.setProfile(profileInJSON);
        return profileInJSON
    };

    loggedIn(){
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token // handwaiving here
    }

    setProfile(profile){
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
    }

    getProfile = () => {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {}
    };

    getUser = async () => {
        const profile = await api.getProfile(this.getToken());
        return profile.json();
    };

    setToken(token){
        // Saves user token to localStorage
        // localStorage.setItem('token', token)
        cookies.set('token', token);
    }

    getToken(){
        // Retrieves the user token from localStorage
        // return localStorage.getItem('token')
        console.log('cookies.get(\'token\')', cookies.get('token'));
        return cookies.get('token')
    }

    static logout(){
        // Clear user token and profile data from localStorage
        // localStorage.removeItem('token');
        cookies.remove('token')
    }
}


export default AuthService;
