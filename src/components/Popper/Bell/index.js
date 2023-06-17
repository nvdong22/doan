import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { BsBell } from 'react-icons/bs';
import styles from './Bell.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Bell({ children }) {
    return (
        <div>
            <Tippy
                delay={[0, 700]}
                placement="bottom-end"
                interactive
                render={(attrs) => (
                    <div className={cx('list-bells')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('bell-items')}>
                                <span className={cx('bell-text')}>
                                    <BsBell />
                                    Thông báo
                                </span>
                                <div className={cx('item')}>
                                    <img className={cx('bell-img')} src={images.bell} alt="bell" />
                                    <p>Vui lòng đăng nhập </p>
                                </div>
                                <Button login className={cx('loggin')}>
                                    Đăng nhập
                                </Button>
                                <Button register>Đăng ký</Button>
                            </div>
                        </PopperWrapper>
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default Bell;
