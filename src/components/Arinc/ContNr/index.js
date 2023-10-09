import { useDispatch, useSelector } from "react-redux";
import { setContNr } from "../../../redux/slice/dbSlice";
import { arincLayout } from "../../../constants/arincLayout";
import "./style.scss";

function ContNr() {
    let dispatch = useDispatch();
    let { layout, contNr } = useSelector(state => state.db);
    let contNrArr = arincLayout[layout].contNr;

    return (<div className="ContNr">
        <sapn>CONT NR: </sapn>
        {contNrArr.map((el, i) => (<div onClick={() => dispatch(setContNr(i))} className={i === contNr ? "selected" : ""}><span>{i}</span></div>))}
    </div>)
}

export default ContNr;