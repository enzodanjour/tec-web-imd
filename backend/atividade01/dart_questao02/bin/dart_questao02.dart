import 'dart:io';

import 'package:dart_questao02/dart_questao02.dart' as dart_questao02;

void main(List<String> arguments) {
  print('Entre com um valor: ');
  var _input = stdin.readLineSync();
  
  //verifica se consegue converter para inteiro, 
  //caso não consiga não é um valor numérico
  try {
    var parse = int.parse(_input);
    parse = dart_questao02.calculateFunction(parse);
    print(parse);
  } catch (e) {
    print('não é um número');
  }
}
