import { create } from 'zustand';
import { Theme } from '@/components/Icons';

export type Product = {
  id: string;
  img: any;
  kind: string;
  name: string;
  price: string;
  color: string;
};

export type Sale = {
  id: string;
  name: string;
  status: string;
  date: string;
  avatars: number;
  phone: string;
};

interface AppState {
  products: Product[];
  sales: Sale[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  products: [
    { id: '1', img: require('../assets/p1.png'), kind: "Physical Product", name: "TP–7 Ultra-Portable Audio Recorder", price: "1,895,000 IQD", color: Theme.physical },
    { id: '2', img: require('../assets/p2.png'), kind: "Physical Product", name: "TE-OB–4 Mesh Bag Custom",              price: "115,000 IQD",   color: Theme.physical },
    { id: '3', img: require('../assets/p3.png'), kind: "Physical Product", name: "EP–1320 Medieval – Stereo Voices",     price: "2,450,000 IQD", color: Theme.physical },
    { id: '4', img: require('../assets/p4.png'), kind: "Digital Product",  name: "K.O. II: the champ edition",           price: "40,000 IQD",    color: Theme.digital  },
    { id: '5', img: require('../assets/p5.png'), kind: "Physical Product", name: "Teenage Engineering – OB–4",           price: "1,350,000 IQD", color: Theme.physical },
    { id: '6', img: require('../assets/p6.png'), kind: "Physical Product", name: "Duty Overnight Large Shoulder Bag",    price: "285,000 IQD",   color: Theme.physical },
  ],
  sales: [
    { id: 's1', name: "Ali Mohammed",        status: "Complete",  date: "22 Minutes ago",  avatars: 5, phone: "+9647801234567" },
    { id: 's2', name: "Fatima Ahmed",        status: "Complete",  date: "5 Days ago",      avatars: 1, phone: "+9647701234567" },
    { id: 's3', name: "Hussein Abbas",       status: "Complete",  date: "Friday, Nov 22",  avatars: 3, phone: "+9647501234567" },
    { id: 's4', name: "Zainab Hassan",       status: "Pending",   date: "Friday, Nov 22",  avatars: 5, phone: "+9647901234567" },
    { id: 's5', name: "Mustafa Kareem",      status: "Rejected",  date: "Wednesday, Nov 20", avatars: 5, phone: "+9647811234567" },
    { id: 's6', name: "Noor Ali",            status: "Complete",  date: "Sunday, Nov 17",  avatars: 3, phone: "+9647711234567" },
  ],
  addProduct: (product) => set((state) => ({ 
    products: [{ ...product, id: Date.now().toString() }, ...state.products] 
  })),
  addSale: (sale) => set((state) => ({
    sales: [{ ...sale, id: Date.now().toString() }, ...state.sales]
  }))
}));
