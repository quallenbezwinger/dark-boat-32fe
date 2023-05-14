import { parse } from "cookie";
export default {
  async fetch(request) {

    const newLocationHost = "developers.cloudflare.com/workers/about/";
    const COOKIE_NAME = "cf-noredir";
    const cookie = parse(request.headers.get("Cookie") || "");

    let reqUA = request.headers.get('user-agent')
    if (reqUA.match('curl')!=null) {
      if (cookie[COOKIE_NAME] != null) {
        if (cookie[COOKIE_NAME] != "true")  {
          let newLocation = "https://"+newLocationHost
          return Response.redirect(newLocation, 302)
        }
      }
    }
    return fetch(request);
  },
};
