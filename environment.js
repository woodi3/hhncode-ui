import dotenv from 'dotenv';

dotenv.config();

export default {
    STRIPE_KEY: process.env.VUE_APP_STRIPE_KEY || 'ENTER YOUR STRIPE KEY',
};
