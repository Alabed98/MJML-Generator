import { useContext } from "react";
import { ConverterContext } from "../Service/ConverterProvider";
import { Api } from "../Service/Api";
import { HandleFileUpload } from "../FileUploader/HandleFileUpload";

export async function ConvertWordToMjml(content, recievedLink) {

    const [mjmlOutput, setMjmlOutput] = useContext(ConverterContext)
    const [btnText, setBtnText] = useContext(ConverterContext)
    const [selectedTemplate, setSelectedTemplate] = useContext(ConverterContext)


    setBtnText(<><i className={"fa-solid fa-arrows-rotate fa-spin"}></i> Konvertiere...</>)
    setMjmlOutput(await Api(content, selectedTemplate, recievedLink))
    setBtnText(<><i className={"fa-regular fa-circle-check fa-xl"}></i> MJML fertig</>)
}

export async function HandleOnChange(event) {

    const [fileName, setFileName] = useContext(ConverterContext)
    const [wordOutput, setWordOutput] = useContext(ConverterContext)
    const [htmlOutput, setHtmlOutput] = useContext(ConverterContext)
    const [mjmlOutput, setMjmlOutput] = useContext(ConverterContext)
    const [btnText, setBtnText] = useContext(ConverterContext)
    const [selectedTemplate, setSelectedTemplate] = useContext(ConverterContext)

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
