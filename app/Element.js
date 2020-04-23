export class Element {
    constructor(tag) {
        this.dom = document.createElement(tag);
    }

    setId(id) {
        this.dom.setAttribute('id', id)
        return this;
    }

    addClass(cssClass) {
        this.dom.classList.add(cssClass);
        return this;
    }
    
    setContent(text) {
        this.dom.textContent = text;
        return this;
    }

    addChild(child) {
        this.dom.appendChild(child)
        return this;
    }
    
    print() {
        return this.dom;
    }
}