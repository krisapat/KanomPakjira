export type ProductProps = {
  category: string;
  id: string;
  name: string;
  description: string;
  image: string;
  retail: number;
  wholesale: number;
  perPieceCrate: number;

}
export type CategoriesProps = {
  id: string;
  name: string;
}
export type PromotionProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  createdAt: Date;
}
