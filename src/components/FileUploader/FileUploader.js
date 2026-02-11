
import { useContext } from 'react';
import { HandleFileUpload } from './HandleFileUpload';
import { ConverterContext } from '../Service/ConverterProvider';
import Api from '../Service/Api'

function FileUploader() {
    const {fileName, setFileName, setWordOutput,htmlOutput, setHtmlOutput,selectedTemplate, setSelectedTemplate,setMjmlOutput,recievedLink, setRecievedLink, setBtnText, btnText, setSystemPrompt, systemPrompt} = useContext(ConverterContext)
    
    const dragoverHandler = (event) => event.preventDefault();

    const dropHandler = async (event) => {
        event.preventDefault()
        const wordFile = await HandleFileUpload(event, true)
        setFileName(wordFile.fileName);
        setWordOutput(wordFile.fileContentASWord)
        setHtmlOutput(wordFile.fileContentASHTML)
    }

    const HandleOnChange= async(event)=> {

        setSelectedTemplate('Advance')
        const wordFile = await HandleFileUpload(event);
        
        if (wordFile.error) {
            //setError(wordFile.error)
        }
        else {
            setFileName(wordFile.fileName)
            setWordOutput(wordFile.fileContentASWord)
            setHtmlOutput(wordFile.fileContentASHTML)
            setBtnText(<><i className={"fa-solid fa-arrows-rotate fa-xl"}></i> Word zu MJML konvertieren</>)
            setMjmlOutput('')
        }
    }

    const ConvertWordToMjml = async(content, recievedLink)=> {
        setBtnText(<><i className={"fa-solid fa-arrows-rotate fa-spin"}></i> Konvertiere...</>)
        setMjmlOutput(await Api(content, selectedTemplate, recievedLink, setSystemPrompt, systemPrompt))
        setBtnText(<><i className={"fa-regular fa-circle-check fa-xl"}></i> MJML fertig</>)
    }


    return <>
        <label htmlFor='inputFile'>
            <input id="inputFile" type='file' name='inputFile' style={{ display: 'none' }} onChange={(event) => HandleOnChange(event)} />
            <div className={'uploadArea'} onDrop={(e) => dropHandler(e)} onDragOver={(e) => dragoverHandler(e)}>
                <div style={{ textAlign: 'center' }}>
                    <i className={"fa-solid fa-arrow-up-from-bracket blue"} style={{ fontSize: '30px' }}></i>
                    <div>
                        <p style={{ marginBottom: '0' }}><b>Klicken zum Hochladen</b> oder Drag & Drop </p>
                        <p style={{ margin: '10px 0' }}>Word-Datei (.docx)</p>
                        {fileName && <p><i className={"fa-solid fa-circle-check fa-lg blue"} /> {fileName}</p>}
                    </div>
                </div>
            </div>
        </label>

        <div className={'options'}>
            <input value={recievedLink} className={'inputLink'} type='text' placeholder='Link einfügen' onChange={(e) => setRecievedLink(e.target.value)}></input>

            <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                <option value={'Investor'}>Investor</option>
                <option value={'Gevestor'}>Gevestor</option>
                <option value={'Advance'}>Advance</option>
                <option value={'maxLQ'}>maxLQ</option>
                <option value={'maxLQ_Magdalena'}>maxLQ Magdalena</option>
                <option value={'Investor_Webinar'}>Webinar Inv</option>
                <option value={'Gevestor_Webinar'}>Webinar GeV</option>

                <option value={'Reminder_Reg_Inv'}>Reminder u. Reg Inv</option>
                <option value={'Reminder_Reg_GeV'}>Reminder u. Reg GeV</option>
                <option value={'Nachfass_Inv'}>Nachfass Inv</option>
                <option value={'Nachfass_GeV'}>Nachfass GeV</option>
                <option value={'HU_Mailings'}>HU Mailings</option>
                <option value={'Abo_laufend_Inv'}>Abo laufend Inv</option>
                <option value={'Abo_laufen_GeV'}>Abo laufen GeV</option>

            </select>

        </div>

        <button className={'btn'} style={{ padding: '15px 10px', borderRadius: '5px', marginTop:'15px' }} onClick={() => ConvertWordToMjml(htmlOutput, recievedLink)}>
            {btnText}
        </button>
    </>
}

export default FileUploader;