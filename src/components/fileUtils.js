
import mammoth from "mammoth";
import Rules from "./KIRules";

export async function HandleFileUpload(event, drop = false) {

  const file = drop ? event.dataTransfer.files[0] : event.target.files[0];

  if (!file) {
    return { error: "Es wurde keine Datei hochgeladen" }
  }

  if (!file.name.endsWith('.docx')) {
    return { error: "Es sind nur Word-Dateien erlaubt!" }
  }

  const arrayBuffer = file.arrayBuffer();
  const fileString = await mammoth.convertToHtml({ arrayBuffer })

  const fileContent = fileString.value.replace(/src=["]data:image\/[^;]+;base64,[^"']*["]/gi, 'src="BILD_PLATZHALTER"').replace(/alt=["'][^"']*["']/gi, 'alt="Bild"')
  return { fileContent: fileContent, fileName: file.name };
}

export async function APIReq(file, template, recievedLink) {

  const apiKey = process.env.gemini_Key;

  if (template === 'Advance') {
    recievedLink = '{landingpageUrl}'
  }
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: Rules(template, recievedLink) + file
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();
  console.log(data.candidates[0].content.parts[0].text);

  try {
    return data.candidates[0].content.parts[0].text
  } catch (e) {
    return `Fehler aufgetreten. Versuchen Sie es bitte später erneut! \nFehler: ${e} \nResponse: ${data.data}`
  }
}



