import { createContext } from "react";
import { useState } from "react";
export const ConverterContext = createContext();

export function ConverterProvider({ children }) {

    const [fileName, setFileName] = useState('');
    const [wordOutput, setWordOutput] = useState('');
    const [htmlOutput, setHtmlOutput] = useState('');
    const [mjmlOutput, setMjmlOutput] = useState('');
    const [btnText, setBtnText] = useState(<><i className={"fa-solid fa-arrows-rotate fa-xl"}></i> Word zu MJML konvertieren</>)
    const [showAlert, setShowAlert] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState('Advance')
    const [systemPrompt, setSystemPrompt] = useState('')
    const [recievedLink, setRecievedLink] = useState('')

    const value = {
        fileName, setFileName,
        wordOutput, setWordOutput,
        htmlOutput, setHtmlOutput,
        mjmlOutput, setMjmlOutput,
        btnText, setBtnText,
        showAlert, setShowAlert,
        selectedTemplate, setSelectedTemplate,
        systemPrompt, setSystemPrompt,
        recievedLink, setRecievedLink
    }

    return <ConverterContext.Provider value={value}>
        {children}
    </ConverterContext.Provider>
}