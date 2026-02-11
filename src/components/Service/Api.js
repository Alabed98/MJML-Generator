
import Rules from "../KIRules";

export async function Api(file, template, recievedLink) {
  const apiKey = //process.env.REACT_APP_GEMINI_KEY;
  'AIzaSyA4p_0t8djx7p39rwpm7XU6o9G6Lc2WWqI'

  if (template === 'Advance' || template === 'HU_Mailings') {
    recievedLink = '{landingpageUrl}'
  }
  if (
    template === 'Reminder_Reg_Inv' ||
    template === 'Reminder_Reg_GeV' ||
    template === 'Investor_Webinar' ||
    template === 'Gevestor_Webinar' ||
    template === 'Nachfass_Inv' ||
    template === 'Nachfass_GeV' ||
    template === 'Abo_laufend_Inv' ||
    template === 'Abo_laufen_GeV'
  ) {
    recievedLink = '{Live_Room_Link}';
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

  try {
    return data.candidates[0].content.parts[0].text
  } catch (e) {
    return `Fehler aufgetreten. Versuchen Sie es bitte später erneut! \nFehler: ${e} \nResponse: ${data.data}`
  }
}

export default Api;