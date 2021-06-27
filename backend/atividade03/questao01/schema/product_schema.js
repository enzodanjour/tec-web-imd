module.exports = {
    type: "object",
    properties:{
        nome: {type: "string"},
        descrição: {type: "string", maxLength: 100, minLength:5},
        preço: {type: "number"}
    },
    required: ["nome", "descrição"],
    additionalProperties: false
}