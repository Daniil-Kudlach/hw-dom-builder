import { Element } from "./Element.js";

export class DomBuilder{
    constructor(){
        this.element;
    }

    create(tag){
        this.element = new Element(tag);
        return this;
    }

    withClass(className){
        this.element.addClass(className);
        return this;
    }

    withId(idName){
        this.element.setId(idName);
        return this;
    }

    withChild(childEl){
        this.element.addChild(childEl);
        return this;
    }
    
    withContent(text){
        this.element.setContent(text);
        return this;
    }

    get result(){
        return this.element.print();
    }
}