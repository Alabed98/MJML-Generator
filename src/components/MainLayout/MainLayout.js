

import Header from '../Header/Header.js'
import RulesArea from '../Rules/RulesArea.js';
import FileUploader from '../FileUploader/FileUploader.js';
import { ConverterProvider } from '../Service/ConverterProvider.js';

import './MainLayout.css'
import WordContent from './WordContetn.js';
import KiResult from './KiResult.js';
function MainLayout() {

    return (

        <div className={'bodyCont'}>
            <div className={'container'}>
                <div >
                    <Header />
                    <ConverterProvider>
                        <FileUploader />
                        <WordContent />
                        <KiResult />

                    </ConverterProvider>
                    <RulesArea />
                </div>
            </div>
        </div>



    )
}

export default MainLayout;