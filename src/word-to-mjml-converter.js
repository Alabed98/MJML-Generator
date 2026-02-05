import React, { useState } from 'react';
import { Upload, FileText, Download, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import * as mammoth from 'mammoth';

const WordToMJMLConverter = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mjmlOutput, setMjmlOutput] = useState('');
  const [wordContent, setWordContent] = useState('');

  const MJML_TEMPLATES = {
    bulletList: `<table style="border-collapse: separate; border-spacing: 0 10px;">
    <tbody>
    <tr>
        <td valign="top" style="padding-bottom:3px;padding-top:3px; padding-right:5px;">
            <img src="https://static.fid-images.de/maxLQ/lp/bilder/haeckchen-black2.png" width="17" height="auto" alt="✓">
        </td>
        <td valign="top" style="padding-bottom:3px;">
          <p style="margin:0;"> {CONTENT} </p>
        </td>
    </tr>
    </tbody>
</table>`,
    
    twoColumns: `</mj-text>
</mj-column>
</mj-section> 
<mj-section background-color="white" padding-top="0" padding-bottom="0">
 <mj-column width="65%" vertical-align="middle">
<mj-text padding-top="0" padding-bottom="0">
{TEXT_CONTENT}
</mj-text>
</mj-column>
 <mj-column width="35%" vertical-align="middle">
 <mj-image src="[PLATZHALTER_BILD]" href="##" width="160px" alt="Bild"/>
<mj-text padding-top="0" padding-bottom="0">`,

    image: `</mj-text>
<mj-image src="[PLATZHALTER_BILD]" href="##" alt="Bild"/>
<mj-text padding-top="0" padding-bottom="0">`,

    button: `</mj-text>
<mj-button color="white" background-color="#bb1111" border="black" href="##" font-family="Helvetica"><b style="font-size:20px;line-height:1.5">{BUTTON_TEXT}</b></mj-button>
<mj-text padding-top="0" padding-bottom="0">`
  };

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    if (!uploadedFile.name.endsWith('.docx')) {
      setError('Bitte laden Sie eine .docx Datei hoch');
      return;
    }

    setFile(uploadedFile);
    setError('');
    setMjmlOutput('');

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setWordContent(result.value);
    } catch (err) {
      setError('Fehler beim Lesen der Word-Datei');
      console.error(err);
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const convertToMJML = async () => {
    if (!wordContent) {
      setError('Bitte laden Sie zuerst eine Word-Datei hoch');
      return;
    }

    setLoading(true);
    setError('');

    const systemPrompt = `Du bist ein Experte für die Konvertierung von Word-Dokumenten in MJML Email-Templates.

STRIKTE REGELN - DIESE MÜSSEN IMMER BEFOLGT WERDEN:
1. **KEINE DIVs verwenden** - niemals <div> Tags
2. **Nur MJML-Code generieren** - kein reines HTML
3. **Nur Inline-CSS** verwenden
4. **Keine externen Ressourcen** - außer den vorgegebenen Bild-URLs
5. **Platzhalter für Bilder**: [PLATZHALTER_BILD_1], [PLATZHALTER_BILD_2], etc.
6. **ÜBERSCHRIFTEN als <p> Tags mit font-size**:
   - H1 = <p style="margin:15px 0; font-size:21px;"><strong>Text</strong></p>
   - H2 = <p style="margin:15px 0; font-size:19px;"><strong>Text</strong></p>
   - H3 = <p style="margin:15px 0; font-size:17px;"><strong>Text</strong></p>
7. **Alle <p> Tags haben IMMER: margin:15px 0;**
8. **NIEMALS Platzhalter ersetzen** - Platzhalter stehen immer in geschweiften Klammern {} und müssen EXAKT so übernommen werden

VERFÜGBARE MJML-TEMPLATES:

**Für Bullet-Listen (schwarze Häkchen):**
\`\`\`
${MJML_TEMPLATES.bulletList}
\`\`\`

**Für Text und Bild nebeneinander:**
\`\`\`
${MJML_TEMPLATES.twoColumns}
\`\`\`

**Für einzelne Bilder:**
\`\`\`
${MJML_TEMPLATES.image}
\`\`\`

**Für Buttons:**
\`\`\`
${MJML_TEMPLATES.button}
\`\`\`

GRUNDSTRUKTUR (IMMER verwenden):
\`\`\`mjml
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
    </mj-attributes>
    
    <mj-include path="../css-1.mjml" />
  </mj-head>
  <mj-body background-color="#cccccc">
    <mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>
        <mj-text padding-top="10px" padding-bottom="10px">
          <p align="center" style="margin:0px 0; padding:0px 0;line-height:1.5;">
            <font size="1" face="Verdana">{preHeader}</font>
          </p>
        </mj-text>
      </mj-column>
    </mj-section>
    
    <mj-section background-color="white" padding-bottom="0" padding-top="0">
      <mj-column padding-top="10px">
        <mj-text padding-top="10px" padding-bottom="10px">
          {header}
        </mj-text>
      </mj-column>
    </mj-section>
    
    <mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>
        <mj-text padding-top="0" padding-bottom="0">
          <br/>
          [INHALT HIER]
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
\`\`\`

ANWEISUNGEN:
1. Analysiere den Word-Inhalt und identifiziere:
   - Überschriften → als <p> mit entsprechender font-size (H1=21px, H2=19px, H3=17px) und IMMER <strong>
   - Listen mit Bullet-Points → verwende das Bullet-Template
   - Text-Bild-Kombinationen → verwende das 2-Column-Template
   - Hervorgehobene Texte (gelb markiert = <span style="background-color:#ffff00;">)
   - Buttons/Links → verwende Button-Template
   
2. Extrahiere Farben:
   - Suche nach farbigen Texten und Hintergründen
   - Verwende diese Farben im MJML-Code als inline styles
   
3. Struktur beibehalten:
   - Jeder neue Abschnitt = neue <mj-section>
   - Text immer in <mj-text> tags
   - Bilder mit <mj-image> und Platzhaltern
   
4. Formatierung:
   - ALLE <p> Tags: style="margin:15px 0;"
   - Überschriften: <p style="margin:15px 0; font-size:XXpx;"><strong>Text</strong></p>
   - Fettdruck: <strong> oder <b>
   - Kursiv: <em> oder <i>
   - Links: <a href="##">Text</a>
   - Farben als inline style: style="color:#bb1111;"

5. WICHTIG - Platzhalter:
   - {preHeader} - NIEMALS ersetzen
   - {header} - NIEMALS ersetzen
   - {CONTENT}, {TEXT_CONTENT}, {BUTTON_TEXT} - NIEMALS ersetzen
   - Platzhalter in {} MÜSSEN exakt übernommen werden

AUSGABE:
- Gib NUR den vollständigen MJML-Code aus
- KEINE Erklärungen oder Markdown
- Beginne direkt mit <mjml> und ende mit </mjml>
- Verwende die Templates EXAKT wie vorgegeben
- Ersetze KEINE Platzhalter in geschweiften Klammern {}`;

  const makeAPIRequest = async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [
            {
              role: 'user',
              content: `Konvertiere diesen Word-Dokument-Inhalt in MJML Email-Template Code. Befolge ALLE Regeln strikt:\n\n${wordContent}`
            }
          ]
        })
      });

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const waitTime = Math.pow(2, retryCount) * 2000; // Exponential backoff: 2s, 4s, 8s
          setError(`Rate-Limit erreicht. Warte ${waitTime/1000} Sekunden und versuche es erneut... (Versuch ${retryCount + 1}/${maxRetries})`);
          await sleep(waitTime);
          return makeAPIRequest(retryCount + 1, maxRetries);
        } else {
          throw new Error('Rate-Limit erreicht. Bitte warte 1-2 Minuten und versuche es erneut.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Fehler ${response.status}: ${errorData.error?.message || 'Unbekannter Fehler'}`);
      }

      return response;
    } catch (err) {
      if (retryCount < maxRetries && err.message.includes('fetch')) {
        const waitTime = Math.pow(2, retryCount) * 2000;
        setError(`Netzwerkfehler. Versuche erneut in ${waitTime/1000} Sekunden... (Versuch ${retryCount + 1}/${maxRetries})`);
        await sleep(waitTime);
        return makeAPIRequest(retryCount + 1, maxRetries);
      }
      throw err;
    }
  };

    try {
      const response = await makeAPIRequest();

      const data = await response.json();
      const generatedMJML = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');

      setMjmlOutput(generatedMJML);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError(`Fehler bei der Konvertierung: ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadMJML = () => {
    const blob = new Blob([mjmlOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-template.mjml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mjmlOutput);
    alert('MJML Code in Zwischenablage kopiert!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FileText className="text-indigo-600" />
            Word zu MJML Konverter
          </h1>
          <p className="text-gray-600 mb-8">
            Laden Sie Ihre Word-Datei hoch und konvertieren Sie sie automatisch in ein MJML Email-Template
          </p>

          {/* Upload Bereich */}
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-indigo-500 mb-3" />
                <p className="mb-2 text-sm text-gray-700">
                  <span className="font-semibold">Klicken zum Hochladen</span> oder Drag & Drop
                </p>
                <p className="text-xs text-gray-500">Word-Datei (.docx)</p>
                {file && (
                  <p className="mt-3 text-sm text-indigo-600 font-medium">
                    ✓ {file.name}
                  </p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                accept=".docx"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Fehler Anzeige */}
          {error && (
            <div className={`mb-6 p-4 border rounded-lg flex items-start gap-3 ${
              error.includes('Warte') || error.includes('Versuche erneut') 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <AlertCircle className={`flex-shrink-0 mt-0.5 ${
                error.includes('Warte') || error.includes('Versuche erneut')
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`} />
              <div>
                <p className={`${
                  error.includes('Warte') || error.includes('Versuche erneut')
                    ? 'text-yellow-700'
                    : 'text-red-700'
                }`}>{error}</p>
                {error.includes('Rate-Limit') && !error.includes('Warte') && (
                  <p className="text-sm text-red-600 mt-2">
                    💡 Tipp: Die API hat ein Anfragenlimit. Bitte warte kurz und versuche es dann erneut.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Word Content Vorschau */}
          {wordContent && !mjmlOutput && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Word-Inhalt erkannt:</h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                <pre className="text-sm text-gray-600 whitespace-pre-wrap font-mono">
                  {wordContent.substring(0, 500)}...
                </pre>
              </div>
            </div>
          )}

          {/* Konvertieren Button */}
          <button
            onClick={convertToMJML}
            disabled={!file || loading}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mb-6"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" />
                Konvertiere...
              </>
            ) : (
              <>
                <CheckCircle />
                In MJML konvertieren
              </>
            )}
          </button>

          {/* MJML Output */}
          {mjmlOutput && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">Generierter MJML Code:</h3>
                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                  >
                    Kopieren
                  </button>
                  <button
                    onClick={downloadMJML}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap">
                  {mjmlOutput}
                </pre>
              </div>
            </div>
          )}

          {/* Regeln Anzeige */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Befolgte Regeln:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ Keine DIVs - nur MJML-Komponenten</li>
              <li>✓ Nur Inline-CSS</li>
              <li>✓ Keine externen Ressourcen</li>
              <li>✓ Bilder als Platzhalter ([PLATZHALTER_BILD_X])</li>
              <li>✓ Überschriften als &lt;p&gt; mit font-size (H1=21px, H2=19px, H3=17px)</li>
              <li>✓ Alle &lt;p&gt; Tags mit margin:15px 0;</li>
              <li>✓ Platzhalter in {} werden NICHT ersetzt</li>
              <li>✓ &lt;mj-include path="../css-1.mjml" /&gt; im Header</li>
              <li>✓ Verwendung deiner MJML-Templates</li>
              <li>✓ Farben aus Word-Datei extrahiert</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordToMJMLConverter;