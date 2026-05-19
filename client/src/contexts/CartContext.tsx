import { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  nameKo: string;
  nameEn: string;
  img: string;
  price: number; // KRW integer
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  buyNow: (item: Omit<CartItem, 'qty'>) => void; // 장바구니 초기화 후 단일 상품 세팅 (드로어 미오픈)
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  // 바로 구매: 기존 장바구니를 유지하되 해당 상품만 즉시 결제 페이지로 보내기 위해
  // 장바구니를 해당 상품 1개로 교체하고 드로어는 열지 않음
  const buyNow = useCallback((item: Omit<CartItem, 'qty'>) => {
    setItems([{ ...item, qty: 1 }]);
    setIsOpen(false);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty <= 0) { removeItem(id); return; }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, buyNow, removeItem, updateQty, clearCart,
      subtotal, itemCount, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
