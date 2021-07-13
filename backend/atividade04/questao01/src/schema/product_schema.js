module.exports = {
    type: "object",
    properties:{
        nome: {type: "string"},
        descricao: {type: "string", maxLength: 100, minLength:5},
        preco: {type: "number"},
        tags: {type: "array",items:{type:"string"}}//https://json-schema.org/understanding-json-schema/reference/array.html
    },
    required: ["nome", "preco"],
    additionalProperties: false
}