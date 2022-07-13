import axios from 'axios';

export const obterAutorizacao = async (data: any, email:string, token: string) => {

    const http = axios.create({  
        baseURL: 'https://ws.sandbox.pagseguro.uol.com.br',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return (await http.post(`v2/checkout?email=${email}&token=${token}`, data));
};
