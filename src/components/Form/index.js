import {
  setAeroflotDb,
  setSzrcaiDb,
  setAeroflotPartDb,
  setSzrcaiPartDb,
  setPartDbMask,
  setLayout,
} from "../../redux/slice/dbSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "./InputFile";
import { re, headerSelect } from "../../constants/re";
import "./style.scss";

function Form() {
  let { szrcaiDb, aeroflotDb } = useSelector((state) => state.db);
  let dispatch = useDispatch();

  function choosePartDb(db, dispDb, reg) {
    if (db !== "") {
      let arr = [];
      arr = db.match(reg) || [];
      dispatch(dispDb(arr));
    }
  }

  function selectHandler(e) {
    let reg = RegExp(re[e.target.value], "gi");

    dispatch(setRegExp(re[e.target.value]));
    dispatch(setLayout(e.target.value));

    choosePartDb(szrcaiDb, setSzrcaiPartDb, reg);
    choosePartDb(aeroflotDb, setAeroflotPartDb, reg);
  }

  return (
    <div className="Form">
      <InputFile title="Файл для сверки" reducer={setAeroflotDb} id="sample" />
      <InputFile title="Файл для проверки" reducer={setSzrcaiDb} id="test" />

      <select onChange={selectHandler}>
        {headerSelect.map((el, i) => (
          <option value={el.value} key={i}>
            {el.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Form;
