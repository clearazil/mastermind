export default class Modal {
    constructor() {
        this.modal = document.querySelector('#modal');
        let closeButton = document.querySelector('#modal-close');

        closeButton.onclick = () => {
            this.close();
        };
    }

    open() {
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }
}