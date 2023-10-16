import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContNr, setRegExp } from "../../../redux/slice/dbSlice";
import { arincLayout } from "../../../constants/arincLayout";
import "./style.scss";

function ContNr() {
    let dispatch = useDispatch();
    let { layout, contNr, regExp } = useSelector(state => state.db);
    let [style, setStyle] = useState(Array(arincLayout[layout].contNr.length + 1).fill(""));

    function handlerClick(i, n) {
        dispatch(setContNr(i))

        // Для 132 инпутов форимруется и диспачится новый шаблон, включающий contNr
        let l = arincLayout[layout].contNr[contNr].layout;
        let arr = regExp.split("").map(el => el === "." ? "" : el);
        let flexArr = l.map(el => +el.name.match(/\(\d+\)/gi).join("").match(/\d/gi).join(""));
        let contNrIndexInLayout = l.findIndex(el => el.name.includes("Continuation Record No") || el.name.includes("Continuation Number") || el.name.includes("Continuation Record Number"));
        let contNrPositionInInputs = flexArr.reduce((acc, el, i, arr) => i < contNrIndexInLayout ? acc + el : acc, 0);
        arr.splice(contNrPositionInInputs, 1, i + n);
        let newArr = [...arr].map(el => (el === "") || (el === " ") ? "." : el).join("");

        // Стили для CONT NR
        let newStyle = style.map((_, j) => j === i + n ? "selected" : "");
        setStyle(newStyle);

        dispatch(setRegExp(newArr));
    }

    // Массив шаблонов
    let contNrArr = arincLayout[layout].contNr;

    return (<div className="ContNr">
        <div className="layout-title">{arincLayout[layout].contNr[contNr].title}</div>
        <div className="layout-cont-number">
            CONT NR:
            {<span onClick={() => handlerClick(0, 0)} className={style[0]}>0</span>}
            {contNrArr.map((el, i) => (<span key={i} onClick={() => handlerClick(i, 1)} className={style[i + 1]}>{i + 1}</span>))}
        </div>
        <div></div>
    </div >)
}

export default ContNr;