import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class MainHeader extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.pcsSpan = this.element.querySelector('#totalPcs');
    this.kgSpan = this.element.querySelector('#totalKg');
    this.renderTotals = this.renderTotals.bind(this);
    this.renderTotals();
  }

  renderTotals() {
    const { totalPcs, totalKg } = state.calculateTotals();
    this.pcsSpan.innerText = `${totalPcs}pc${totalPcs !== 1 ? 's' : ''} `;
    this.kgSpan.innerText = `${totalKg.toFixed(1)}kg`;
  }
}
