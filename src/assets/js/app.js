import moment from 'moment'
export function today() {
    const dt = new Date();
    let dia = dt.getDate().toString();
    let mes = (dt.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
    
    let diaF = (dia.length == 1) ? '0'+dia : dia;
    
    let mesF = (mes.length == 1) ? '0'+mes : mes;
    let anoF = dt.getFullYear();

    const rt =  `${anoF}-${mesF}-${diaF}`;
    //console.log(rt)

    return rt
 }
 export function yesterday() {
    const dt = new Date();
    let dia = dt.getDate(dt.setDate(dt.getDate() - 1)).toString();
    let mes = (dt.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
    
    let diaF = (dia.length == 1) ? '0'+dia : dia;
    
    let mesF = (mes.length == 1) ? '0'+mes : mes;
    let anoF = dt.getFullYear();

    const rt =  `${anoF}-${mesF}-${diaF}`;
    // console.log(dia.length);
    // console.log(rt)

    return rt
     
 }
 export function dateFormatter(params) {
    const dt = new Date(params);
    let dia = dt.getDate().toString();
    let mes = (dt.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
    
    let diaF = (dia.length == 1) ? '0'+dia : dia;
    
    let mesF = (mes.length == 1) ? '0'+mes : mes;
    let anoF = dt.getFullYear();

    const rt =  `${diaF}/${mesF}/${anoF}`;
    //console.log(rt)

    return rt
 }
 export function TimeInt(params) {
     let dt = this.today()
     let data = new Date(`${dt}T${params}`);
    console.log(data.getTime());
    return data.getTime();
     
 }
 export function TimeDiff(timein, timeout){
    // let init = timein.split(':')
    // let out = timeout.split(':')
    // return `${init[0] - out[0]}:${init[1] - out[1]}:${init[2] - out[2]}`

    let ms = moment(timein,"HH:mm:ss").diff(moment(timeout,"DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);
    let s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

    console.log('time moment: ',s);
 }
 export function TimeFormatter(params) {
    let d = this.today()
     let dt = new Date(`${d}T${params}`);
     console.log(dt);
     let hours = dt.getHours().toString();
     let h = (hours.length == 1)? '0' + hours: hours;
     let minutes = dt.getMinutes().toString();
     let m = (minutes.length == 1)? '0' + minutes:minutes;
     let seconds = dt.getSeconds().toString();
     let s = (seconds.length == 1)? '0' + seconds: seconds;

     return `${h}:${m}:${s}`;
 }
 export default { today, yesterday, dateFormatter, TimeInt, TimeFormatter,TimeDiff};
