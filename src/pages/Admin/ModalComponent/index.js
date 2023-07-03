import { Modal } from 'antd';

function ModalComponent({ title = 'modal', isOpen = false, children, ...rests }) {
    return (
        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    );
}

export default ModalComponent;
