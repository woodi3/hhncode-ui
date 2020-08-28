import dotenv from 'dotenv';

dotenv.config();

export default {
    STRIPE_KEY: process.env.VUE_APP_STRIPE_KEY || 'ENTER YOUR STRIPE KEY',
    BASE_API_URL: process.env.VUE_APP_BASE_API_URL || 'http://localhost:3000/v1/',
};
