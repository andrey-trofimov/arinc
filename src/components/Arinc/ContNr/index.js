import { useDispatch, useSelector } from "react-redux";
import { setContNr, setRegExp } from "../../../redux/slice/dbSlice";
import { arincLayout } from "../../../constants/arincLayout";
import "./style.scss";

function ContNr() {
    let dispatch = useDispatch();
    let { layout, contNr, regExp } = useSelector(state => state.db);

    function handlerClick(i) {
        dispatch(setContNr(i))

        // Для 132 инпутов форимруется и диспачится новый шаблон, включающий contNr
        let l = arincLayout[layout].contNr[contNr].layout;
        let arr = regExp.split("").map(el => el === "." ? "" : el);
        let flexArr = l.map(el => +el.name.match(/\d/gi).join(""));
        let contNrIndexInLayout = l.findIndex(el => el.name.includes("Continuation Record No") || el.name.includes("Continuation Number") || el.name.includes("Continuation Record Number"));
        let contNrPositionInInputs = flexArr.reduce((acc, el, i, arr) => i < contNrIndexInLayout ? acc + el : acc, 0);
        arr.splice(contNrPositionInInputs, 1, i)
        let newArr = [...arr].map(el => (el === "") || (el === " ") ? "." : el).join("");

        dispatch(setRegExp(newArr));
    }

    // Массив шаблонов
    let contNrArr = arincLayout[layout].contNr;

    return (<div className="ContNr">
        CONT NR:
        {contNrArr.map((el, i) => (<div key={i} onClick={() => handlerClick(i)} className={i === contNr ? "selected" : ""}>{i}</div>))}
    </div>)
}

export default ContNr;