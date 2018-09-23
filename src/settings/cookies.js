

function saveCookie(state) {
    
    state.cookies.set('uid', state.uid, { path: '/' });
    state.cookies.set('bin', '', { path: '/' });
    state.cookies.set('status', '', { path: '/' });
    state.cookies.set('token', '', { path: '/' });
    state.cookies.set('message', '', { path: '/' });
}

export default saveCookie;