
import mammoth from "mammoth";
import Rules from "./KIRules";
import { GoogleGenAI } from "@google/genai";

export async function HandleFileUpload(event, drop=false){
    
    const file = drop? event.dataTransfer.files[0]: event.target.files[0];

    if(!file){
        return {error:"Es wurde keine Datei hochgeladen"}
    }

    if(!file.name.endsWith('.docx')){
        return {error:"Es sind nur Word-Dateien erlaubt!"}
    }
    //const mjmlOutput = await APIReq(file)
    //return {output:mjmlOutput,name:file.name};
    const arrayBuffer = file.arrayBuffer();
    const fileString = await mammoth.convertToHtml({arrayBuffer})
    const fileContent = fileString.value.replace(/src=["]data:image\/[^;]+;base64,[^"']*["]/gi, 'src="BILD_PLATZHALTER"').replace(/alt=["'][^"']*["']/gi, 'alt="Bild"')
    return {fileContent:fileContent, fileName:file.name};
}

export async function APIReq(file, template, recievedLink){
/*
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: 'POST',
        headers: {
            "Authorization": `Bearer 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`,
            'Content-Type': 'application/json',
            "X-Title": "Email-Generator"
        },
        body: JSON.stringify({
            model: "arcee-ai/trinity-large-preview:free",
            messages: [
            {
                role:'system',
                content:Rules(template, recievedLink)
            },
            {
                role: 'user',
                content: `Konvertiere diesen Word-Dokument-Inhalt in MJML Email-Template Code. Befolge ALLE Regeln strikt:\n\n${file}`
            }
          ]
        })
      })
        */

if(template=='Advance'){
    recievedLink = '{landingpageUrl}'
}
const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDNskN3l7KqBn7Orx5qs8hmuMd2HF30yAg`,
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

      try{
        return data.candidates[0].content.parts[0].text
      }catch(e){
        return `Fehler aufgetreten. Versuchen Sie es bitte später erneut! \nFehler: ${e} \nResponse: ${data.data}` 
      }
    }
 


