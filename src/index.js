import { parse } from "cookie";
export default {
  async fetch(request) {

    const COOKIE_NAME = "cf-noredir";
    const cookie = parse(request.headers.get("Cookie") || "");
    const newLocationHost = "developers.cloudflare.com/workers/about/";

    let noRedirect = false
    if (cookie[COOKIE_NAME] != null) {
      if (cookie[COOKIE_NAME] == "true")  {
        noRedirect = true;
      }
    }

    let reqUA = request.headers.get('user-agent')
    if (reqUA.match('curl')!=null) {
      if (noRedirect != true) {
        let newLocation = "https://"+newLocationHost
        return Response.redirect(newLocation, 302)
      }
    }
    return fetch(request);
  },
};
