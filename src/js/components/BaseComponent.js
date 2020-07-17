export default class BaseComponent {
  constructor(id) {
    this.templateId = document.getElementById(id);
    const template = document.importNode(this.templateId.content, true);
    this.element = template.firstElementChild;
    this.element.id = id;
  }

  attachTo(parentElement) {
    parentElement.appendChild(this.element);
  }
}
