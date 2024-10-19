// FORMS

export type LoginFormType = {
  email: string;
  password: string;
};
export type SignUpFormType = {
  email: string;
  password: string;
  full_name: string;
};

export interface IUser {
  _id: string;
  email: string;
  full_name: string;
  password: string;
  type: "admin" | "user";
}
export interface IProduct {
  _id?: string; // The unique identifier for the product, optional for creation
  productCode: string; // The unique code for the product, combining name, style, and color
  productName: string; // The name of the product
  styleCode: string; // The style code for the product
  colorCode: string; // The color code of the product
  colorDescription: string; // A description of the color
  collection?: string; // The collection type, either Spring/Summer (SS) or Autumn/Winter (AW)
  productCollection?: string; // The collection type, either Spring/Summer (SS) or Autumn/Winter (AW)
  notes?: string;
  images?:any;
  // Any additional notes or comments about the product
  status: 'draft' | 'picture-uploaded' | 'approved' | 'revision'; // The status of the product
  createdAt?: string; // The date the product was created, optional for creation
  updatedAt?: string; // The date the product was last updated, optional for creation
}


export interface IColumn {
  name: string;
  uid: string;
}

export interface IBrand {
  name: string;
  _id: string;
}
export interface IEvent {
  _id?: string;
  name: string;
  date: string;
  location: string;
  description?: string;
}
export interface IQuality {
  _id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Result<T> {
  data?: T;
  error?: string;
  meta?: IMeta;
}

export interface IMeta {
  currentPage: number;
  pageItems: number;
  totalItems: number;
  totalPages: number;
}

export interface ICustomer {
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IOrder {
  _id?: string;
  day_id?: number;
  orderDate?: any;
  event?: IEvent;
  products: Array<{
    product?: IProduct;
    customSize?: string;
    quantity: number;
    price: number;
  }>;
  status?: "delivered" | "in-process" | "order-placed" | "ready-to-go";
  seller?: IUser; // Reference to the Seller (User)
  customer?: ICustomer; // Reference to the Customer
  orderDiscount?: number; // Discount percentage
  totalPrice?: number; // Virtual field for total price
  receipts?: {
    clientReceipt: string;
    internalReceipt: string;
  }; // Virtual field for receipts
  createdAt?: string; // Timestamp for when the order was created
  updatedAt?: string; // Timestamp for when the order was last updated
}
