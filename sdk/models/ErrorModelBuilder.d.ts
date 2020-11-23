import ErrorModel from "./ErrorModel";
export default class ErrorModelBuilder {
    private titleValue;
    private subTitleValue;
    private opStatusValue;
    private imageValue;
    title(title: string): ErrorModelBuilder;
    subTitle(subTitle: string): ErrorModelBuilder;
    opStatus(opStatus: number): ErrorModelBuilder;
    image(image: string): ErrorModelBuilder;
    build(): ErrorModel;
}
