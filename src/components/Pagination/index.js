import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setStartStr, setEndStr } from "../../redux/slice/paginationSlice";
import "./style.scss"


function Pagination() {
    let arrowLeft = "<";
    let arrowRight = ">";

    let { totalStr, startStr, endStr, strPerPage } = useSelector(state => state.pagination)
    let dispatch = useDispatch();

    let showNext = () => {
        let newStartStr = (startStr + strPerPage > totalStr) || (startStr + strPerPage > endStr) ? startStr : startStr + strPerPage;
        let newEndStr = newStartStr + strPerPage > totalStr ? totalStr : newStartStr + strPerPage;

        dispatch(setStartStr(newStartStr));
        dispatch(setEndStr(newEndStr));
    }

    let showPrevious = () => {
        let newStartStr = startStr - strPerPage < 0 ? 0 : startStr - strPerPage;
        let newEndStr = newStartStr + strPerPage;

        dispatch(setStartStr(newStartStr));
        dispatch(setEndStr(newEndStr));
    }

    return (<div className="Pagination">
        Найдено: {totalStr}
        {Boolean(totalStr) &&
            <>
                <span className="info">Показано с {startStr + 1} по {endStr > totalStr ? totalStr : endStr}</span>
                <button onClick={showPrevious}>{arrowLeft}</button>
                <button onClick={showNext}>{arrowRight}</button>
            </>}
    </div>)
}

export default Pagination;