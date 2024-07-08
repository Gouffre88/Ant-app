interface newsItemModel {
    id: string;
    titleInfo: string;
    textInfo: string;
    dataInfo: string;
    game: string | "empty game";
    source: string;
}
export default newsItemModel;