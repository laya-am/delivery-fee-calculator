export interface CalculationData {
   cartValue: number;
   distance: number;
   numOfItems: number;
   time: string;
   date: string;
} 

 export default function calculateFee(data: CalculationData): number {
   
   const {cartValue , distance , numOfItems , time, date} = data;
   let newFee : number;

   const cartSurcharge : number = cartValue < 10 ? 10 - cartValue : 0;
   const deliveryFee : number = 2 + (distance > 1000 ? Math.floor( (distance - 1000) / 500) : 0);
   const bulkFee : number = numOfItems > 12 ? 1.2 : 0;
   const numOfItemsSurcharge : number = numOfItems > 4 ? (numOfItems - 4)* 0.5 : 0;
   
   newFee = cartValue >= 200 ? 0 :  Math.min(cartSurcharge + deliveryFee + bulkFee + numOfItemsSurcharge, 15);
   
   const hour = + time.slice(0,2);
   const day = new Date(date).getDay();
   (day === 5 && hour >= 15 && hour <= 18) ? newFee = Math.min(newFee * 1.2 , 15) : null;
   return newFee
}