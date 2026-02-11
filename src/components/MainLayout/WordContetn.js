import { useContext } from "react"
import { ConverterContext } from "../Service/ConverterProvider"

    function WordContent() {
        const {wordOutput} = useContext(ConverterContext)
        return <>
            {wordOutput && (<div>
                <h2>Word-Inhalt erkannt:</h2>
                <textarea className='wordContent'
                    value={wordOutput}
                    readOnly
                >

                </textarea>

            </div>)
            }
        </>
    }

    export default WordContent