import { setAeroflotDb, setSzrcaiDb, setAeroflotPartDb, setSzrcaiPartDb, setRegExp, setLayout } from "../../redux/slice/dbSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "./InputFile";
import "./style.scss"

function Form() {
    let re = {
        ep: "....ep..............................................................................................................................",
        ea: "....ea..............................................................................................................................",
        pc: "....pc..............................................................................................................................",
        db: "....db..............................................................................................................................",
        pn: "....pn.............................................................................................................................."
    };

    let { szrcaiDb, aeroflotDb, } = useSelector(state => state.db);

    let dispatch = useDispatch();

    function selectHandler(e) {
        let reg = RegExp(re[e.target.value], "gi");
        dispatch(setRegExp(re[e.target.value]));
        dispatch(setLayout(e.target.value));

        if (szrcaiDb !== "") {
            let arr = [];
            arr = szrcaiDb.match(reg) || [];
            dispatch(setSzrcaiPartDb(arr));
        }

        if (aeroflotDb !== "") {
            let arr = [];
            arr = aeroflotDb.match(reg) || [];
            dispatch(setAeroflotPartDb(arr));
        }
    }

    return (<div className="Form">
        <InputFile title="Файл для сверки" reducer={setAeroflotDb} id="sample" />
        <InputFile title="Файл для проверки" reducer={setSzrcaiDb} id="test" />

        <select onChange={selectHandler}>
            <option value="ep">Holding pattern (EP)</option>
            <option value="ea">Waypoint (EA)</option>
            <option value="pc">Waypoint (PC)</option>
            <option value="db">NDB navaid (DB)</option>
            <option value="pn">NDB navaid (PN)</option>
        </select>
    </div>)
}

export default Form;