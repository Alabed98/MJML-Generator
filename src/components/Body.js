
import { useState } from 'react';
import './Body.css';
import {HandleFileUpload, APIReq} from './fileUtils.js';



function Body() {
//const [error, setError] = useState('');
const [fileName, setFileName] =useState('');
const [wordOutput, setWordOutput] = useState('');
const [mjmlOutput, setMjmlOutput] = useState('');
const [btnText,setBtnText] = useState(<><i className={"fa-solid fa-arrows-rotate fa-xl"}></i> Word zu MJML konvertieren</>)
const [showAlert, setShowAlert] =useState(false);
const [selectedTemplate, setSelectedTemplate]=useState('Advance')

    function Header() {
        return <>

            <div style={{display:'flex', borderBottom:'1px solid #e0e4e9', marginBottom:20}}>
                <div style={{margin:'0 10px'}}>
                    <button className={'btn'}><i className={"fa-solid fa-house"}></i> Konverter</button>
                </div>
                <div style={{margin:'0 10px'}}>
                    <button className={'btn btnEdit'}><i className={"fa-solid fa-gear"}></i> Prompt-Einstellungen</button>
                </div>
            </div>

            <div className={'header'}>
                <div>
                    <i className={"fa-solid fa-file-word blue fa-2xl"}></i>
                </div>
                <div>
                    <h1 style={{ paddingLeft: '10px', margin: '8px 0' }}><span >Word zu MJML Konverter</span></h1>
                </div>
            </div>
            <p style={{ margin: '0', fontSize: '19px' }}>Laden Sie Ihre Word-Datei hoch und konvertieren Sie sie automatisch in ein MJML Email-Template</p>
        </>
    }

    function UploadArea() {
        const [recievedLink, setRecievedLink] = useState('');

        return <>
            <label htmlFor='inputFile'>
            <input id="inputFile" type='file' name='inputFile' style={{display:'none'}} onChange={(event) => handleOnChange(event)}/>
            <div className={'uploadArea'} onDrop={(e)=>dropHandler(e)} onDragOver={(e) => dragoverHandler(e)}>
                    <div style={{ textAlign: 'center' }}>
                        <i className={"fa-solid fa-arrow-up-from-bracket blue"} style={{ fontSize: '40px' }}></i>
                        <div>
                            <p style={{ marginBottom: '0' }}><b>Klicken zum Hochladen</b> oder Drag & Drop </p>
                            <p style={{ margin: '10px 0' }}>Word-Datei (.docx)</p>
                            {fileName && <p><i className={"fa-solid fa-circle-check fa-lg blue"}/> {fileName}</p>}
                        </div>
                    </div>
                </div>
            </label>

        <div className={'options'}>
                <input value={recievedLink} className={'inputLink'} type='text' placeholder='Link einfügen' onChange={(e) =>  setRecievedLink(e.target.value)}></input>
                                
                <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
                    <option value={'Investor'}>Investor</option>
                    <option value={'Gevestor'}>Gevestor</option>
                    <option value={'maxLQ'}>maxLQ</option>
                    <option value={'Webinar Inv'}>Webinar Inv</option>
                    <option value={'Webinar Gev'}>Webinar Gev</option>
                    <option value={'Advance'}>Advance</option>
                    <option value={'Greek'}>Greek</option>
                </select>
            
            </div>

            <button className={'btn'} style={{padding:'15px 10px',borderRadius:'5px'}} onClick={() => ConvertWordToMjml(wordOutput, recievedLink)}>
                {btnText}
            </button>
        </>
    }

    function RulesArea() {
        return <>
            <div className={'rules'}>
                <p style={{ fontSize: '20px', fontWeight: '600', color: '#1e3a8a' }}>Befolgte Regeln:</p>
                <ul className={'fa-ul'}>
                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Keine DIVs - nur MJML-Komponenten</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Nur Inline-CSS</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Keine externen Ressourcen</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Bilder als Platzhalter ([PLATZHALTER_BILD_X])</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Überschriften als &lt;P&gt;  mit font-size (H1=21px, H2=19px, H3=17px)</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Alle &lt;P&gt; Tags mit margin:15px 0;</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Platzhalter in &#123; &#125; werden NICHT ersetzt</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>&lt;mj-include path="../css-1.mjml" /&gt; im Header</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Verwendung unserer MJML-Templates</li>

                    <li><i className={"fa-solid fa-circle-check fa-li fa-lg"}></i>Farben aus Word-Datei extrahiert</li>
                </ul>
            </div>
        </>
    }

    function KIResult(){
        return <>
        {mjmlOutput && ( 
            <>  
                <div className={'resHeader'}>
                    <div>
                        <h2>Generierter MJML Code:</h2>
                    </div>

                    <div style={{display:'flex',justifyContent:'end'}}>
                        <button className={'btnCopy'} onClick={MJMLKopieren}>MJML kopieren</button> 
                    </div>
                </div>
                <textarea 
                value={mjmlOutput}
                onChange={(e)=> e.target.value} 
                />
            </>)}
           
        </>
    }

    function Alert(){
        return <>
        {showAlert && (        
            <div className={'alert'} id='alert'>
                <div style={{position:'relative'}}>MJML kopiert</div>
            </div>
        )} 
        </>
    }

    async function handleOnChange(event){
        setSelectedTemplate('Advance')

        const wordFile = await HandleFileUpload(event);
        
        if(wordFile.error){
            //setError(wordFile.error)
        }
        else{
            setFileName(wordFile.fileName)
            setWordOutput(wordFile.fileContent)
            setBtnText(<><i className={"fa-solid fa-arrows-rotate fa-xl"}></i> Word zu MJML konvertieren</>)
            setMjmlOutput('')

        }
    }

    function WordContent(){
        return <>
            {wordOutput && (<div>
                <h1>Word-Inhalt erkannt:</h1>
                <textarea className='wordContent' 
                value={wordOutput}
                readOnly
                >

                </textarea>

            </div>)
    }
        </>
    }

    async function ConvertWordToMjml(content, recievedLink){
        setBtnText(<><i className={"fa-solid fa-arrows-rotate fa-spin"}></i> Konvertiere...</>)
        setMjmlOutput(await APIReq(content, selectedTemplate, recievedLink))
        setBtnText(<><i className={"fa-regular fa-circle-check fa-xl"}></i> MJML fertig</>)
    }

    function MJMLKopieren(){
        navigator.clipboard.writeText(mjmlOutput);
        setShowAlert(true)
        setTimeout(() => {
            setShowAlert(false)
        }, 1000);
    }

    function dragoverHandler(event){
        event.preventDefault();
    }

    async function dropHandler(event){
        event.preventDefault();
        const wordFile = await HandleFileUpload(event, true)
        setFileName(wordFile.fileName);
        setWordOutput(wordFile.fileContent)
    }
    
    
    return <>
        <div className={'bodyCont'}>
            <div className={'container'}>
                <div >
                    <Header />
                    <UploadArea />
                    <WordContent />
                    <Alert />
                    <KIResult />
                    <RulesArea />
                </div>
            </div>
        </div>
    </>
}
export default Body;