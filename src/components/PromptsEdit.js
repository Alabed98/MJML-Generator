import './PromptsEdit.css';
import Prompt from './KIRules';
import Code_Snippets from './Code_Snippets';
import { useState } from 'react';


function PromptsEdit() {
    const MJML_Snippets = Code_Snippets()

    let prompt = Prompt();
    const [promptUpdated, setPromptUpdated] = useState(prompt)
    const [codeSnippets, setCodeSnippets] = useState(MJML_Snippets);

    const handleSnippetChange=(key, value) =>{
        let newSnippets = {...codeSnippets};
        newSnippets[key] = value;
        setCodeSnippets(newSnippets)
    }

    const updatePrompt= (p) =>{
           fetch('http://localhost:3000/api/prompt', 
            {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({prompt:p})
            }
        )
        .then(res => {if(res.ok) alert('Gespeichert')})
    }

    return <>
        <div>
            <h2 style={{ marginBottom: '0' }}>System-Prompt Einstellungen</h2>
            <p style={{ marginTop: '5px' }}>Hier kannst du den System-Prompt anpassen, der die KI-Konvertierung steuert.</p>
            <div>
                <EditBox 
                    promptUpdated={promptUpdated}
                    setPromptUpdated={setPromptUpdated}
                    handleSnippetChange={handleSnippetChange}
                    codeSnippets={codeSnippets}
                    updatePrompt={updatePrompt}
                />
            </div>
        </div>
    </>
}
function EditBox({promptUpdated, setPromptUpdated, handleSnippetChange, codeSnippets, updatePrompt}) {
    return (<>
        <div className={'editHeader'}>
            <div className={'editBox'}>
                <div>
                    <h4>System Prompt</h4>
                </div>
                <div>
                    <button className={'btn-green btn-grau'} style={{ marginRight: "10px" }}>Zurücksetzen</button>
                    <button className={'btn-green'} onClick={() => updatePrompt(promptUpdated)}><i className={"fa-regular fa-floppy-disk"}></i> Speichern</button>
                </div>
            </div>

            <textarea className={'textArea'} value={promptUpdated} onChange={(e)=>{setPromptUpdated(e.target.value)}} > </textarea>
        </div>
        <div className={'editHeader'}>
            <div className={'editBox'}>
                <div>
                    <h4>MJML-Code-Snippets</h4>
                </div>
                <div>
                    <button className={'btn-green btn-grau'} style={{ marginRight: "10px" }}>Zurücksetzen</button>
                    <button className={'btn-green'}><i className={"fa-regular fa-floppy-disk"}></i> Speichern</button>
                </div>
            </div>

            {Object.keys(codeSnippets).map((key)=>{
                return (<div key={key} style={{marginTop:'20px'}}>
                <label style={{fontWeight:'600'}}>{key}</label>
                <textarea  className={'textArea textAreaSnippet'} value={codeSnippets[key]} onChange={(e)=>{handleSnippetChange(key, e.target.value)}}> </textarea>
                </div>)
            })}
      
        </div>

    </>)
}


export default PromptsEdit;