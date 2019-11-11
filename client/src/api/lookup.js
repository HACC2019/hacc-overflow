const BASE_URL = 'https://hacc.aparcar.org/lookup';
async function lookup(latitude, longitude) {
    try {
        const url = [BASE_URL, '?latitude=', latitude, '&longitude=', longitude].join('');
        return await fetch(url);
    } catch (e) {
        throw (e);
    }
}

export default lookup;
