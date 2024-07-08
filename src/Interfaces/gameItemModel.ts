export default interface gameItemModel {
  id: string;
  titleGame : string;
  description: string;
  category?: string;             // жанр игры
  imageId?: string;
}
