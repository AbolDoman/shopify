import axios from "axios";
const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false,
})
const API_URL = 'https://fakestoreapi.com';

export async function getProducts() {
    try {
        const data = await axios.get(`${API_URL}/products`, {
            httpsAgent: agent,
        });
        return({products: data.data || {}});
    } catch (error) {
        console.log("ERRROR:", error);
    }
}