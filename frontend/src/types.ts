
export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    rating: {
        rate: number;
        count: number;
    };
    category: string;
}


export interface Order {
    id: number;
    products: Product[];
    userId: number;
    date: Date;
    status: 'Active' | 'Completed';
}


export interface CartItem {
    product: Product;
    quantity: number;
    currency: string;
}

export interface Action {
  type: any;
  payload?: any;
}