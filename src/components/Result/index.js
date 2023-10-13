import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTotalStr } from "../../redux/slice/paginationSlice";
import "./style.scss";

function Result() {
    let { szrcaiPartDb, aeroflotPartDb, regExp, } = useSelector((state) => state.db);
    let {startStr, endStr} = useSelector(state => state.pagination);
    let reg = RegExp(regExp, "i");
    
    let dispatch = useDispatch();
    let [arrTotal, setArrTotal] = useState([]);

    function sortSubDb(db) {
        let arr = [];
        if (db.length) {
            arr = db.filter(el => reg.test(el)) || [];
            arr = arr.length ? arr.map(el => el.split("")) : [];
        }
        return arr;
    }

    useEffect(() => {
        let arrSample = sortSubDb(aeroflotPartDb);
        let arrTest = sortSubDb(szrcaiPartDb);

        let arr = [];
        if (arrSample.length || arrTest.length) {
            let max = arrSample.length >= arrTest.length ? arrSample.length : arrTest.length;
            for (let i = 0; i < max; i++) {
                arr = (arrSample[i] && [...arr, { row: arrSample[i], style: "sample" }]) || [...arr];
                arr = (arrTest[i] && [...arr, { row: arrTest[i], style: "test" }]) || [...arr];
            }
        }

        setArrTotal(arr)
        dispatch(setTotalStr(arr.length));
    }, [szrcaiPartDb, aeroflotPartDb, regExp])

    return (
        <div className="Result">
            {arrTotal.slice(startStr, endStr).map((el, i) => (<div className={`row ${el.style}`} key={i}>{el.row.map((e, i) => (<div key={i}>{e}</div>))}</div>))}
        </div>
    )
}

export default Result;