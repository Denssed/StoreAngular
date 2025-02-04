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
    onDiscount: boolean
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
    active:boolean,
}

type product = {
    idProduct: number
    name: string;
    description: string;
    price: number;
    idBatch: number;
    quantity: number;
    onDiscount: boolean
}

export type { loginData, productDto, productData, batchData, product };