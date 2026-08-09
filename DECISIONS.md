# DECISIONS.md

## Banco de dados

Postgres + timescaleDB

O caso de uso é essencialmente séries temporais, cada dispositivo publica uma leitura a
cada poucos segundos, e as consultas mais importantes, no contexto atual, são "último valor" e "histórico das
últimas N horas". O Postgres me dá modelo relacional, com `JSONB` para o payload variável
(`object`); o TimescaleDB entra por cima para, quando o
volume crescer, transformar a tabela de leituras em *hypertable* e usar particionamento por
tempo, políticas de retenção e *continuous aggregates* (downsampling).

Alternativas consideradas:
- **Postgres puro**: suficiente hoje, mas eu teria que montar particionamento e retenção na
  mão conforme o volume subisse. O TimescaleDB é um superset, então adotá-lo não custaria nada.
- **InfluxDB / bancos time-series dedicados**: ótimos para métricas, mas eu perderia o
  relacional e o ecossistema Django/ORM.

Suposições de escala: centenas a milhares de dispositivos, uma leitura a cada ~3s (intervalo
do gerador) — volume cresce muito linearmente com o tempo.

> Honestidade: hoje uso a **imagem** do TimescaleDB, mas a migration ainda cria uma tabela
> Postgres comum — não converti `DeviceReading` em hypertable nem configurei retenção. A
> infraestrutura está pronta; virar hypertable ficou como próximo passo.

## Modelagem de dados

Duas entidades:

- **`Device`** — identidade e metadados do aparelho: `devEui` (chave primária),
  `deviceName`, `deviceProfileId`, `deviceProfileName`.
- **`DeviceReading`** — chave primária composta (`device`, `time`),
  FK para `Device` e o campo `object` como `JSONField`/`JSONB`.

Separei metadados dos dispositivos do das das leituras para não repetir
perfil/nome em cada linha e manter enxuta a tabela de leituras. 
A **chave composta (device, time)** modela naturalmente a série temporal
por dispositivo e serve de deduplicação básica: duas leituras do mesmo aparelho no mesmo
instante colidem.

Sobre o **`object`**, guardo o payload **como veio, em JSONB**, em vez de espalhá-lo em colunas
fixas. Assim, um novo modelo de sensor com chaves diferentes pode ser ingerido sem a necessidade de migrations, ficando o frontend responsável por definir como apresentar esses parâmetros.

## Arquitetura e API

Fluxo **MQTT → backend → frontend**, com o back-end em Clean Architecture:

- **Consumidor MQTT** assina `application/+/device/+/event/up`, o tópico de
  uplink do ChirpStack. A cada mensagem, extrai `deviceInfo`, `time` e `object` e chama o
  caso de uso `IngestSensorData`. Roda como management command Django
  (`start_sensor_ingestion`), reaproveitando ORM/settings.
- **backend(Django/DRF)**: Prove uma API rest para o consumo da dashboard.
- **frontend (Next.js)**: lista dispositivos mostrando o estado atual em
  cartões e abre gráficos de histórico por métrica.

API exposta (REST, JSON):
- `GET /devices` — lista paginada, com `search`, `sortBy` e `sortOrder`.
- `GET /devices/{devEui}` — metadados de um dispositivo.
- `GET /devices/{devEui}/current-reading` — última leitura (estado atual).
- `GET /devices/{devEui}/reading-history?hours=N` — histórico das últimas N horas.

## Suposições

Não entendi a pergunta

## Trade-offs e o que ficou de fora

Priorizei o caminho de ponta a ponta funcionando — ingestão MQTT, persistência, os quatro
endpoints e um dashboard navegável com estado atual e histórico — sobre uma arquitetura limpa
e testável.

Ficou de fora, de propósito, para caber no tempo:
- **Virar `DeviceReading` em hypertable** e configurar retenção/continuous aggregates: a
  imagem do TimescaleDB está lá, mas ainda não explorei os recursos dele.
- **Downsampling do histórico:** hoje o endpoint devolve todos os pontos da janela; com 7
  dias a 1 leitura/3s isso é muito ponto. Agregar por bucket seria o
  próximo passo.
- **Cobertura de testes:** a estrutura permite testar os casos de uso isoladamente
  (repositórios são interfaces), mas faltam os testes em si.
- **Expansão do período do histórico:** atualmente, o dashboard permite visualizar o histórico em uma janela de até 1 hora. Permitir períodos maiores seria um próximo passo, especialmente em conjunto com o downsampling dos dados.


## Uso de IA

Utilizei o **Claude Code** ao longo do desafio. A IA me ajudou principalmente em:

* **Geração de código:** criação de código a partir de prompts e exemplos.
* **Resolução de problemas:** compreensão dos problemas e busca por soluções mais adequadas.
* **Aprendizado:** aprendizado de ferramentas e tecnologias com as quais ainda não havia tido contato, como Django, MQTT, TimescaleDB, entre outras.

A IA acelerou significativamente o processo de desenvolvimento, mas todo o código gerado foi revisado, testado e questionado por mim antes de ser entregue.
