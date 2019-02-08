import {html, LitElement} from 'lit-element';

/**
* `swc-input-submit` is composed by a native html input and button
* whose styles are based in the “Sopra Steria Web Components” family.
*
* The component has a functionality to enable the button when a regular expression is matched with the input value.
* The component will be able to dispatch an event with introduced data.
*
* ### Styling
* `swc-input-submit` provides the following custom properties and mixins for styling:
*
* Custom property                   | Description                                        | Default
* ----------------------------------|----------------------------------------------------|------------------------------------------------
* `--main-color`                    | Background color of the button with default state  | #ff1727
* `--disabled-color`                | Background color of the button when is disabled    | #e9e9e9
* `--active-color`                  | Background color of the button when is active      | #ff8c94
*
* Custom Mixin                          | Description                                                         | Default
* --------------------------------------|---------------------------------------------------------------------|----------
* `--swc-input-submit`                  | Mixin applies to the component itself.                              |`{}`
* `--swc-input-submit-wrapper`          | Mixin applies to the container of input and button.                 |`{}`
* `--swc-input-submit-button`           | Mixin applies to the button.                                        |`{}`
* `--swc-input-submit-button-disabled`  | Mixin applies to the button when is disabled.                       |`{}`
* `--swc-input-submit-button-hover`     | Mixin applies to the button when is hover.                          |`{}`
* `--swc-input-submit-input`            | Mixin applies to the input.                                         |`{}`
* `--swc-input-submit-input-disabled`   | Mixin applies to the input when is disabled.                        |`{}`
*
* # Sopra Steria Web Component
* @customElement
* @polymer
* @demo demo/index.html
*/
class SwcInputSubmit extends LitElement {

	/**
	*
	* @type {Function}
	* @return {Object}
	*/
	static get properties() {
		return {
			/**
			 * The value of the data introduced in the input.
			 * @type {String}
			 */
			value: {
				type: String
			},
			/**
			 * The disabled property for the input.
			 * @type {Boolean}
			 */
			disabled: {
				type: Boolean
			},
			/**
			 * Specifies a short hint that describes the expected value of the input.
			 * @type {String}
			 */
			placeholder: {
				type: String
			},
			/**
			 * Specifies that the input element should automatically get focus when the page loads.
			 * @type {Boolean}
			 */
			autoFocus: {
				type: Boolean
			},
			/**
			 * The text to put in the button.
			 * @type {String}
			 */
			buttonLabel: {
				type: String
			},
			/**
			 * The regex to validate the input value.
			 * @type {RegExp}
			 */
			regExp: {
				type: RegExp
			},
			/**
			 * The name of the event triggered when the button is clicked.
			 * @type {String}
			 */
			eventName: {
				type: String
			}
		}
	}

	/**
	 *
	 * @constructor
	 */
	constructor(){
		super()

		this.value = null
		this.disabled = false
		this.placeholder = ''
		this.autoFocus = false
		this.buttonLabel = 'label'
		this.regExp = /^\w/
		this.eventName = 'default-input-submit-event'
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
					width: 100%;
					height: 100%;
					@apply --swc-input-submit;
				}

				.input-submit-wrapper {
					display: flex;
					justify-content: center;
					height: 30px;
					@apply --swc-input-submit-wrapper;
				}

				input {
					width: 80%;
					font-size: 12px;
					display: block;
					outline: none;
					@apply --swc-input-submit-input;
				}

				input:disabled {
					opacity: 0.6;
					pointer-events: none;
					@apply --swc-input-submit-input-disabled;
				}

				button {
					box-shadow: none;
					@apply --swc-input-submit-button;
				}

				button[disabled] {
					cursor: not-allowed;
					pointer-events: none;
					background-color: #F2F2F2;
					color: #D8D8D8;
					@apply --swc-input-submit-button-disabled;
				};

				button:hover {
					cursor: pointer;
					@apply --swc-input-submit-button-hover;
				};
			</style>

			<div class="input-submit-wrapper" @keyup="${this._handlePressEnter}">
				<input
					type="text"
					.placeholder="${this.placeholder}"
					.value="${this.value}"
					@keyup="${this._handleInputChange}"
					?disabled="${this.disabled}"
					?autofocus="${this.autoFocus}">

				<button
					?disabled=${!this.value}
					@click="${this._fireEvent}">
					${this.buttonLabel}
				</button>
			</div>
		`;
	}

	/**
	 * Enables the button if the input value matches the regular expression.
	 *
	 * @param {String} newValue - The last value in the input.
	 * @return {Boolean}
	 */
	_checkRegex(newValue) {
		const validationExp = new RegExp(this.regExp);
		return !validationExp.test(newValue) || !newValue;
	}


	/**
	 * Fires an event when the input change.
	 *
	 * @param {Object} event - Default event from input Change.
	 */
	_handleInputChange(e){
		const btn = this.shadowRoot.querySelector('button');
		btn.disabled = this._checkRegex(e.target.value)
		this.value = btn.disabled ? '' : e.target.value
	}

	/**
	 * Fires an event when click Enter Key.
	 *
	 * @param {Object} event - Default event from input Change.
	 */
	_handlePressEnter(e){
		if(e.key === 'Enter' && this.value){
			this._fireEvent(e)
		}
	}

	/**
	 * Fires an event giving the input value.
	 *
	 * @event eventName
	 */
	_fireEvent() {
		let event = new CustomEvent(this.eventName, {
			detail: { value: this.value },
			bubble: true,
			composed: true
		})

		this.dispatchEvent(event)
		this.value = ''
	}
}

window.customElements.define('swc-input-submit', SwcInputSubmit);
