import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.token;


const echo = new Echo({
  broadcaster: "pusher",
  key: "5bcus2pmxhiwlo28uzz3", // your REVERB_APP_KEY
  cluster: "mt1", // ✅ required by pusher-js, even if unused
  wsHost: "reverb.softvencefsd.xyz",
  wsPort: 443,
  wssPort: 443,
  forceTLS: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],

  authEndpoint: "http://nexus.softvencefsd.xyz/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;
