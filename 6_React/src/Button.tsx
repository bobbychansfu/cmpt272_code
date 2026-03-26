
import style from "./Button.module.css";

function Button({ text, onClick }: { text: string; onClick: () => void }) {
    return (
        <button style={{ color: "red", fontSize: "2em" }} className={style.label} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;