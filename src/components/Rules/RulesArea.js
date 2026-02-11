 function RulesArea() {
        return <>
            <div className={'rules'}>
                <p style={{ fontSize: '17px', fontWeight: '600', color: '#1e3a8a' }}>Befolgte Regeln:</p>
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

    export default RulesArea