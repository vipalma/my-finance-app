export const THIS_YEAR = +(new Date().getFullYear());

// (int) The current month starting from 1 - 12
// 1 => January, 12 => December
export const THIS_MONTH = +(new Date().getMonth() + 1) ;
// export const THIS_MONTH = 12 ;

export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}

// (int) Number days in a month for a given year from 28 - 31
export const getMonthDays = (month = THIS_MONTH, year = THIS_YEAR) => {
  const months30 = [4, 6, 9, 11];
  const leapYear = year % 4 === 0;

  return month === 2
    ? leapYear
      ? 29
      : 28
    : months30.includes(month)
      ? 30
      : 31;
}

export const getMonthRange = (month = THIS_MONTH, year = THIS_YEAR) => {
    return {
              init: `${year}-${zeroPad(month, 2)}-01` ,
              end: `${year}-${zeroPad(month, 2)}-${getMonthDays(parseInt(month), parseInt(year) )}` };
  }

  export const convertToRange = (selectedDate) => {
    const splited = selectedDate.split('-');
    return getMonthRange(splited[0], splited[1]);
  }

  export const convertToDate = (value) => {
    var res = new Date(value);

    const splitted = res.toLocaleDateString().split('/');

    splitted[0] = zeroPad(splitted[0], 2)
    splitted[1] = zeroPad(splitted[1], 2)

    return splitted.reverse().join('-');
  }

  export const getToday = () => {
    return convertToDate(new Date());
  }


  export const getMonthYear = (month = THIS_MONTH, year = THIS_YEAR) => {
    return `${zeroPad(month, 2)}-${year}`;
  }

  export const getFutureMonths = (month = THIS_MONTH, year = THIS_YEAR, interactions = 13) => {
      const ret = [];

      for (let i = 0; i < interactions; i++) {
        const value = `${zeroPad(month, 2)}-${year}`
        ret.push( {key: value, value: value, text:value } );

        month++;
        if (month > 12) {
          month = 1;
          year++;
        }

      }
      return ret;
  }

  export const getPreviousMonths = (month = THIS_MONTH, year = THIS_YEAR, interactions = 1) => {
    const ret = [];

    for (let i = 0; i < interactions; i++) {

      month--;
      if (month === 0) {
        month = 12;
        year--;
      }

      const value = `${zeroPad(month, 2)}-${year}`

      ret.push( {key: value, value: value, text:value } );

    }

    return ret;
}

export const dropdownMonthList = () => {

  let prev = [];
  let fut = [];

  prev = getPreviousMonths();

  fut = getFutureMonths();

  return ([ ...prev, ...fut]);

}


  export const getPreviousMonth = (selectedDate) =>{

    const splited = selectedDate.split('-');

    let month = splited[0];

    let year = splited[1];


    if (month === '01') {
      month = '12';
      year--;
    } else {
      month--;
    }

    return `${zeroPad(month, 2)}-${year}`;

  }

  export const convMonthYear = (month, year) => {
    return `${zeroPad(month, 2)}-${year}`;
  }

  export const convDateToMonthYear = (value) => {

    var date = new Date(value);

    return `${zeroPad(date.getMonth() + 1, 2)}-${date.getFullYear()}`;
  }

  export const monthDiff = (dateFrom, dateTo) => {
    const dif = dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));

    return ( dateTo.getFullYear() === 9999 ) ? ''
    : dif + 1;

   }

   export const getMonth = (value) => {

    const splited = value.split('-');
    return Number(splited[0]);

  }

  export const getYear = (value) => {

    const splited = value.split('-');

    return Number(splited[1]);

  }

  export const checkPeriodicity = (init_date, end_date, periodicity) => {
    const monthsDiff = monthDiff( new Date(init_date), new Date(end_date)) - 1;

    const result = ( periodicity - monthsDiff ) % periodicity
    return result === 0 ? true : false;

}




