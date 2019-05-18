/* eslint-disable no-useless-escape */

import Vue from 'vue'
import FestivosColombia from '@/util/festivos-colombia.js'

// Made with heart by William Santos

export function isEmpty (element) {
  return (
    element === undefined ||
    element === null ||
    (typeof element === 'string' && element.trim() === '')
  )
}

export function urlify (text) {
  // crea elemento html temporal
  let tmp = document.createElement('div')
  document.body.appendChild(tmp)
  tmp.innerHTML = text

  let sanitizedText = tmp.innerText.trim()
  // elimina el elemento temporal
  tmp.parentNode.removeChild(tmp)
  let urlRegex = /(https?:\/\/[^\s]+)/g
  let urls = sanitizedText.match(urlRegex)

  if (isEmpty(urls)) {
    return text
  }

  urls.forEach(url => {
    text = text.replace(url, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + '</a>'
    })
  })

  return text
}

export function addDots (text, limiter) {
  return (text.length > limiter ? text.substring(0, limiter) + '...' : text)
}

export function capitalizeFirst (value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\b[a-z]/g, c => c.toUpperCase())
}

export function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isMobile () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    ) {
      check = true
    }
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

export function isEmptyHtml (value) {
  // crea elemento html temporal
  let tmp = document.createElement('div')
  document.body.appendChild(tmp)
  tmp.innerHTML = value

  if (tmp.innerText.trim().length <= 0) {
    tmp.parentNode.removeChild(tmp)
    return true
  }

  // elimina el elemento temporal
  tmp.parentNode.removeChild(tmp)
  return false
}

export const validarForm = {
  methods: {
    capitalizeFirst,
    formatPrice: function (value, config) {
      /*
      {
        decimal: ',',
        thousands: '.',
        prefix: '$ ',
        precision: 2
      }
      */
      let precision =
        !this.isEmpty(config) &&
        !this.isEmpty(config.precision) &&
        !isNaN(config.precision)
          ? parseInt(config.precision)
          : 2
      let decimal =
        !this.isEmpty(config) && !this.isEmpty(config.decimal)
          ? config.decimal
          : ','

      let thousands =
        !this.isEmpty(config) && !this.isEmpty(config.thousands)
          ? config.thousands
          : '.'

      let prefix =
        !this.isEmpty(config) && !this.isEmpty(config.prefix)
          ? config.prefix
          : ''

      let suffix =
        !this.isEmpty(config) && !this.isEmpty(config.suffix)
          ? config.suffix
          : ''

      let val = (value / 1).toFixed(precision).replace('.', decimal)
      return (
        prefix +
        val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousands) +
        suffix
      )
    },
    estrategiaFestivosColombia: function () {
      return FestivosColombia
    },
    set24to12hours (time) {
      if (time.split(':').length !== 2) {
        return time
      }

      let parts = time.split(':')

      let hours = parseInt(parts[0]) > 12 ? parseInt(parts[0]) - 12 : parts[0]
      let minutes = parts[1]
      let format = parseInt(parts[0]) >= 12 ? 'PM' : 'AM'

      return hours + ':' + minutes + ' ' + format
    },
    getFechaVisual (dateString, noSpaces) {
      return (
        dateString.split('-')[2] +
        (!noSpaces ? ' / ' : '/') +
        dateString.split('-')[1] +
        (!noSpaces ? ' / ' : '/') +
        dateString.split('-')[0]
      )
    },
    getObjetoFechaActual () {
      return this.stringToDate(FestivosColombia.formatDate(new Date()))
    },
    stringToDate (dateString) {
      return new Date(
        parseInt(dateString.split('-')[0]),
        parseInt(dateString.split('-')[1]) - 1,
        parseInt(dateString.split('-')[2])
      )
    },
    // si el día seleccionado no es hábil, busca el proximo día habil
    setHabilDay: function (date) {
      if (!this.isDiaHabil(date)) {
        do {
          date = FestivosColombia.addDays(date, 1)
        } while (!this.isDiaHabil(date))
      }

      return FestivosColombia.formatDate(date)
    },
    addDays: function (date, cant) {
      return FestivosColombia.formatDate(FestivosColombia.addDays(date, cant))
    },
    addDaysSoloHabiles: function (date, cant) {
      let tmpDate
      let diasFestivos = FestivosColombia.cargarFestivos(
        new Date().getFullYear() + ''
      )

      for (let i = 1; i <= cant; i++) {
        tmpDate = FestivosColombia.addDays(date, i)

        if (tmpDate.getUTCDay() === 6 || tmpDate.getUTCDay() === 0) {
          cant++
          continue
        }

        for (let festivo in diasFestivos) {
          if (
            tmpDate.getTime() ===
            this.stringToDate(diasFestivos[festivo]).getTime()
          ) {
            cant++
            break
          }
        }
      }

      return FestivosColombia.formatDate(tmpDate)
    },
    isDiaHabil: function (fecha) {
      let diasFestivos = FestivosColombia.cargarFestivos(
        new Date().getFullYear() + ''
      )
      let res = true

      for (let festivo in diasFestivos) {
        if (
          fecha.getTime() === this.stringToDate(diasFestivos[festivo]).getTime()
        ) {
          res = false
          break
        }
      }

      if (fecha.getUTCDay() === 6 || fecha.getUTCDay() === 0) {
        res = false
      }

      return res
    },
    validarCantidadCaracteres: function (event, campo, limite) {
      if (
        campo.length >= limite &&
        event.keyCode !== 8 &&
        event.keyCode !== 46 &&
        event.keyCode !== 37 &&
        event.keyCode !== 38 &&
        event.keyCode !== 39 &&
        event.keyCode !== 40 &&
        event.keyCode !== 9
      ) {
        event.preventDefault()
      }
    },
    validarKeyNumero: function (evt) {
      var controlKeys =
        evt.keyCode === 8 ||
        evt.keyCode === 46 ||
        evt.keyCode === 37 ||
        evt.keyCode === 38 ||
        evt.keyCode === 39 ||
        evt.keyCode === 40 ||
        evt.keyCode === 9
      if (
        !controlKeys &&
        (parseInt(evt.charCode) < 48 || parseInt(evt.charCode) > 57)
      ) {
        evt.preventDefault()
      }
    },
    calcularDiferenciaDiasHabiles (fechaDesde, fechaHasta) {
      if (!fechaDesde || !fechaHasta) {
        return 0
      }

      if (fechaHasta < fechaDesde) {
        return 0
      }

      let diasFestivos = FestivosColombia.cargarFestivos(
        new Date().getFullYear() + ''
      )
      let timeDiff = Math.abs(fechaDesde.getTime() - fechaHasta.getTime())
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      let diasNoHabiles = 0
      for (let i = 1; i <= diffDays; i++) {
        let fechaString = FestivosColombia.formatDate(
          FestivosColombia.addDays(fechaDesde, i)
        )
        let pivoteFecha = this.stringToDate(fechaString)
        for (let festivo in diasFestivos) {
          if (
            pivoteFecha.getTime() ===
            this.stringToDate(diasFestivos[festivo]).getTime()
          ) {
            diasNoHabiles++
          }
        }
        if (pivoteFecha.getUTCDay() === 6 || pivoteFecha.getUTCDay() === 0) {
          diasNoHabiles++
        }
      }

      return diffDays - diasNoHabiles
    },
    validarCampos: function (formData, indexDinamico) {
      var form = formData.form
      var config = formData.config
      for (var values in config) {
        if (
          !config[values].required &&
          !config[values].hasOwnProperty('validar')
        ) {
          continue
        }
        let selector = config[values].hasOwnProperty('ref')
          ? config[values].ref
          : values
        let ref = !this.isEmpty(indexDinamico)
          ? this.$refs[selector][indexDinamico]
          : this.$refs[selector]
        let fechaDesde = null
        let date = null
        switch (config[values].type) {
          case 'String':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
              return false
            } else if (
              config[values].hasOwnProperty('limite') &&
              form[values].length > config[values].limite
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Limite de caracteres en el campo: ' +
                  config[values].msg +
                  ' superado (máximo: ' +
                  config[values].limite +
                  ')'
              )
              return false
            }

            break

          case 'Number':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }

            if (isNaN(form[values])) {
              this.sendFocus(ref)
              this.$toast.error(
                'El campo solo permite números, verifique: ' +
                  config[values].msg
              )
              return false
            }
            if (
              config[values].hasOwnProperty('mayorQue') &&
              form[values] <= config[values].mayorQue
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'El número debe ser mayor que ' +
                  config[values].mayorQue +
                  ', verifique: ' +
                  config[values].msg
              )
              return false
            }

            if (
              config[values].hasOwnProperty('menorQue') &&
              form[values] >= config[values].menorQue
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'El número debe ser menor que' +
                  config[values].menorQue +
                  ', verifique: ' +
                  config[values].msg
              )
              return false
            }

            break
          case 'Email':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }

            if (!this.validateEmail(form[values])) {
              this.sendFocus(ref)
              this.$toast.error(config[values].msg + ' Invalido')
              return false
            }

            break
          case 'Object':
            if (config[values].goThrough) {
              var obj = {
                form: form[values],
                config: config[values].innerData
              }
              if (!this.validarCampos(obj)) {
                return false
              }
            } else if (
              this.isEmpty(form[values].value) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref.$el.querySelector('input'))
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }
            break
          case 'Array':
            if (
              Object.keys(form[values]).length <= 0 &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.$toast.error(
                'No hay elementos en la lista: ' + config[values].msg
              )
              return false
            }
            break
          case 'Date':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }

            date = this.stringToDate(form[values])
            if (
              config[values].hasOwnProperty('difference') &&
              config[values].difference
            ) {
              fechaDesde = this.stringToDate(config[values].fechaDesde)
              let diasMaximo = config[values].difference

              if (
                this.calcularDiferenciaDiasHabiles(fechaDesde, date) >
                diasMaximo
              ) {
                this.sendFocus(ref)
                this.$toast.error(
                  'La diferencia entre las fecha debe ser de ' +
                    config[values].difference +
                    ' día(s) Hábiles, verifique el campo: ' +
                    config[values].msg
                )
                return false
              }
            }

            if (
              config[values].hasOwnProperty('soloHabiles') &&
              config[values].soloHabiles
            ) {
              if (!this.isDiaHabil(date)) {
                this.sendFocus(ref)
                this.$toast.error('Solo se permiten días hábiles.')
                return false
              }
            }

            if (
              config[values].hasOwnProperty('lowerThan') &&
              !this.isEmpty(config[values].lowerThan) &&
              this.stringToDate(config[values].lowerThan).getTime() <
                date.getTime()
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'La fecha debe ser menor que ' +
                  this.getFechaVisual(config[values].lowerThan, true) +
                  ', verifique el campo: ' +
                  config[values].msg
              )
              return false
            }

            if (
              config[values].hasOwnProperty('lte') &&
              !this.isEmpty(config[values].lte) &&
              this.stringToDate(config[values].lte).getTime() < date.getTime()
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'La fecha debe ser menor o igual a ' +
                  this.getFechaVisual(config[values].lte, true) +
                  ', verifique el campo: ' +
                  config[values].msg
              )
              return false
            }

            if (
              config[values].hasOwnProperty('greaterThan') &&
              !this.isEmpty(config[values].greaterThan) &&
              this.stringToDate(config[values].greaterThan).getTime() >
                date.getTime()
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'La fecha debe ser mayor que ' +
                  this.getFechaVisual(config[values].greaterThan, true) +
                  ', verifique el campo: ' +
                  config[values].msg
              )
              return false
            }

            if (
              config[values].hasOwnProperty('gte') &&
              !this.isEmpty(config[values].gte) &&
              this.stringToDate(config[values].gte).getTime() > date.getTime()
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'La fecha debe ser mayor o igual ' +
                  this.getFechaVisual(config[values].gte, true) +
                  ', verifique el campo: ' +
                  config[values].msg
              )
              return false
            }
            break
          case 'Time':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }

            if (config[values].hasOwnProperty('greaterThan')) {
              let partsHour = form[values].split(':')
              let endHour = new Date()
              endHour.setHours(partsHour[0], partsHour[1], 0)
              let partsConfig = config[values].greaterThan.split(':')
              let startHour = new Date()
              startHour.setHours(partsConfig[0], partsConfig[1], 0)
              let partsGreater = config[values].greaterThan.split(':')
              let greaterShow =
                (parseInt(partsGreater[0]) < 12
                  ? partsGreater[0]
                  : parseInt(partsGreater[0]) - 12) +
                ':' +
                partsGreater[1] +
                (parseInt(partsGreater[0]) < 12 ? ' AM' : ' PM')
              if (startHour > endHour) {
                this.sendFocus(ref)
                this.$toast.error(
                  'La hora es inferior a las ' +
                    greaterShow +
                    ', verifique el campo: ' +
                    config[values].msg
                )
                return false
              }
            }
            break
          case 'CheckBox':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref)
              this.$toast.error(
                'Campos imcompletos, verifique el campo: ' + config[values].msg
              )
              return false
            }
            break
          case 'Radio':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref.$el.querySelector('input'))
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
              return false
            }
            break
          case 'Select':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref.$el)
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
              return false
            }

            if (config[values].hasOwnProperty('lista')) {
              let checkModificacion = false
              config[values].lista.forEach(element => {
                if (element.value === form[values]) {
                  checkModificacion = true
                }
              })

              if (!checkModificacion) {
                this.sendFocus(ref.$el)
                this.$toast.error(
                  'ERROR FATAL: Alteración del HTML, el valor ' +
                    form[values] +
                    ' no existe, verifique: ' +
                    config[values].msg
                )
                return false
              }
            }

            break
          case 'Html':
            if (
              this.isEmpty(form[values]) &&
              !config[values].hasOwnProperty('validar')
            ) {
              this.sendFocus(ref.$el)
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
              return false
            }

            if (isEmptyHtml(form[values])) {
              this.sendFocus(ref.$el)
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
            }

            break
          case 'File':
            if (this.isEmpty(form[values])) {
              this.sendFocus(ref.$el.querySelector('input'))
              this.$toast.error(
                'Campos imcompletos, verifique: ' + config[values].msg
              )
              return false
            }

            if (config[values].accept) {
              if (
                typeof config[values].accept === 'string' &&
                form[values].type !== config[values].accept
              ) {
                this.sendFocus(ref.$el.querySelector('input'))
                this.$toast.error(
                  'Tipo de archivo no permitido, verifique: ' +
                    config[values].msg
                )
                return false
              } else {
                let accepted = false
                for (let type in config[values].accept) {
                  if (form[values].type === config[values].accept[type]) {
                    accepted = true
                    break
                  }
                }

                if (!accepted) {
                  this.sendFocus(ref.$el.querySelector('input'))
                  this.$toast.error(
                    'Tipo de archivo no permitido, verifique: ' +
                      config[values].msg
                  )
                  return false
                }
              }
            }

            if (
              config[values].maxSize &&
              config[values].maxSize < form[values].size
            ) {
              let maxSize = config[values].maxSize / 1024 / 1024
              this.sendFocus(ref.$el.querySelector('input'))
              this.$toast.error(
                'Tamaño máximo permitido: ' +
                  maxSize +
                  'Mb , verifique: ' +
                  config[values].msg
              )
              return false
            }
            break
          default:
            console.log(config[values].type)
            break
        }
      }
      return true
    },
    isEmptyHtml,
    isEmpty,
    validateEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    sendFocus (element) {
      Vue.nextTick(() => {
        element.focus()
      })
    }
  }
}

export default validarForm