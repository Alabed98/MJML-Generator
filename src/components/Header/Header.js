import './Header.css'

function Header() {
    return <>
        <div className={'header'}>
            <div>
                <i className={"fa-solid fa-file-word blue fa-2xl"}></i>
            </div>
            <div>
                <h1 style={{ paddingLeft: '10px', margin: '8px 0', fontSize: '25px' }}><span >Word zu MJML Konverter</span></h1>
            </div>
        </div>
        <p style={{ margin: '0', fontSize: '17px' }}>Laden Sie Ihre Word-Datei hoch und konvertieren Sie sie automatisch in ein MJML Email-Template</p>
    </>
}

export default Header;