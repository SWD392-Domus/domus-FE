export const devEnvGoogleAuth = `https://accounts.google.com/o/oauth2/v2/auth?client_id=897518282928-bld8l8o32hplqgo4irb1dv0pj6krlgr4.apps.googleusercontent.com&scope=email%20profile%20openid&redirect_uri=http://localhost:3000/oauth/gg&response_type=code`;
export const getGoogleAuthRequest = (code: string) => {
    return {
        state: "0",
        code: code,
        scope: "email+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email",
        authuser: "3",
        hd: "0",
        prompt: "consent",
    };
};
