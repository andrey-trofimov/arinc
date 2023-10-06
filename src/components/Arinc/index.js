import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../redux/slice/dbSlice";
import "./style.scss";

function Arinc() {
    let { layout, regExp } = useSelector(state => state.db)
    let style = `layout ${layout}`;
    let dispatch = useDispatch();

    function handlerChange(e, i) {
        let newArr = [...arr];
        newArr.splice(i, 1, String(e.target.value));
        newArr = newArr.map(el => (el === "") || (el === " ") ? "." : el).join("");
        dispatch(setRegExp(newArr));
    }

    let arr = regExp.split("").map(el => el === "." ? "" : el);

    return (
        <div className="Arinc">
            <div className={style}></div>
            <div className="row">
                {arr.map((el, i) => (<input type="text" key={i} value={el} maxLength={1} onChange={(e) => handlerChange(e, i)} />))}
            </div>


        </div>
    )
}

export default Arinc;