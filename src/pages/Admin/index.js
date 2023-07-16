import { Menu } from 'antd';
import { useState } from 'react';
import { getItem } from '~/ultil';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { BiFoodMenu } from 'react-icons/bi';

import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import classNames from 'classnames/bind';
import style from './Admin.module.scss';
import Header from '~/layouts/DefaultLayout/Header';
import AdminOrder from './AdminOrder';
import AdminCategory from './AdminCategory';

const cx = classNames.bind(style);
function Admin() {
    const items = [
        getItem('Khách hàng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'product', <AppstoreOutlined />),
        getItem('Đơn hàng', 'order', <BsFillCartCheckFill />),
        getItem('Category', 'category', <BiFoodMenu />),
    ];

    const [keySelected, setKeySlected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            case 'order':
                return <AdminOrder />;
            case 'category':
                return <AdminCategory />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySlected(key);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
                <div style={{ display: 'flex' }}>
                    <div className={cx('menu')}>
                        <Menu
                            mode="inline"
                            // openKeys={openKeys}
                            // onOpenChange={onOpenChange}
                            style={{ minWidth: '256px' }}
                            items={items}
                            onClick={handleOnClick}
                        />
                    </div>
                    <div className={cx('page')}>{renderPage(keySelected)}</div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
