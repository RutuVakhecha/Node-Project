import React from "react";
import './Footer.css';
export default class Header extends React.Component{

    render(){
        return(
            <htm>
                <body>
                <div className='container'>
                        <div className='footer'>
                            <div className='resources'>
                                <p><b>Resources</b></p>
                                <b><a href='#retail'>Find A Store</a></b><br></br>
                                <b><a href='#register'>Become A Member</a></b><br></br>
                                <b><a href='#site-feedback'>Send Us Feedback</a></b>
                            </div>

                            <div className='help'>
                                <p><b>Help</b></p>
                                <b><a href='#help'>Get Help</a></b><br></br>
                                <b><a href='#orders'>Order Status</a></b><br></br>
                                <b><a href='#shopping-delivery'>Delivery</a></b>
                                <b><a href='#return-policy'>Returns</a></b><br></br>
                                <b><a href='#payment options'>Payment Options</a></b><br></br>
                                <b><a href='#contact'>Contact Us On Nike.com Inqueries</a></b><br></br>
                                <b><a href='#india-consumer-care-policy'>Contact Us On All Other Inqueries</a></b>
                            </div>

                            <div className='company'>
                                <p><b>Company</b></p>
                                <b><a href='about.nike.com'>About Nike</a></b><br></br>
                                <b><a href='new.nike.com'>News</a></b><br></br>
                                <b><a href='jobs.nike.com'>Careers</a></b>
                                <b><a href='investors.nike.com'>Investors</a></b><br></br>
                                <b><a href='sustinability'>Sustainability</a></b><br></br>
                            </div>
                        </div>
                        <div className='nike-2024'>
                            <span><b>@ 2024 Nike, Inc. All rights reserved</b></span>

                            <select id="selectnav1" class="selectnav">
                                <option value="">Guides</option>
                                <option value="#">Nike Adapt</option>
                                <option value="#">Nike Air</option>
                                <option value="#">Nike Air Force 1</option>
                                <option value="#">Nike Air Max</option>
                                <option value="#">Nike Fly Ease</option>
                                <option value="#">Nike Flyknit</option>
                                <option value="#">Nike Flyleather</option>
                                <option value="#">Nike Free</option>
                                <option value="#">Nike joyride</option>
                                <option value="#">Nike Pegasus</option>
                                <option value="#">Nike React</option>
                                <option value="#">Nike Vaporfly</option>
                                <option value="#">Nike Zoom Fly</option>
                                <option value="#">Nike ZoomX</option>
                            </select>

                            <div className='terms'>
                                <b><a href='new.nike.com' className='terms-sale'>Terms of Sale</a></b>
                                <b><a href='new.nike.com' className='terms-use'>Terms of Use</a></b>
                                <b><a href='new.nike.com' className='nike-privacy'>Nike Privacy Policy</a></b>
                            </div>
                        </div>
                    </div>
                 
                </body>
            </htm>
        )

    }
}
