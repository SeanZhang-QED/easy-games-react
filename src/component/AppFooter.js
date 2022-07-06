import React, {Component} from 'react';

class AppFooter extends Component {
    render() {
        return (
            <footer className="footer">
                {`©${new Date().getFullYear()}`}
                <a href={"#"} > Easy Games.</a>
                {` All Rights Reserved. Website Made by Sean - `}
                <a href="mailto:Sean.XUANZHANG@gmail.com" >Xuan Zhang.</a>
            </footer>
        );
    }
}

export default AppFooter;