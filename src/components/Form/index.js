import { setAeroflotDb, setSzrcaiDb, setAeroflotPartDb, setSzrcaiPartDb, setPartDbMask, setLayout, setContNr, setRegExp } from "../../redux/slice/dbSlice";
import { useDispatch, useSelector } from "react-redux";
import InputFile from "./InputFile";
import { arincLayout } from "../../constants/arincLayout";
import "./style.scss";

function Form() {
  let { szrcaiDb, aeroflotDb } = useSelector((state) => state.db);
  let dispatch = useDispatch();
  let defaultRegExp = [...Array(132).fill(".")].join("");

  function choosePartDb(db, dispDb, reg) {
    if (db !== "") {
      let arr = [];
      arr = db.match(reg) || [];
      dispatch(dispDb(arr));

      console.log(reg, arr)
    }
  }

  function selectHandler(e) {
    let ssCode = e.target.value;
    let reg = RegExp(arincLayout[ssCode].re, "gi");

    dispatch(setPartDbMask(arincLayout[ssCode].re));
    dispatch(setLayout(ssCode));
    dispatch(setContNr(0));
    dispatch(setRegExp(defaultRegExp))

    choosePartDb(szrcaiDb, setSzrcaiPartDb, reg);
    choosePartDb(aeroflotDb, setAeroflotPartDb, reg);
  }

  return (
    <div className="Form">
      <InputFile title="Файл для сверки" reducer={setAeroflotDb} id="sample" />
      <InputFile title="Файл для проверки" reducer={setSzrcaiDb} id="test" />

      <select onChange={selectHandler}>
        {Object.keys(arincLayout).map((el, i) => (
          <option value={el} key={i}>
            {arincLayout[el].title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Form; 
