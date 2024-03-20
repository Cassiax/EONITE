export interface MENU{
  name : string;
  link : string;
};

export const MENU_PUBLIC:MENU[]=[
  {
    name : 'Home',
    link : '/home'
  },
  {
    name : 'Services',
    link : '/services'
  },
  {
    name : 'About Us',
    link : '/about-us'
  }
];

export const MENU_VENDOR:MENU[]=[
  {
    name : 'Dashboard',
    link : '/dashboard'
  },
  {
    name : 'About Us',
    link : '/about-us'
  }
];

export const DROPDOWN_USER:MENU[]=[
  {
    name : 'Profile',
    link : '/profile-user'
  },
  {
    name : 'Cart',
    link : '/cart'
  },
  {
    name : 'Transaction',
    link : '/transaction'
  },
  {
    name : 'Logout',
    link : '/logout'
  }
];

export const DROPDOWN_VENDOR:MENU[]=[
  {
    name : 'Profile',
    link : '/profile-vendor'
  },
  {
    name : 'Product',
    link : '/product'
  },
  {
    name : 'Transaction',
    link : '/transaction'
  },
  {
    name : 'Logout',
    link : '/logout'
  }
]

export const DROPDOWN_ADMIN:MENU[]=[
  {
    name : 'Profile',
    link : '/profile-vendor'
  },
  {
    name : 'Logout',
    link : '/logout'
  }
]

export const MENU_ADMIN:MENU[]=[
  {
    name : 'Manage User',
    link : '/manage_user'
  },
  {
    name : 'Manage Vendor',
    link : '/manage_vendor'
  }
]

export class Category{
  id?: string;
  name: string='';
  subCategories?:Category[];
}

export class Domicile{
  id?: string;
  name?: string;
}

export class User{
  first_name?  :string;
  last_name?   :string;
  birth_date?  :Date | any;
  phone_number?:string;
  photo_id?    :number;
  email?       :string;
  password?    :string;
  role?        :string;
}

export class Vendor{
  role?           :string;
  subCategory?    :number[];
  domicile_id?    :number;
  firstName?      :string;
  lastName?       :string;
  birthDate?      :string;
  phoneNumber?    :string;
  phoneBusiness?  :string;
  address?        :string;
  photo_identity? :any;
  photo?          :any;
  status?         :string;
  startTime?      :string;
  endTime?        :string;
  email?          :string;
  password?       :string;
  usernameVendor?   :string;
  categoryVendors?  :categoryvendor[];
  description?      :string;
  inporative_date?  :string[];
  instagram_url?    :string;
  rating?           :Number;
  surat_ijin_usaha? :any;
}

export class categoryvendor{
  id?           :number;
}


export class Product{
  id?           : number;
  name?         : string;
  qty?          : number;
  date?         : string[];
}
