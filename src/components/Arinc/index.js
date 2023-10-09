import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../redux/slice/dbSlice";
import { arincLayout } from "../../constants/arincLayout";
import ContNr from "./ContNr";
import "./style.scss";

function Arinc() {
    let { layout, regExp, contNr } = useSelector(state => state.db)
    let dispatch = useDispatch();

    function handlerChange(e, i) {
        let newArr = [...arr];
        newArr.splice(i, 1, String(e.target.value));
        newArr = newArr.map(el => (el === "") || (el === " ") ? "." : el).join("");
        dispatch(setRegExp(newArr));
    }

    let arr = regExp.split("").map(el => el === "." ? "" : el);

    let l = arincLayout[layout].contNr[contNr].layout;
    let flexArr = l.map(el => +el.name.match(/\d/gi).join(""));
    let titleArr = l.map(el => el.name.match(/[a-z]|\s/gi).join(""));
    let referenceArr = l.map(el => el.reference);
    // let styleArr = l.map((el) => el.textDirection === "vertically" ? "title vertically" : "title")
    let styleArr = flexArr.map((el) => el < 4 ? "title vertically" : "title")

    let totalNr = flexArr.reduce((acc, el, i, arr) => acc + el, 0)
    console.log(totalNr)

    return (
        <div className="Arinc">
            <div className="row">
                {l.map((el, i) => <div key={i} style={{ flex: flexArr[i] }} className={styleArr[i]}>{referenceArr[i]}</div>)}
            </div>

            <div className="row">
                {arr.map((el, i) => (<div style={{ flex: 1, }} className={i % 5 === 0 ? "title" : ""} key={i}>{i % 5 === 0 ? i : ""}</div>))}
            </div>

            <div className="row">
                {l.map((el, i) => <div key={i} style={{ flex: flexArr[i] }} className={styleArr[i]}>{titleArr[i]}</div>)}
            </div>

            <ContNr/> 

            <div className="row">
                {arr.map((el, i) => (<input className="input" type="text" key={i} value={el} maxLength={1} onChange={(e) => handlerChange(e, i)} />))}
            </div>
        </div>
    )
}

export default Arinc;