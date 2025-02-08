export const setCookie = (name: string, value: string, days: number, httpOnly: boolean = false) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    let cookie = `${name}=${value}; ${expires}; path=/`;
  
    if (httpOnly) {
      cookie += " HttpOnly";
    }
  
    document.cookie = cookie;
  }
  