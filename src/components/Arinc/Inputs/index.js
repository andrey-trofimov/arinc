import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../../redux/slice/dbSlice";
import "./style.scss";

function Inputs() {
    let { regExp } = useSelector(state => state.db)
    let dispatch = useDispatch();

    let arr = regExp.split("").map(el => el === "." ? "" : el);
    let style = arr.map(el => el !== "" ? "input bg" : "input")

    function handlerChange(e, i) {
        let newArr = [...arr];
        newArr.splice(i, 1, String(e.target.value));
        
        newArr = newArr.map(el => el === "" ? "." : el).join("");
        dispatch(setRegExp(newArr));
    }

    return (
        <div className="Inputs">
            {arr.map((el, i) => (<input className={style[i]} type="text" key={i} value={el} maxLength={1} onChange={(e) => handlerChange(e, i)} />))}
        </div>
    )
}

export default Inputs;