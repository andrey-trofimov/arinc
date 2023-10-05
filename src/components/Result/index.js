import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

function Result() {
    let { szrcaiPartDb, aeroflotPartDb, regExp, } = useSelector((state) => state.db);
    let reg = RegExp(regExp, "i");

    let [arrSample, setArrSample] = useState([]);
    let [arrTest, setArrTest] = useState([]);
    let [arrTotal, setArrTotal] = useState([]);

    useEffect(() => {
        let arr = [];
        if (aeroflotPartDb.length) {
            arr = aeroflotPartDb.filter(el => reg.test(el));
            arr = arr.length ? arr.map(el => el.split("")) : [];
        }
        setArrSample(arr);
    }, [aeroflotPartDb, regExp])

    useEffect(() => {
        let arr = [];
        if (szrcaiPartDb.length) {
            arr = szrcaiPartDb.filter(el => reg.test(el));
            arr = arr.length ? arr.map(el => el.split("")) : [];
        }
        setArrTest(arr);
    }, [szrcaiPartDb, regExp])

    useEffect(() => {
        let arr = [];
        if (arrSample.length && arrTest.length) {
            let max = arrSample.length >= arrTest.length ? arrSample.length : arrTest.length;
            for (let i = 0; i < max; i++) {
                arr = (arrSample[i] && [...arr, arrSample[i]]) || [...arr];
                arr = (arrTest[i] && [...arr, arrTest[i]]) || [...arr];
            }
        }
        setArrTotal(arr)
    }, [arrSample, arrTest])

    return (
        <div className="Result">
            {arrTotal.slice(0,100).map((el, i) => (<div className="row" key={i}>{el.map((e, i) => (<div key={i}>{e}</div>))}</div>))}
        </div>
    )
}

export default Result;