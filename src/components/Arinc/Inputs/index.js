import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../../redux/slice/dbSlice";
import { setStartStr, setEndStr, } from "../../../redux/slice/paginationSlice";
import "./style.scss";

function Inputs() {
    let { regExp, partDbMask } = useSelector(state => state.db);
    let { strPerPage } = useSelector(state => state.pagination);
    let dispatch = useDispatch();

    // Заполнение инпутов при смене шаблона
    useEffect(() => {
        let testRe = RegExp(".{132}", "gi");
        let initArr = testRe.test(partDbMask) ? partDbMask : regExp;
        dispatch(setRegExp(initArr));
    }, [partDbMask]);

    // Массивы значений для инпутов и стилей инпутов
    let arr = regExp.split("").map(el => el === "." ? "" : el);
    let style = arr.map(el => el !== "" ? "input bg" : "input")

    function handlerChange(e, i) {
        let newArr = [...arr];
        newArr.splice(i, 1, String(e.target.value));
        newArr = newArr.map(el => el === "" ? "." : el).join("");

        dispatch(setRegExp(newArr));
        dispatch(setStartStr(0));
        dispatch(setEndStr(strPerPage));

        // console.log(newArr)
    }

    return (
        <div className="Inputs">
            {arr.map((el, i) => (<input className={style[i]} type="text" title={i + 1} key={i} value={el} maxLength={1} onChange={(e) => handlerChange(e, i)} />))}
        </div>
    )
}

export default Inputs;