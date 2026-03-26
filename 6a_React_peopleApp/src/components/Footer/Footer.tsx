function Footer({ isOn, setToggle }: { isOn: boolean, setToggle: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <footer>
            <h3>DARK MODE</h3>
            <button onClick={() => setToggle(prev => !prev)}>
                {isOn ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
        </footer>
    )
}

export default Footer;