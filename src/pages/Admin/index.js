import { Menu } from 'antd';
import { useState } from 'react';
import { getItem } from '~/ultil';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import classNames from 'classnames/bind';
import style from './Admin.module.scss';
import Header from '~/layouts/DefaultLayout/Header';

const cx = classNames.bind(style);
function Admin() {
    const items = [getItem('Khách hàng', 'user', <UserOutlined />), getItem('Sản phẩm', 'product', <AppstoreOutlined />)];

    const [keySelected, setKeySlected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySlected(key);
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', height: '100vh' }}>
                <Menu
                    mode="inline"
                    // openKeys={openKeys}
                    // onOpenChange={onOpenChange}
                    style={{ width: 256 }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div className={cx('page')}>{renderPage(keySelected)}</div>
            </div>
        </>
    );
}

export default Admin;
