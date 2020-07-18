import BaseComponent from './BaseComponent';
import state from '../state/state';

export default class MainHeader extends BaseComponent {
  constructor(templateId, parentId, newElementId) {
    super(templateId, parentId, newElementId);
    this.pcsSpan = this.element.querySelector('#totalPcs');
    this.kgsSpan = this.element.querySelector('#totalKgs');
    this.renderTotals = this.renderTotals.bind(this);
    this.renderTotals();
  }

  renderTotals() {
    const { totalPcs, totalKgs } = state.calculateTotals();
    this.pcsSpan.innerText = `${totalPcs}pc${totalPcs !== 1 ? 's' : ''} `;
    this.kgsSpan.innerText = `${totalKgs.toFixed(1)}kg${totalKgs !== 1 ? 's' : ''}`;
  }
}
