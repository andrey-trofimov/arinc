import { useSelector } from "react-redux";
import { arincLayout } from "../../../constants/arincLayout";
import "./style.scss";

function Layout() {
    let { layout, contNr } = useSelector(state => state.db)
    let arr = [...Array(132).keys()];
    let l = arincLayout[layout].contNr[contNr].layout;

    // Массивы значений ячеек шаблона
    let flexArr = l.map(el => +el.name.match(/\(\d+\)/gi).join("").match(/\d/gi).join(""));
    let titleArr = l.map(el => el.name.match(/[a-z]|\s/gi).join(""));
    let referenceArr = l.map(el => el.reference);

    // Стили колонок
    let setStyle = (i) => {
        let verticallyStyle = flexArr[i] < 3 ? " vertically" : "";
        let blankStyle = l[i].reference === " " ? " blank" : "";
        return `title${verticallyStyle}${blankStyle}`
    }
    let styleArr = flexArr.map((_, i) => setStyle(i));

    // контроль количества колонок в шаблоне
    let columns = flexArr.reduce((acc, el, i, arr) => acc + el, 0)
    console.log(`Layout: колонок в шаблоне - ${columns}`)

    return (
        <div className="Layout">
            <div className="row">
                {referenceArr.map((el, i) => <div key={i} style={{ flex: flexArr[i] }} className={styleArr[i]}>{el}</div>)}
            </div>

            <div className="row">
                {arr.map((el, i) => (<div style={{ flex: 1, }} className={i % 5 === 0 ? "title" : ""} key={i}>{i % 5 === 0 ? i : ""}</div>))}
            </div>

            <div className="row">
                {titleArr.map((el, i) => <div key={i} style={{ flex: flexArr[i] }} className={styleArr[i]}>{el}</div>)}
            </div>
        </div>
    )
}

export default Layout;