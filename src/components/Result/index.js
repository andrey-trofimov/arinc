import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function Result() {
    let { szrcaiPartDb, aeroflotPartDb, regExp, } = useSelector((state) => state.db);
    let reg = RegExp(regExp, "gi");

    let [arrTotal, setArrTotal] = useState([]);

    function sortSubDb(db){
        let arr = [];
        if (db !== "") {
            arr = db.match(reg) || [];
            arr = arr.length ? arr.map(el => el.split("")) : [];
        }

        console.log(arr)
        return arr;
    }

    useEffect(() => {        
        let arrSample = sortSubDb(aeroflotPartDb);
        let arrTest = sortSubDb(szrcaiPartDb);
        
        let arr = [];
        if (arrSample.length || arrTest.length) {
            let max = arrSample.length >= arrTest.length ? arrSample.length : arrTest.length;
            for (let i = 0; i < max; i++) {
                arr = (arrSample[i] && [...arr, {row: arrSample[i], style: "sample"}]) || [...arr];
                arr = (arrTest[i] && [...arr, {row: arrTest[i], style: "test"}]) || [...arr];
            }
        }
        setArrTotal(arr);
    }, [aeroflotPartDb, szrcaiPartDb, regExp])

    return (
        <div className="Result">
            {arrTotal.slice(0,100).map((el, i) => (<div className={`row ${el.style}`} key={i}>{el.row.map((e, i) => (<div key={i}>{e}</div>))}</div>))}
        </div>
    )
}

export default Result;