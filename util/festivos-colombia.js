
const FESTIVOS_FIJOS = [
  '01-01', // AÑO NUEVO
  '05-01', // DIA DEL TRABAJO
  '07-20', // GRITO DE INDEPENDENCIA
  '08-07', // BATALLA DE BOYACA
  '12-08', // INMACULADA CONECPCION
  '12-25' // NAVIDAD
]

const FESTIVOS_MOVIBLES = [
  '01-06', // REYES MAGOS
  '03-19', // SAN JOSE
  '06-29', // SAN PEDRO Y SAN PABLO
  '08-15', // ASUNCION DE LA VIRGEN
  '10-12', // DIA DE LA RAZA
  '11-01', // TODOS LOS SANTOS
  '11-11' // INDEPENDENCIA DE CARTAGENA
]

const festivosColombia = {
  // LOS FESTIVOS DE PASCUA, SON CALCULADOS
  cargarFestivos (year) {
    let lista = []

    for (let i = 0; i < FESTIVOS_FIJOS.length; i++) {
      lista.push(year + '-' + FESTIVOS_FIJOS[i])
    }

    for (let i = 0; i < FESTIVOS_MOVIBLES.length; i++) {
      let fecha = new Date(year + '-' + FESTIVOS_MOVIBLES[i])
      let d = fecha.getDay()
      if (d === 0) {
        fecha.setDate(fecha.getDate() + 1)
      } else if (d > 1) {
        fecha.setDate(fecha.getDate() + 8 - d)
      }
      lista.push(this.formatDate(fecha))
    }

    let domPascua = this.determinarDomingoPascua(year)
    
    lista.push(this.formatDate(this.addDays(domPascua, -3))) // JUEVES SANTO
    lista.push(this.formatDate(this.addDays(domPascua, -2))) // VIERNES SANTO
    lista.push(this.formatDate(this.addDays(domPascua, 43))) // ASCENCION DE JESUS
    lista.push(this.formatDate(this.addDays(domPascua, 64))) // CORPUS CRISTY
    lista.push(this.formatDate(this.addDays(domPascua, 71))) // SAGRADO CORAZON DE JESUS

    lista.sort()
    return lista
  },

  // Añade (o resta) días a a una fecha dada
  addDays (fecha, days) {
    let tmp = new Date(fecha.getTime())
    tmp.setDate(tmp.getDate() + days)
    return tmp
  },

  determinarDomingoPascua (year) {
    let M = 24 // CONSTANTES FORMULA 1900-2100
    let N = 5 // CONSTANTES FORMULA 1900-2100
    let A = year

    let a = A % 19
    let b = A % 4
    let c = A % 7
    let d = (19 * a + M) % 30
    let e = (2 * b + 4 * c + 6 * d + N) % 7

    let fecha = new Date(year, 2, 22) // 3 -> Abril, 0 -> Enero
    fecha.setDate(fecha.getDate() + d + e)

    if (fecha.getMonth() === 3) { // 3 -> Abril
      if (fecha.getDate() === 26) {
        fecha.setDate(19)
      } else if (fecha.getDate() === 25 && d === 28 && e === 6 && a > 10) {
        fecha.setDate(18)
      }
    }

    return fecha
  },

  // Objeto Date a formato String
  formatDate (fecha) {
    let y = fecha.getFullYear()
    let m = fecha.getMonth() + 1
    let d = fecha.getDate()
    if (m < 10) {
      m = '0' + m
    }
    if (d < 10) {
      d = '0' + d
    }
    return y + '-' + m + '-' + d
  }
}

export default festivosColombia
