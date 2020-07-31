export default class CookieMethods {
    constructor(cookieName) {
        this.cookieName = cookieName;
    }

    getCookieValue() {
        const regexp = new RegExp(`(${this.cookieName}=)([\\d,]*)(;|$)`);
        const cookieRawValue = document.cookie.match(regexp);
        return cookieRawValue[2].length > 0 ? cookieRawValue[2].split(',') : [];
    }

    _setCookie(valueArray) {
        document.cookie = `${this.cookieName}=${valueArray.join(',')}; path=/;`
    }

    add(id) {
        const cookieArray = this.getCookieValue();
        cookieArray.push(id);
        this._setCookie(cookieArray);
    }

    remove(id) {
        const cookieArray = this.getCookieValue();
        const newCookieArray = cookieArray.filter(value => +value !== id);
        this._setCookie(newCookieArray);
    }

    contains(id) {
        const cookieArray = this.getCookieValue();
        return cookieArray.some(value => +value === id);
    }

    toggle(id) {
        if(this.contains(id)) {
            this.remove(id);
        } else {
            this.add(id);
        }
    }
}