export type Product = {
  id: string;
  name: string;
  step_quantity_in_grams: number;
  min_quantity_in_grams: number;
  units: number;
  store_id: number;
  sale_type: string;
  price: string;
  image: string;
};

export type Store = {
  store_id: number;
  name: string;
  lat: string;
  lng: string;
  logo: string;
  image: string;
  store_type: string;
  store_type_image: string;
  id: number;
  brand_name: string;
};

export type Address = {
  id: number;
  lat: string;
  lng: string;
  address_id: number;
};

export type CalculatedInformation = {
  order_id: number;
  store_id: number;
  store_type: string;
  reference_point_lat: string | null;
  reference_point_lng: string | null;
};

export type Whim = {
  name: string;
  order_id: number;
  url_photo: string | null;
};

export type Order = {
  id: number;
  state: string;
  total_value: string;
  created_at: string;
  whim: Whim | null;
  products: Product[];
  store: Store;
  address: Address;
  calculated_information: CalculatedInformation;
  reference_point: string | null;
  whims: Whim[];
  whim_pictures: string[];
  is_available: boolean;
  rate: number;
  price_rule_id: number;
  action_points: string | null;
  place_at: string | null;
  closed_at: string | null;
  vendor_id: number | null;
  details?: OrderDetails;
};

export type HistoryResponse = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  from: number;
  to: number;
  data: Order[];
};

export type OrderDetails = {
  order_id: number;
  payment_method: string;
  coupon_code: string | null;
  store_type: string;
  created_at: string | null;
  address: {
    description: string | null;
    name: string | null;
    tag: string | null;
    lat: string | null;
    lng: string | null;
  };
  state: string;
  products: [
    {
      name: string | null;
      description: string | null;
      product_id: string | null;
      unit_price: number;
      units: number;
      total_price: number;
      comments: string | null;
      image: string | null;
      presentation: string | null;
      toppings: [];
    }
  ];
  whims: Whim[];
  storekeeper: {
    id: number;
    full_name: string | null;
    profile_pic: string | null;
    transport_media_type: string | null;
    rate: number;
  };
  store: {
    store_id: number;
    name: string | null;
    lat: string | null;
    lng: string | null;
    logo: string | null;
    type: string | null;
    address: string | null;
  };
  order_modifications: { type: string; created_at: string | null }[];
  totals: { value: string; description: string; index: number }[];
  action_points: [];
  cc_data: {
    card_type: string;
    last_four_digits: string;
    gateway_type: string;
  };
  rate: number;
};
