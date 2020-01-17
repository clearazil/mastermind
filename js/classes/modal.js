/**
 *
 */
export default class Modal {
    /**
     *
     */
    constructor() {
        this.modal = document.querySelector('#modal');
        const closeButton = document.querySelector('#modal-close');

        closeButton.onclick = () => {
            this.close();
        };
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
