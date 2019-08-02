export default function RemplazarCaracteres(cadena) {
    //console.log("RemplazarCaracteres")
    //sacamos los acentos y convertimos en minuscula
    if(cadena){
        return cadena.replace(/á/gi,"a").replace(/é/gi,"e").replace(/í/gi,"i")
        .replace(/ó/gi,"o").replace(/ú/gi,"u").replace(/ñ/gi,"n").toLowerCase()
    }
    
}