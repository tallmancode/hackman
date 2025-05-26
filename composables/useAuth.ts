const initCookies = () => {
    const jwtToken = useCookie('jwtToken', {
        maxAge: 3600, // Set the cookie to expire in 3600 seconds (1 hour)
    }); // Coo

    const refreshToken = useCookie('refreshToken', {
        maxAge: 604800, // Set the cookie to expire in 3600 seconds (1 hour)
    }); // Cookie for JWT

    return {jwtToken, refreshToken}
}

const setCookies = (jwt: string | undefined, refresh: string | undefined) => {
    return new Promise((resolve, reject) => {
        const {jwtToken, refreshToken} = initCookies()
        jwtToken.value = jwt;
        refreshToken.value = refresh;
        resolve(true)
    })

}

const getCookies = () => {
    const {jwtToken, refreshToken} = initCookies()
    return {
        jwtToken: jwtToken.value,
        refreshToken: refreshToken.value
    }
}

export {
    getCookies,
    setCookies,
}
