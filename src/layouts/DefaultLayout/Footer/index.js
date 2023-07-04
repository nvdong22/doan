import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import logoFahasa from './assets/images/fahasa_logo.png';
import logoBoCongThuong from './assets/images/logo-bo-cong-thuong-da-thong-bao1.png';
import logoFacebook from './assets/images/Facebook-on.png';
import logoIntagram from './assets/images/Insta-on.png';
import logoPinteres from './assets/images/pinterest-on.png';
import logoTumblr from './assets/images/tumblr-on.png';
import logoTwitter from './assets/images/twitter-on.png';
import logoYoutube from './assets/images/Youtube-on.png';
import logoGoogePlay from './assets/images/android1.png';
import logoAppStore from './assets/images/appstore1.png';
import logoLocal from './assets/images/location-dot-solid.svg';
import logoEmail from './assets/images/envelope-solid.svg';
import logoPhone from './assets/images/phone-solid.svg';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer>
            <div className={cx('container')}>
                <div className={cx('footer-inner-form')}>
                    <div className={cx('footer-form-text')}>ĐĂNG KÝ NHẬN BẢN TIN</div>
                    <form className={cx('footer-form')} action="">
                        <input className={cx('input-form')} type="text" placeholder="nhập địa chỉ email của bạn" />
                        <button className={cx('form-btn')}>Đăng Ký</button>
                    </form>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('footer-content')}>
                    <div className={cx('footer-left')}>
                        <div className={cx('footer-logo-img')}>
                            <img src={logoFahasa} alt="" />
                        </div>
                        <p className={cx('footer-left-text')}>Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM</p>
                        <p className={cx('footer-left-text')}>Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA</p>
                        <p className={cx('footer-left-text')}>60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam</p>
                        <p className={`${cx('footer-left-text')} ${cx('text2')}`}>
                            Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ trợ đặt mua và nhận hàng
                            trực tiếp tại văn phòng cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
                        </p>
                        <div className={cx('footer-img-bo')}>
                            <a href="">
                                <img src={logoBoCongThuong} alt="" />
                            </a>
                        </div>

                        <div className={cx('footer-list-img')}>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoFacebook} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoIntagram} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoPinteres} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoTumblr} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoTwitter} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-item-img')}>
                                <a href="">
                                    <img src={logoYoutube} alt="" />
                                </a>
                            </div>
                        </div>

                        <div className={cx('footer-left-btn')}>
                            <div className={cx('footer-left-btn-gg')}>
                                <a href="">
                                    <img src={logoGoogePlay} alt="" />
                                </a>
                            </div>
                            <div className={cx('footer-left-btn-as')}>
                                <a href="">
                                    <img src={logoAppStore} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={cx('footer-right')}>
                        <div className={cx('footer-right-list')}>
                            <div className={cx('footer-right-item')}>
                                <h4 className={cx('footer-right-title')}>Dịch vụ</h4>
                                <ul className={cx('service-list')}>
                                    <li className={cx('service-item')}>
                                        <a href="">Điều khoản sử dụng</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách bảo mật thông tin cá</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách bảo mật thanh toán</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Giới thiệu Fahasa</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Hệ thống trung tâm - nhà sách</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('footer-right-item')}>
                                <h4 className={cx('footer-right-title')}>HỖ TRỢ</h4>
                                <ul className={cx('service-list')}>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách đổi - trả - hoàn tiền</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách bảo hành - bồi hoàn</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách vận chuyển</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chính sách khách sỉ</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Phương thức thanh toán và xuất</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('footer-right-item')}>
                                <h4 className={cx('footer-right-title')}>TÀI KHOẢN CỦA TÔI</h4>
                                <ul className={cx('service-list')}>
                                    <li className={cx('service-item')}>
                                        <a href="">Đăng nhập/Tạo mới tài khoản</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Thay đổi địa chỉ khách hàng</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Chi tiết tài khoản</a>
                                    </li>
                                    <li className={cx('service-item')}>
                                        <a href="">Lịch sử mua hàng</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className={cx('footer-right-contact')}>
                            <h4 className={cx('footer-right-contact-title')}>LIÊN HỆ</h4>
                            <div className={cx('footer-right-contact-list')}>
                                <div className={cx('footer-right-contact-item')}>
                                    <img src={logoLocal} className={cx('logo-contract')} />
                                    <span>60-62 Lê Lợi, Q.1, TP. HCM</span>
                                </div>
                                <div className={cx('footer-right-contact-item')}>
                                    <img src={logoEmail} className={cx('logo-contract')} />
                                    <span>cskh@fahasa.com.vn</span>
                                </div>
                                <div className={cx('footer-right-contact-item')}>
                                    <img src={logoPhone} className={cx('logo-contract')} />
                                    <span>0348520712</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
