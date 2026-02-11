import { useContext } from "react";
import { ConverterContext } from "../Service/ConverterProvider";

function KiResult() {
    const { mjmlOutput, setShowAlert } = useContext(ConverterContext);
    const MJMLKopieren = () => {
        navigator.clipboard.writeText(mjmlOutput);
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 1000);
    }
    return <>
        {mjmlOutput && (
            <>
                <div className={'resHeader'}>
                    <div>
                        <h2>Generierter MJML Code:</h2>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <button className={'btnCopy'} onClick={() => MJMLKopieren(mjmlOutput, setShowAlert)}>MJML kopieren</button>
                    </div>
                </div>
                <textarea
                    value={mjmlOutput}
                    onChange={(e) => e.target.value}
                />
            </>)}

    </>
}



export default KiResult;