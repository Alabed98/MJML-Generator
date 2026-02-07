function Code_Snippets(recievedLink = ''){
    return  {     
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

      twoColumns: ` <mj-section background-color="white" padding-top="0" padding-bottom="0">
 <mj-column width="65%" vertical-align="middle">
<mj-text padding-top="0" padding-bottom="0">
{TEXT-Content}
 </mj-text>
</mj-column>

<mj-column width="35%" vertical-align="middle">
 <mj-image src="{Bild_Platzhalter}" href="${recievedLink}" width="160px" alt="Cover"  />
<mj-text padding-top="0" padding-bottom="0">
 </mj-text>
</mj-column>
</mj-section>	`
      ,
      image: `
 </mj-text>
 <mj-image src="../a images/{Bild_Platzhalter}" href="${recievedLink}" alt="Cover"  />
<mj-text  padding-top="0" padding-bottom="0">
  
 `
      ,
      imageUnterschrift: `  </mj-text>
 <mj-image src="../a images/{Bild_Platzhalter}" href="${recievedLink}" alt="Unterschrift"  width="200px" align="left"/>
<mj-text  padding-top="0" padding-bottom="0">
 `
      ,
      button: `</mj-text>
<mj-button color="white" background-color="#bb1111" border="black" href="${recievedLink}" font-family="Helvetica"><b style="font-size:20px;line-height:1.5">{BUTTON_TEXT}</b></mj-button>
<mj-text padding-top="0" padding-bottom="0">`
   };
} 


export default Code_Snippets;