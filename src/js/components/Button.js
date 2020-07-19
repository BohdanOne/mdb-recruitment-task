import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
  constructor(templateId, parentId, newElementId, text, onClick) {
    super(templateId, parentId, newElementId);
    this.onClick = onClick;
    this.element.innerText = text;
    this.parent = document.getElementById(parentId);
    this.element.addEventListener('click', () => {
      this.parent.removeChild(this.element);
      onClick();
    });
  }
}
