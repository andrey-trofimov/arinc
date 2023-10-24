import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../../redux/slice/dbSlice";
import { setStartStr, setEndStr, } from "../../../redux/slice/paginationSlice";
import "./style.scss";

function Inputs() {
    let backspaceFlag = false;
    let { regExp, partDbMask } = useSelector(state => state.db);
    let { strPerPage } = useSelector(state => state.pagination);
    let dispatch = useDispatch();
    let inpRef = useRef([]);

    // Заполнение инпутов при смене шаблона
    useEffect(() => {
        let testRe = RegExp(".{132}", "gi");
        let initArr = testRe.test(partDbMask) ? partDbMask : regExp;
        dispatch(setRegExp(initArr));
    }, [partDbMask]);

    // Массивы значений для инпутов и стилей инпутов
    let arr = regExp.split("").map(el => el === "." ? "" : el);
    let style = arr.map(el => el !== "" ? "input bg" : "input")

    function focusSelect(i) {
        inpRef.current[i].focus();
        inpRef.current[i].select();
    }

    function handlerChange(e, i) {
        let newArr = [...arr];
        newArr.splice(i, 1, String(e.target.value));
        newArr = newArr.map(el => el === "" ? "." : el).join("");

        dispatch(setRegExp(newArr));
        dispatch(setStartStr(0));
        dispatch(setEndStr(strPerPage));

        let j = (e.target.value === "") && (backspaceFlag === true) ? i - 1 : i + 1;
        focusSelect(j);
    }

    function handlerKeyDown(e, i) {
        backspaceFlag = e.code === "Backspace" ? true : false;
        if (e.code === "ArrowLeft") (focusSelect(i - 1));
        if (e.code === "ArrowRight") (focusSelect(i + 1));
    }

    return (
        <div className="Inputs">
            {arr.map((el, i) => (
                <input
                    ref={e => inpRef.current[i] = e}
                    className={style[i]}
                    type="text"
                    title={i + 1}
                    key={i}
                    value={el}
                    maxLength={1}
                    onChange={e => handlerChange(e, i)}
                    onKeyDown={e => handlerKeyDown(e, i)}
                />
            ))}
        </div>
    )
}

export default Inputs;