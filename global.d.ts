declare module 'react-country-state-city';
declare module 'voucher-code-generator';

interface Item {
  item_id: string;
  item_name: string;
  item_category: string;
  item_brand: string;
  quantity: number;
  price: number;
  discountAmount?: number;
}
interface GtagEvent {
  OrderId?: string;
  currency?: string;
  country?: string;
  value?: string;
  coupon?: string;
  payment_type?: string;
  items?: Item[];
}

interface Window {
  gtag: (action: string, eventName: string, params: GtagEventWithItems) => void;
  Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
