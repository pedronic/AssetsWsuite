export default {
    methods: {
        kebabCaseFormatter(string){ 
            let lowered = string.toLowerCase();
            let replaced = lowered.replace(/ç|¢|©/g,'c');
            replaced = replaced.replace(/á|à|ã|â|ä|æ|ª/g,'a');
            replaced = replaced.replace(/é|è|ê|ẽ|ë/g,'e');
            replaced = replaced.replace(/í|ì|î|ï|ĩ/g,'i');
            replaced = replaced.replace(/ó|ò|õ|ô|ð|ö|ø|º̣|°/g,'o');
            replaced = replaced.replace(/ú|ù|û|ũ|ü|µ/g,'u');
            replaced = replaced.replace(/_|\/|\\|-/g,' ');
            let splited = replaced.split(' ');
            return splited.join('-');
        }            
    }
}
// ¬¹²³£¢¬§/?°®ŧ←↓→øþ´ªæßððððđŋħ̉̉̉ĸł´´~ºº«»©“”µ─·