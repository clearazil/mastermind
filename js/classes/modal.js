/**
 *
 */
export default class Modal {
    /**
     * @param {string} modalId
     */
    constructor(modalId) {
        this.modal = document.querySelector(modalId);
        const closeButton = this.modal.querySelector('.modal-close');
        const okButton = this.modal.querySelector('.modal-ok');

        closeButton.onclick = () => {
            this.close();
        };

        if (okButton) {
            okButton.onclick = () => {
                this.close();
            };
        }
    }

    /**
     * Open the modal
     */
    open() {
        this.modal.style.display = 'block';
    }

    /**
     * Close the modal
     */
    close() {
        this.modal.style.display = 'none';
    }
}
