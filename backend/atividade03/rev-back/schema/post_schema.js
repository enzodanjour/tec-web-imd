module.exports = {
    type: "object",
    properties:{
        titulo: {type: "string", maxLenght: 100, minLenght:5},
        senha: {type: "string"}
    },
    required: ["titulo", "texto"],
    additionalProperties: false
}