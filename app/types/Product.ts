export interface ProductSection {
    title : string;
    content : string[];
    _id: string;
}

 export interface Product {
    _id : string;
    name : string;
    image : string[];
    headline : string ;
    hastags : string[];
    amount : number;
    sections : ProductSection[];
}


