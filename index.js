import axios from 'axios';
import fs from 'fs';

const eveSeatBase = 'http://127.0.0.1:8080';
const apiKey = '';
const corpId = '1576307093';


const memberTrackingPath = '/api/v1/corporation/member-tracking/';


const writeCharacterAudit = () => {
    var axiosInstance = axios.create({
        headers: {'X-Token': apiKey}
    });
    axiosInstance.get(eveSeatBase + memberTrackingPath + corpId).then(resp => {
        const haveKey = resp.data.filter(x => x.key_ok !== null);
        const haveKeyNames = haveKey.map(x => x.name);
        fs.writeFile('haveApiKeys.txt', haveKeyNames);

        const dontHaveKey = resp.data.filter(x => x.key_ok === null);
        const dontHaveKeyNames = dontHaveKey.map(x => x.name);
        fs.writeFile('dontHaveApiKeys.txt', dontHaveKeyNames);
    })
}

writeCharacterAudit();