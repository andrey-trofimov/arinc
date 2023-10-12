import Inputs from "./Inputs";
import Layout from "./Layout";
import ContNr from "./ContNr";
import "./style.scss"

function Arinc() {

    return (
        <div className="Arinc">
            <ContNr />
            <Layout />
            <Inputs />
        </div>
    )
}

export default Arinc;