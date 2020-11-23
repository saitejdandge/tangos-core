export default class ErrorModel {
    public title!: string;
    public subTitle!: string;
    public opStatus!: number;
    public image!: string;


    constructor(titleValue: string, subTitleValue: string, imageValue: string, opStatusValue: number) {
        this.title = titleValue;
        this.subTitle = subTitleValue;
        this.image = imageValue;
        this.opStatus = opStatusValue;
    }

}