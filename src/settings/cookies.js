

function saveCookie(card) {

    state.cookies.set('cardResponse', card, { path: '/' });

}

export default saveCookie;