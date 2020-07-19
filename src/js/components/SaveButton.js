import BaseComponent from './BaseComponent';

export default class SaveButton extends BaseComponent {
  constructor(templateId, parentId, newElementId, onClick) {
    super(templateId, parentId, newElementId);
    this.onClick = onClick;
    this.parent = document.getElementById(parentId);
    this.element.addEventListener('click', () => {
      this.parent.removeChild(this.element);
      onClick();
    });
  }
}
