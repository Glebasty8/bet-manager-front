import api from 'src/api';

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
        const profile = await api.getProfile(this.getToken());
        const profileinJSON = await profile.json();
        this.setProfile(profileinJSON);
        return profileinJSON
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

    setToken(token){
        // Saves user token to localStorage
        localStorage.setItem('token', token)
    }

    getToken(){
        // Retrieves the user token from localStorage
        return localStorage.getItem('token')
    }

    static logout(){
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
    }
}


export default AuthService;
