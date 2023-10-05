import { useState } from "react";
import { useDispatch } from "react-redux";
import spinner from "../../../img/spinner.svg";
import ok from "../../../img/ok.svg";
import "./style.scss"

function InputFile(props) {
    let { title, reducer, id } = props;

    let reader = new FileReader();
    let dispatch = useDispatch();
    let [labelText, setLabelText] = useState(title)
    let [icon, setIcon] = useState({});

    function chooseFile(e) {
        if (e.target.files[0]) {
            let arr = [];
            setLabelText(e.target.files[0].name)

            reader.readAsText(e.target.files[0], 'UTF-8');
            reader.onprogress = () => { setIcon({ img: spinner, alt: "spinner", class: "spinner" }) };
            reader.onload = () => {
                arr = reader.result;
                dispatch(reducer(arr));
            };

            reader.onloadend = () => { setIcon({ img: ok, alt: "ok", class: "ok" }) };
        }
    }

    return (<div className="InputFile">
        <label htmlFor={id}>
            {labelText}
            {icon && <img src={icon.img} alt={icon.alt} className={icon.class} />}
        </label>
        <input type="file" onChange={chooseFile} id={id} />

    </div>)
}

export default InputFile