import {html, LitElement} from 'lit-element';

/**
* 'swc-input-submit'
*
*
* @customElement
* @polymer
* @demo /demo
*/
class SwcInputSubmit extends (class extends LitElement {}) {

	/**
	*
	* @type {Function}
	*/
	static get properties() {
		return {};
	}

	/**
	*
	* @type {Function}
	* @return {String}
	*/
	render() {
		return html`
			<style>
				:host {
					display: block;
				}
			</style>
			<h2>Hello SwcInputSubmit!</h2>
		`;
	}
}

window.customElements.define('swc-input-submit', SwcInputSubmit);
