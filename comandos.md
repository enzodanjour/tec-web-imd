1-
 CREATE USER developer 
    -> IDENTIFIED BY 'facil';
2- 
GRANT SELECT, INSERT, UPDATE ON aula_quatorze.pacientes TO developer;
GRANT SELECT, INSERT, UPDATE ON aula_quatorze.atendimentos TO developer;
GRANT SELECT, INSERT, UPDATE ON aula_quatorze.ATENDIMENTOS TO developer;

3- 
GRANT CREATE, ALTER ON aula_quatorze.* TO developer;

4-
INSERT INTO aula_quatorze.atendimentos
(ate_codigos, ate_data, ate_diagnostico, pac_codigo)
VALUES(0, curdate(), 'morte subita', 10);

5-CREATE TABLE aula_quatorze.medicos(med_crm INT PRIMARY KEY, med_nom VARCHAR(255) NOT NULL, med_especialidade VARCHAR(255) NOT NULL );

6- ALTER TABLE aula_quatorze.medicos ADD med_salario DEC NOT NULL;

