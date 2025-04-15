export const FUISTE_MI_BAILE_INOLVIDABLE = "FUISTE_MI_BAILE_INOLVIDABLE";

const config = {
    api_version: 'v1',
    entity: 'anx',
    type: 'api',
    url: 'https://anxapi.breadriuss.com'
}

export const APP_NAME = 'Anx' 

export const API_URL = `${config.url}/${config.type}/${config.entity}/${config.api_version}`;
