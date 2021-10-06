export default class UsuarioMetodos {

    constructor(resource) {

        this._resource = resource('');
    }

register(usuario) {
         if (usuario._id) {
             return this._resource
             .update({ id: usuario._id}, usuario);
         } else {
             return this._resource
             .save(usuario);
     }
}
list() {

    return this._resource
        .query()
        .then(res => res.json(), err => {
            console.log(err);
            throw new Error('Não foi possível obter as fotos');
        });
}

pop(id) {
    return this._resource.delete({ id })
    .then (null, err => {
        console.log(err);
        throw new Error('Não foi possível fazer a remoção')});
}

search(id) {
    return this._resource
    .get({ id })
    .then(res => res.json())
}

} 