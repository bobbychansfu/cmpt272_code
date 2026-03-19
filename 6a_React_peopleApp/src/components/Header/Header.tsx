import logo from "../../assets/react.svg";

function Header() {
    return (
        <header>
            <h1>Random People App <img src={logo} className="logo" alt="React Logo" /></h1>
        </header>
    );
}

export default Header;