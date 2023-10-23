import { useEffect, useRef } from "react";
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
        
        // inpRef.current[i + 1].focus();
        // inpRef.current[i + 1].select();
    }

    // function moveFocus(e,i) {
    //     let j = e.code === "Backspace" ? i - 1 : i + 1;

        

    //     console.log(e.code)
    // }

    let inpRef = useRef([]);

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
                    // onKeyDown={e => moveFocus(e, i)}
                />
            ))}
        </div>
    )
}

export default Inputs;