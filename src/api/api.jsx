import React from 'react';
import axios from 'axios';
import md5 from 'md5';

const API_URL = 'https://api.valantis.store:40000/';
const PASSWORD = 'Valantis';

const getAuthHeader = () => {
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const authString = md5(`${PASSWORD}_${timestamp}`);
    return authString;
};

const retryOnFailure = async (fn, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errorId) {
                console.log('Error ID:', error.response.data.errorId);
            }
            console.error('Error:', error);
            if (i < retries - 1) {
                console.log(`Retrying (${i + 1}/${retries})...`);
            }
        }
    }
    return null;
};

export const getIds = async (offset, limit) => {
    try {
        const fetchData = async () => {
            const response = await axios.post(
                `${API_URL}`,
                { action: 'get_ids', params: { offset, limit } },
                { headers: { 'X-Auth': getAuthHeader() } }
            );
            return response.data.result;
        };
        return await retryOnFailure(fetchData);
    } catch (error) {
        console.error('Error fetching IDs:', error);
        return null;
    }
};

export const getItems = async (ids) => {
    try {
        const fetchData = async () => {
            const response = await axios.post(
                `${API_URL}`,
                { action: 'get_items', params: { ids } },
                { headers: { 'X-Auth': getAuthHeader() } }
            );
            return response.data.result;
        };
        return await retryOnFailure(fetchData);
    } catch (error) {
        console.error('Error fetching items:', error);
        return null;
    }
};

export const getFields = async (field, offset, limit) => {
    try {
        const fetchData = async () => {
            const response = await axios.post(
                `${API_URL}`,
                { action: 'get_fields', params: { field, offset, limit } },
                { headers: { 'X-Auth': getAuthHeader() } }
            );
            return response.data.result;
        };
        return await retryOnFailure(fetchData);
    } catch (error) {
        console.error('Error fetching fields:', error);
        return null;
    }
};

export const filterProducts = async (params) => {
    try {
        const fetchData = async () => {
            const response = await axios.post(
                `${API_URL}`,
                { action: 'filter', params: params },
                { headers: { 'X-Auth': getAuthHeader() } }
            );
            return response.data.result;
        };
        return await retryOnFailure(fetchData);
    } catch (error) {
        console.error('Error filtering items:', error);
        return null;
    }
};
