"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorModelBuilder = void 0;
const ErrorModel_1 = require("./ErrorModel");
class ErrorModelBuilder {
    title(title) {
        this.titleValue = title;
        return this;
    }
    subTitle(subTitle) {
        this.subTitleValue = subTitle;
        return this;
    }
    opStatus(opStatus) {
        this.opStatusValue = opStatus;
        return this;
    }
    image(image) {
        this.imageValue = image;
        return this;
    }
    build() {
        return new ErrorModel_1.ErrorModel(this.titleValue, this.subTitleValue, this.imageValue, this.opStatusValue);
    }
}
exports.ErrorModelBuilder = ErrorModelBuilder;
