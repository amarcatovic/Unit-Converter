let konverter = {}

konverter['povrsina'] = {naziv: "Površina", 
jedinice: new Array("Kvadratni metar (m^2)", "Kvadratni kilometar (km^2)", "Hektar", "Kvadratna stopa (ft^2)" ),
faktor: new Array(1, 1000000, 10000, 0.092903),
cinjenice: new Array("Površina u višoj matematici vidi se kao specijalan slučaj zapremine za dvodimenzionalne regije", "Na datum 14.03. obilježava se svjetski dan broja PI", "Neki ljudi vjeruju da broj PI sadržava odgovore na pitanja o beskonačnosti svemira"),
slika: 'povrsina.jpg',
}

konverter['duzina'] = {naziv: "Dužina", 
jedinice: new Array("Metar (m)", "Kilometar (km)", "Centimetar (cm)", "Milimetar (mm)", "Yard (yd)", "Stopa (ft)", "Milja (mile)"),
faktor: new Array(1, 1000, 0.01, 0.001, 0.9144, 0.3048, 1609.34),
cinjenice: new Array("Metar je prvotno određen 1795. kao temeljna jedinica francuskog mjernog sistema, i to tako da je, u nastojanju da se osloni na prirodnu mjeru, bio definiran kao 40-milijunti dio dužine meridijana.", "Britanci i Amerikanci koriste milje i stope kao jedinice za dužinu jer je ljudima bilo lakše dati aproksimativnu dužinu pređenog puta ili predmeta", "Stopa nije u SI sistemu"),
slika: 'duzina.jpg'
}

konverter['masa'] = {naziv: "Masa", 
jedinice: new Array("Kilogram (kg))", "Gram (g)", "Miligram (mgr)", "Mikrogram (mu-gr)", "Ounce (troy)", "Funta (lbs)",),
faktor: new Array(1, 0.001, 1e-6, 0.000000001, 0.0283495, 0.453592,),
cinjenice: new Array("Kada govorimo o našoj kilaži, kažemo da nam je masa npr. 80kg, a ne da smo teški 80kg", "Masa se pojavljuje u klasičnoj fizici kao izvor sile gravitacije", "Svako tijelo ostaje u stanju mirovanja dok ga neka vanjska sila ne prisili da to stanje promijeni"),
slika: 'masa.jpg',
}

konverter['pritisak'] = {naziv: "Pritisak", 
jedinice: new Array("Paskal (N/m^2)", "Atmosfera", "Bar", "Milibar",),
faktor: new Array(1, 101325, 100000, 100),
cinjenice: new Array("Ljudi mogu izdržati pritisak od 100 Atmosfera", "Avioni su dizajnirani na osnovu Bernulijevog zakona", "Što je visina veća, to je pritisak manji"),
slika: 'pritisak.jpg',
}

konverter['brzina'] = {naziv: "Brzina", 
jedinice: new Array("Metar u Sekundi (m/s)", "Stopa u minuti (ft/min)", "Kilometri na sat (kph)", "Čvor (knot)", "Milja na sat (mph)"),
faktor: new Array(1, 5.08E-03, 0.2777778, 0.5144444, 0.44707,),
cinjenice: new Array("Prosječni iznos brzine izračuna se tako da se prijeđeni put podijeli sa utrošenim vremenom", "Lastavica može letjeti i do 90 m/s.", "Automobil Koenigsegg One je trenutno najbrži automobil na svijetu, te dostiže brzinu od 437 kph"),
slika: 'brzina.jpg',
}

konverter['volumen'] = {naziv: "Volumen", 
jedinice: new Array("Kubni Metar (m^3)", "Litar (l)","Kubni centimetar (cm^3)", "Barel (nafta)", "Galon", "Ounce (oz)"),
faktor: new Array(1, 0.001, 0.000001, 0.1589873, 0.00378541, 2.95735e-5),
cinjenice: new Array("Američka vlada je 1970. godine pokušala preći na metričke veličine za volumen, ali stanovništvo nije moglo upamtiti iste, te su se vratili imperijalnim veličinama", "Volumen kocke sa 5 i 6 strana je isti"),
slika: 'volumen.jpg',
}

let aktivnaJedinica = 'duzina'

// ===========
//  Funkcije
// ===========

const UpdateUnitMenu = (jedinica, forma) => {
  FillMenuWithArray(forma, konverter[jedinica].jedinice);
}

const FillMenuWithArray = (forma, nizJedinica) => {
  var i;
  forma.length = nizJedinica.length;
  for (i = 0; i < nizJedinica.length; i++) {
    forma.options[i].text = nizJedinica[i];
  }
}

const CalculateUnit = (sourceForm, targetForm) => {
  let sourceValue = sourceForm.text_input.value
  sourceValue = parseFloat(sourceValue)
  if (!isNaN(sourceValue) || sourceValue == 0) {
    sourceForm.text_input.value = sourceValue
    ConvertFromTo(sourceForm, targetForm)
    document.querySelector('#input-greska').classList.add('hidden')
  }
  else{
    document.querySelector('#input-greska').classList.remove('hidden')
  }
}

const ConvertFromTo = (sourceForm, targetForm) =>{
  let sourceIndex = sourceForm.select_jedinica.selectedIndex
  let sourceFactor = konverter[aktivnaJedinica].faktor[sourceIndex]

  let targetIndex = targetForm.select_jedinica.selectedIndex
  let targetFactor = konverter[aktivnaJedinica].faktor[targetIndex]

    console.log('Source Faktor: ' + sourceFactor)
    console.log('Target Faktor: ' + targetFactor)

  let result = sourceForm.text_input.value
  result = result * sourceFactor / targetFactor
  console.log(result)
 
  targetForm.text_input.value = result
}


window.onload = (e) => {
  UpdateUnitMenu('duzina', document.form_left.select_jedinica)
  UpdateUnitMenu('duzina', document.form_right.select_jedinica)
  document.querySelector('#fact-text').innerHTML = konverter['duzina'].cinjenice[Math.floor(Math.random() * konverter['duzina'].cinjenice.length)]
}

const promijeniJedinice = (jedinica) => {
    UpdateUnitMenu(jedinica, document.form_left.select_jedinica)
    UpdateUnitMenu(jedinica, document.form_right.select_jedinica)
    document.querySelector('#ime-jedinice').innerHTML = konverter[jedinica].naziv
    document.querySelector('#fact-text').innerHTML = konverter[jedinica].cinjenice[Math.floor(Math.random() * konverter[jedinica].cinjenice.length)]
    document.querySelector('.wrapper').style.backgroundImage = `url('styles/imgs/${konverter[jedinica].slika}')`;
    aktivnaJedinica = jedinica
    document.form_left.text_input.value = ""
    document.form_right.text_input.value = ""
    document.querySelector('.konverter').classList.add('rotiraj')
    setTimeout(() => {document.querySelector('.konverter').classList.remove('rotiraj')}, 500)
}


document.getElementByClass('validate').addEventListener('keydown', (e) => {
  let key = e.keyCode ? e.keyCode : e.which;

  if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
      (key == 65 && (e.ctrlKey || e.metaKey)) || 
      (key == 67 && (e.ctrlKey || e.metaKey)) || 
      (key == 86 && (e.ctrlKey || e.metaKey)) || 
      (key >= 35 && key <= 40) || 
      (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
      (key >= 96 && key <= 105)
      (key == 190)
    )) e.preventDefault()
})
