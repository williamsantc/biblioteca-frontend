import {
  isEmptyString
} from '../util/string-utils'

export const tableMixin = {
  data: function () {
    return {
      currentPage: 1,
      perPage: 5,
      listPerPage: [5, 10, 15]
    }
  },
  methods: {
    currentRowsShowing: function (totalRows) {
      let lastRowShowing = this.currentPage * this.perPage
      let firstRowShowing = lastRowShowing - this.perPage + 1
      lastRowShowing = lastRowShowing < totalRows ? lastRowShowing : totalRows
      return firstRowShowing + ' - ' + lastRowShowing + ' de ' + totalRows
    },
    isEmptyFilter: function (filter) {
      if (isEmptyString(filter)) {
        return true
      }

      for (let key in filter) {
        if (isEmptyString(filter[key])) {
          return true
        }
      }

      return false
    }
  }
}

export default tableMixin