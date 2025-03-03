import { Configuration, DefaultApi } from './generated';

const config = new Configuration({
    basePath: 'http://localhost:8000',
});

export const api = new DefaultApi(config);

export default api;