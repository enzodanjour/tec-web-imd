module.exports = {
    type: "object",
    properties:{
        nome: {type: "string"},
        descrição: {type: "string", maxLength: 100, minLength:5},
        preço: {type: "number"},
        tags: {type: "array","items":{"type":"string"}}//https://json-schema.org/understanding-json-schema/reference/array.html
    },
    required: ["nome", "descrição","tags"],
    additionalProperties: false
}