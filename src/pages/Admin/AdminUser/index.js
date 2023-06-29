import { Button } from 'antd/es/radio';
import { IoMdAddCircleOutline } from 'react-icons/io';
import classNames from 'classnames/bind';
import style from './AdminUser.module.scss';
import TableComponent from '../TableComponent';
import { Modal } from 'antd';
import { useState } from 'react';

const cx = classNames.bind(style);
function AdminUser() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {};
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div>Quản lý người dùng</div>
            <Button className={cx('btn-add')} onClick={() => setIsModalOpen(true)}>
                <IoMdAddCircleOutline className={cx('icon-add')} />
            </Button>
            <div>
                <TableComponent />
            </div>
            <Modal title="" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    );
}

export default AdminUser;
