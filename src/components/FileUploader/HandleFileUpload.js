import mammoth from "mammoth";
export async function HandleFileUpload(event, drop = false) {

  const file = drop ? event.dataTransfer.files[0] : event.target.files[0];

  if (!file) {
    return { error: "Es wurde keine Datei hochgeladen" }
  }

  if (!file.name.endsWith('.docx')) {
    return { error: "Es sind nur Word-Dateien erlaubt!" }
  }

  const arrayBuffer = file.arrayBuffer();
  const fileWord = await mammoth.extractRawText({ arrayBuffer });
  const fileString = await mammoth.convertToHtml({ arrayBuffer })
  const fileContent = fileString.value.replace(/src=["]data:image\/[^;]+;base64,[^"']*["]/gi, 'src="BILD_PLATZHALTER"').replace(/alt=["'][^"']*["']/gi, 'alt="Bild"')
  
  return { fileContentASHTML: fileContent, fileContentASWord: fileWord.value, fileName: file.name };
}

