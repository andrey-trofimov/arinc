import { useDispatch, useSelector } from "react-redux";
import { setRegExp } from "../../redux/slice/dbSlice";
import "./style.scss";

function Arinc() {
    let { layout, regExp } = useSelector(state => state.db)
    let style = `layout ${layout}`;
    let dispatch = useDispatch();

    function handler(e) {
        let reg = e.target.value;
        dispatch(setRegExp(reg))
    }

    
    return (
        <div className="Arinc">
            <input tipe="text" value={regExp} onChange={handler} maxLength={132}></input>
            <div className={style}></div>
        </div>
    )
}

export default Arinc;