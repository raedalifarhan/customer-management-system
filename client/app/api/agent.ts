
import { Pagination } from '@/types/PaginationType';
import { CustomerType } from '@/types/customersTypes';
import { UserType } from '@/types/userTypes';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { FieldValues } from 'react-hook-form';

// Set the base URL for axios
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL + '/api/';

axios.interceptors.request.use(async config => {
    const token = localStorage.getItem('jwt') as string;

    if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = `application/json`;
    }

    return config;
});

axios.interceptors.response.use(response => {
    const pagination = response.data.pageNumber !== undefined; // Check if pagination info is present

    if (pagination) {
        response.data = {
            currentPage: response.data.pageNumber,
            totalItems: response.data.totalCount,
            totalPages: response.data.pageCount,
            data: response.data.data
        } as Pagination<any>;
    }

    return response as AxiosResponse<Pagination<any>>;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
        axios.get<T>(url, config).then(responseBody),

    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Customers = {
    list: (params: URLSearchParams) =>
        requests.get<Pagination<CustomerType[]>>('/customers', { params }),

    details: (id: number) => requests.get<CustomerType>(`/customers/${id}`),
    create: (data: FieldValues) => requests.post<CustomerType>('/customers', data),
    update: (id: number, data: FieldValues) => requests.put<void>(`/customers/${id}`, data),
    delete: (id: number) => requests.del<void>(`/customers/${id}`),
}

const Account = {
    current: () => requests.get<UserType>('/account'),
    login: (data: FieldValues) => requests.post<UserType>('/account/login', data),
    register: (data: FieldValues) => requests.post<UserType>('/account/register', data),
}


const agent = {
    Customers,
    Account,
}

export default agent;
