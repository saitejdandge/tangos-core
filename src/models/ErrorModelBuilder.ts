import { ErrorModel } from "./ErrorModel";

export  class ErrorModelBuilder {
    private titleValue!: string;
    private subTitleValue!: string;
    private opStatusValue!: number;
    private imageValue!: string;

    public title(title: string): ErrorModelBuilder {
        this.titleValue = title;
        return this;
    }

    public subTitle(subTitle: string): ErrorModelBuilder {
        this.subTitleValue = subTitle;
        return this;
    }


    public opStatus(opStatus: number): ErrorModelBuilder {
        this.opStatusValue = opStatus;
        return this;
    }

    public image(image: string): ErrorModelBuilder {
        this.imageValue = image;
        return this;
    }

    public build():ErrorModel{
        return new ErrorModel(this.titleValue,this.subTitleValue,this.imageValue,this.opStatusValue); 
    }
}