import fs from 'fs';

const path = "./src/firebase.json";
let firebase: boolean | object = false;

if (fs.existsSync(path)) {
    firebase = JSON.parse(fs.readFileSync(path).toString());
}

export const Config = {
    Firebase: firebase,
    Server: {
        address: "192.168.0.11",
        port: "8080"
    }
}