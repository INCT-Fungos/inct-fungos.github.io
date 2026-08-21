<p align="center"> <img src="https://inct-fungos.imd.ufrn.br/img/Fungos_BR.png" alt="Descrição" width="150" /> </p>

# INCT Fungos do Brasil

# POP 1: Extração, análise de qualidade **e** envio de DNA

## Manual do Usuário

**Objetivo:** Orientar os pesquisadores da rede INCT Fungos do Brasil sobre os procedimentos de extração, purificação e os critérios mínimos de qualidade e quantidade para o envio de amostras de DNA genômico destinadas ao sequenciamento (*PCR-free library* *prep. Illumina*).

## 1. Verificação da Pureza das Culturas

> ***ATENÇÃO:*** *Este é um passo importante antes de qualquer extração de DNA. O sequenciamento genômico é extremamente sensível e detectará qualquer contaminante presente na cultura. Um genoma contaminado com DNA de outro microrganismo (bactéria, levedura ou outro fungo) compromete completamente a montagem e a análise, resultando em desperdício de recursos e necessidade de resequenciamento.*

### 1.1. Obtenção de culturas monospóricas (Fortemente Recomendado)

Para garantir a pureza genética da amostra, é **fortemente recomendado** que o DNA seja extraído a partir de **culturas** **monospóricas** (derivadas de um único esporo). Esse procedimento assegura que todo o material genético pertence a um único indivíduo, eliminando a possibilidade de mistura de genótipos distintos — mesmo dentro da mesma espécie. Culturas originadas de fragmentos de micélio ou de múltiplos esporos podem conter variantes genéticas que dificultam a montagem do genoma.

### 1.2. Checagem visual e microbiológica antes da extração

Antes de iniciar a extração de DNA, o pesquisador deve realizar uma inspeção rigorosa da cultura:

| **Tipo de Cultivo**      | **O que verificar**                                                                                           | **Sinais de Contaminação (NÃO extrair)**                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Meio Sólido (Placa)**  | Colônia uniforme em morfologia, cor e textura. Ausência de colônias satélites ou zonas com aspecto diferente. | Colônias bacterianas (pontos brilhantes, mucoides); crescimento de outro fungo com morfologia distinta; bordas irregulares com coloração diferente.                                   |
| **Meio Líquido (Caldo)** | Crescimento micelial homogêneo (pellets ou tapete). Meio claro entre as massas miceliais.                     | **Turbidez do meio** (indicativo clássico de contaminação bacteriana); biofilme na superfície; mudança de cor ou odor atípico do meio; presença de estruturas diferentes do esperado. |

### 1.3. Procedimentos em Caso de Suspeita de Contaminação

Se houver qualquer suspeita de contaminação, o pesquisador **não deve prosseguir** com a extração de DNA. As seguintes ações são recomendadas:

1. Repicar a cultura em meio novo a partir de uma região aparentemente pura (ponta de hifa).

2. Realizar nova cultura monospórica a partir de esporos isolados.

3. Caso o fungo não esporule, realizar diluição seriada de fragmentos de hifa e replaqueamento.

4. Após obter uma nova cultura limpa, aguardar o crescimento completo e repetir a checagem visual antes de extrair.

### 1.4. Confirmação Opcional por Microscopia

Para maior segurança, recomenda-se observar uma pequena porção da cultura em microscópio óptico (aumento de 400x a 1000x) para confirmar a ausência de células bacterianas (bastonetes ou cocos) entre as hifas fúngicas.

## 2. Diretrizes para extração de DNA

A obtenção de DNA de qualidade molecular (alto peso molecular, íntegro) é o segundo passo mais crítico para o sucesso do sequenciamento genômico. Os pesquisadores devem adotar protocolos rigorosos para garantir a integridade e pureza do material.

**Método de Extração:** Não exigimos um kit ou protocolo comercial específico, mas o pesquisador **deve informar obrigatoriamente** o método utilizado na planilha de envio (ex: *CTAB, Kit Qiagen DNeasy Plant, Kit Zymo Research*, fenol-clorofórmio, etc.). Isso auxilia na identificação de possíveis inibidores residuais caso haja falha no sequenciamento.

### Recomendações Gerais para Extração:

| **Aspecto**                    | **Recomendação**                                                                                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Material de partida**        | Utilize culturas jovens (3-7 dias para a maioria dos fungos filamentosos) e saudáveis para minimizar a presença de metabólitos secundários e polissacarídeos.                 |
| **Lise celular**               | Evite o excesso de agitação mecânica (vortex) prolongada durante a lise para não fragmentar o DNA. Prefira maceração com nitrogênio líquido ou beads com pulsos curtos.       |
| **Fungos** **melanizados**     | Para fungos melanizados ou ricos em polissacarídeos, considere etapas adicionais de purificação (ex: precipitação com CTAB/NaCl ou uso de colunas de purificação adicionais). |
| **RNase**                      | Trate com RNase A para eliminar RNA, que pode interferir na quantificação e na preparação da biblioteca.                                                                      |
| **Armazenamento pós-extração** | Armazene o DNA a -20 °C (curto prazo) ou -80 °C (longo prazo). Evite ciclos de congelamento/descongelamento repetidos.                                                        |

## 3. Condições Mínimas de Qualidade e Quantidade do DNA

Para que a amostra seja aceita pelo Comitê e enviada à facility nos EUA, ela deve cumprir **estritamente** os seguintes parâmetros:

| **Parâmetro**              | **Requisito Mínimo**                       | **Observações**                                                                                                                    |
| -------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Quantidade de DNA**      | ≥ 500 ng (total)                           | Necessário para preparo de biblioteca PCR-free.                                                                                    |
| **Concentração Mínima**    | ≥ 10 ng/µL                                 | Recomendamos enviar mais concentrado se possível.                                                                                  |
| **Volume da Amostra**      | 20 µL a 50 µL                              | -                                                                                                                                  |
| **Tampão de Suspensão**    | Água ultrapura ou Tampão **LIVRE DE EDTA** | **Proibido o uso de tampão TE padrão**. O EDTA inibe reações enzimáticas subsequentes.                                             |
| **Pureza (Razão 260/280)** | Entre 1.6 e 2.0                            | Medido via NanoDrop ou espectrofotômetro similar.                                                                                  |
| **Pureza (Razão 260/230)** | ≥ 1.8                                      | Medido via NanoDrop. Valores baixos indicam contaminação por carboidratos, sais ou fenol.                                          |
| **Integridade (Tamanho)**  | > 50% dos fragmentos maiores que 2 kb      | Verificado por Gel de Agarose (0.8% a 1%) ou Bioanalyzer/TapeStation. O DNA não pode estar severamente degradado/arrastado no gel. |
| **Quantificação Oficial**  | Ensaio Fluorométrico (ex: Qubit)           | A quantificação final informada na planilha deve ser feita por fluorometria. O NanoDrop superestima a concentração de DNA.         |

## 4. Instruções para acondicionamento local

As amostras devem ser armazenadas em microtubos de 1.5 mL ou 2.0 mL estéreis, livres de DNase e RNase. Os tubos devem ser claramente identificados no topo e na lateral com o **Código da Amostra** (conforme registrado na planilha de envio), utilizando caneta permanente resistente a álcool e congelamento. As amostras devem ser mantidas a -20 °C (ou -80 °C) até o momento do envio para o Ponto Focal/Hub Regional. 

## 5. Como Proceder se o Laboratório não possuir **Qubit** **ou** NanoDrop?

O INCT Fungos do Brasil opera em rede. Caso o seu laboratório não possua infraestrutura para quantificação fluorométrica (Qubit) ou avaliação de pureza (NanoDrop), siga o **Plano de Logística Nacional**. Você deverá extrair o DNA, realizar a verificação inicial em gel de agarose e enviar a amostra para o seu **Hub Regional de Apoio** para a validação final de qualidade antes do envio ao Ponto Focal.

## 6. Documentação Necessária

Toda amostra deve ser acompanhada do preenchimento da **Planilha 1: Envio de Amostras de DNA**. Esta planilha deve ser enviada digitalmente ao Comitê e uma cópia impressa deve acompanhar o pacote físico.



![](/home/jpmslima/coding/inct-fungos.github.io/img/banner-bottom.png)
