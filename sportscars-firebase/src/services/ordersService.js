import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const createOrder = async (user, car) => {
  const order = {
    userId: user.uid,
    userName: user.name,
    carId: car.id,
    carBrand: car.brand,
    carModel: car.model,
    carImageUrl: car.imageUrl,
    totalPrice: car.price,
    status: 'CONFIRMED',
    purchaseDate: new Date().toISOString(),
  };
  const docRef = await addDoc(collection(db, 'orders'), order);
  return { id: docRef.id, ...order };
};

export const getUserOrders = async (userId) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('purchaseDate', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
