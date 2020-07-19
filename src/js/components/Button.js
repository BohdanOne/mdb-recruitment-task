import BaseComponent from './BaseComponent';

export default class Button extends BaseComponent {
  constructor(templateId, parentId, newElementId, text, onClick, removeAfterClick) {
    super(templateId, parentId, newElementId);
    this.onClick = onClick;
    this.removeAfterClick = removeAfterClick;
    this.element.innerText = text;
    this.parent = document.getElementById(parentId);
    this.remove = this.remove.bind(this);
    this.element.addEventListener('click', () => {
      this.remove();
      onClick();
    });
  }

  remove() {
    if (this.removeAfterClick) {
      this.parent.removeChild(this.element);
    }
  }
}
