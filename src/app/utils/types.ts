type loginData = {
    email: string;
    password: string;
}

type productDto = {
    idProduct: number
    name: string;
    description: string;
    price: number;
    batch: number;
    quantity: number;
}

type productData = {
    idProduct: number;
    name: string;
    description: string;
    active:boolean
}

type batchData = {
    Idbatch: number;
    idProduct: number;
    entryDate: Date;
    price: number;
    quantity: number;
    active:boolean
}

export type { loginData, productDto, productData, batchData };