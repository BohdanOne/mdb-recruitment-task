export default class BaseComponent {
  constructor(id, parentId) {
    this.template = document.getElementById(id);
    this.parent = document.getElementById(parentId);
    const templateContent = document.importNode(this.template.content, true);
    this.element = templateContent.firstElementChild;
    this.element.id = id;
    this.attachToParent();
  }

  attachToParent() {
    this.parent.appendChild(this.element);
  }
}
