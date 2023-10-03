import React from 'react';
import "../styles/footer.css";
import Logo from "../assets/logo-no-background.svg";
import Visa from '../assets/visa.svg';
import MasterCard from "../assets/mastercard.svg";
import Alipay from "../assets/alipay.svg";
import GooglePay from "../assets/googlePay.svg";
import ApplePay from "../assets/applePay.svg";
import PayPal from "../assets/paypal.svg";

function Footer() {

    const department = ['Fashion', 'Fitness', 'Books', 'Toy', 'Car', 'Food', 'Drinks'];
    const aboutUs = ['About Looters', 'Careers', 'News & Blog', 'Shop by Location'];
    const services = ['Gift Card', 'Mobile App', 'Shipping & Delivery', 'Order Pickup', 'Account Signup']
    const help = ['Looters Help', 'Returns', 'Track Orders', 'Contact Us', 'Feedback', 'Security & Fraud']

    return (
        <div className='FooterContainer'>

            <div className='FooterOuter'>

                <div className='PaymentColumn'>
                    <img src={Logo} className='FooterLogo' />

                    <p>A wallet friendly E-commerce for our customer.</p>

                    <h4>Accepted Payment</h4>

                    <div className='PaymentLogo'>
                        <img src={Visa} />
                        <img src={MasterCard} />
                        <img src={Alipay} />
                        <img src={GooglePay} />
                        <img src={ApplePay} />
                        <img src={PayPal} />
                    </div>
                </div>

                <div className='CategoriesColumn'>
                    <h4>Categories</h4>
                    {department.map((name: string) => {
                        return(
                            <a className='Cursor' key={name}>{name}</a>
                        )
                    })}
                </div>

                <div className='AboutUsColumn'>
                    <h4>About Us</h4>
                    {aboutUs.map((name: string) => {
                        return(
                            <a className='Cursor' key={name}>{name}</a>
                        )
                    })}
                </div>

                <div className='ServicesColumn'>
                    <h4>Services</h4>
                    {services.map((name: string) => {
                        return(
                            <a className='Cursor' key={name}>{name}</a>
                        )
                    })}
                </div>

                <div className='HelpColumn'>
                    <h4>Help</h4>
                    {help.map((name: string) => {
                        return(
                            <a className='Cursor' key={name}>{name}</a>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}

export default Footer;