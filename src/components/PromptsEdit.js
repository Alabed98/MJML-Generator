import './PromptsEdit.css';
import Prompt from './KIRules';
import Code_Snippets from './Code_Snippets';

function PromptsEdit() {
    return <>
        <div>
            <h2 style={{ marginBottom: '0' }}>System-Prompt Einstellungen</h2>
            <p style={{ marginTop: '5px' }}>Hier kannst du den System-Prompt anpassen, der die KI-Konvertierung steuert.</p>
            <div>
                <EditBox />
            </div>
        </div>
    </>
}
function EditBox() {
    const prompt = Prompt()
    const MJML_Snippets = Code_Snippets()
    const array = Object.entries(MJML_Snippets)
    console.log(array)
    return (<>
        <div className={'editHeader'}>
            <div className='editBox'>
                <div>
                    <h4>System Prompt</h4>
                </div>
                <div>
                    <button className={'btn-green btn-grau'} style={{ marginRight: "10px" }}>Zurücksetzen</button>
                    <button className={'btn-green'}><i class="fa-regular fa-floppy-disk"></i> Speichern</button>
                </div>
            </div>

            <textarea className='textArea' value={prompt}> </textarea>
        </div>
        <div className={'editHeader'}>
            <div className='editBox'>
                <div>
                    <h4>MJML-Code-Snippets</h4>
                </div>
                <div>
                    <button className={'btn-green btn-grau'} style={{ marginRight: "10px" }}>Zurücksetzen</button>
                    <button className={'btn-green'}><i class="fa-regular fa-floppy-disk"></i> Speichern</button>
                </div>
            </div>

            {Object.keys(MJML_Snippets).map((key)=>{
                return <textarea className='textArea textAreaSnippet' value={key + ':\n\n' +MJML_Snippets[key]}> </textarea>
            })}
      
        </div>
    </>)
}
export default PromptsEdit;