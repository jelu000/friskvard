import './FriskvardsAktiviteter.css';
import React from 'react';
import axios from 'axios';
import xml2js from 'xml2js';

//application/xml
//application/json
//https://skatteverket.entryscape.net/rowstore/dataset/1429b654-11eb-401e-ae3c-0dd6b52e6c89/json?
//"homepage": "/friskvard",
//OBS (ctrl + e) ger code complete for JSX in Atom
//TODO: inget

class FriskvardsAktiviteter extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      aktiviteterObj: [],
      filterstring: ""
    }

    this.textFeltChange = this.textFeltChange.bind(this);

  }

  componentDidMount() {

    let parser = new xml2js.Parser();
    //https://skatteverket.entryscape.net/rowstore/dataset/1429b654-11eb-401e-ae3c-0dd6b52e6c89/json
    //https://skatteverket.entryscape.net/rowstore/dataset/1429b654-11eb-401e-ae3c-0dd6b52e6c89?_limit=25&_offset=0
    //
    axios.get('https://skatteverket.entryscape.net/rowstore/dataset/1429b654-11eb-401e-ae3c-0dd6b52e6c89?_limit=180&_offset=0', {  "Content-Type": "application/json; charset=utf-8" } )
    .then(response=>{
       parser.parseString(response.data, (err, result) => {
         //console.log(`Object= ${response} Antal Aktiviteter: ${ JSON.stringify(response.data.resultCount) }`);
         //console.log("-------------------------------------------");
         //console.log(`${ JSON.stringify(response.data.results)}`);
         let responsearray = response.data.results;
         this.setState({aktiviteterObj: responsearray});
         //console.log(responsearray[90].aktivitet);


       });

    })
  }

textFeltChange(event){
  let text_input = event.target.value;
  console.log("Click!" + text_input);
  this.setState({filterstring: text_input});
}

listaAktiviteter(){

  /*let li_element = {
    width: '400px',
    padding: '5px',
    textAlign: 'left',
    margin: '20px',
    backgroundColor: 'lightblue'
  };*/

  let t_aktivitet_array = this.state.aktiviteterObj;

  //Filtrerar förmåner om det står något i textfältet
  let t_filtered_array = t_aktivitet_array.filter( akt => {
          return akt.aktivitet.toLowerCase().includes(this.state.filterstring.toLowerCase())
        });

  //console.log(`t_filtered_array längd: ${t_filtered_array.length}`);

  return (

      t_filtered_array.map((akt, index )=> (
        <div className="li_div_element" key={index} id={index}>
          <div>
            <p><b>{index+1}. </b> {akt.aktivitet}</p>
          </div>
          <div>
            Skattefri förmån: {akt["skattefri förmån?"]}
          </div>
        </div>
      )
      )


  )
}



  render () {

    let lista_med_aktiviter = this.listaAktiviteter();

    return (
      <div className="innerdiv">
        <h2>Friskvårdsbidrag & godkända Aktiviteter</h2>
        <div className="upper_innerdiv">
        <p>Personalvårdsförmåner är förmåner av mindre värde som syftar till att skapa trivsel i arbetet. Friskvårdsbidrag
        är ett sådant bidrag och kan vara skattefritt om det inte överstiger 5000:- per år enligt <a href="https://www.skatteverket.se/privat/skatter/arbeteochinkomst/formaner/personalvardmotionochfriskvard.4.7459477810df5bccdd4800014540.html" target="_self" title="Skatteverket">Skatteverket</a> 2021.
        </p>
        Här nedan följer en lista över godkända aktiviteter som en arbetsgivare kan göra skatteavdrag för.
        Data är hämtad från Skatteverket, <a href="http://salongnobless.se/jens" target="_self" title="Jensa">&copy;Jens Lundeqvist</a>.
        <p>

        </p>
        <form>
          <label>Filtrera: </label>
          <input type="text" onChange={this.textFeltChange} id="ftinput"/>
        </form>
        </div>

        <div className="under_innerdiv">
        { lista_med_aktiviter }
        </div>

      </div>
    );

  }
}


export default FriskvardsAktiviteter;
