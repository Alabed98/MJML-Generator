
function GetSelectedTemplate(selectedTemplate){

    const templates={
        Investor:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-inv.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer.mjml" />
      
      
    </mj-body>
  
  </mjml>`,

    Gevestor:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-gevestor.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

      HIER kommt der Inhalt
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-gevestor.mjml" />
      
      
    </mj-body>
  
  </mjml>`,

  Advance:`
   <mjml>
  	<mj-head>
    	<mj-attributes>

      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->

      <mj-section background-color="#cccccc" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="10px" padding-bottom="10px" >
<p align="center" style="margin:0px 0; padding:0px 0;line-height:1.5;"><font size="1" face="Verdana">{preHeader}</font></p>
 </mj-text>

</mj-column>
</mj-section>
      
<mj-section background-color="white" padding-bottom="0" padding-top="0">

  <mj-column padding-top="10px">
    <mj-text padding-top="10px" padding-bottom="10px" >
   {header}
    
    </mj-text>
		
	
  </mj-column>

</mj-section>
      
      
      
        
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

HIER kommt der Inhalt
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
      
       <mj-include path="../footer-footer.mjml" />
      
      
    </mj-body>
  
  </mjml>
  `,
  maxLQ:`<mjml>
  	<mj-head>
      
    	<mj-attributes>
      	 <mj-text font-family="helvetica" font-size="13pt" line-height="120%"/>
      </mj-attributes>
      
      <mj-include path="../css-1.mjml" />	
      
    </mj-head>
  	<mj-body background-color="#cccccc">
    <!----------------------Start E-Mail-------------------------->
    <mj-include path="../header-maxlq.mjml" />
      
          
<mj-section background-color="white" padding-top="0" padding-bottom="0">
      <mj-column>

<mj-text padding-top="0" padding-bottom="0" >

  
  
      <br/>      
     
 </mj-text>

</mj-column>
</mj-section>
      
       <mj-include path="../footer-maxlq.mjml" />
      
      
    </mj-body>
  
  </mjml>`

    }
    return templates[selectedTemplate];
}
export default GetSelectedTemplate;