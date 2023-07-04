import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.POCKET_BASE_BACKEND_URL);