const {ClientSecretCredential} = require('@azure/identity')
const {SecretClient} = require('@azure/keyvault-secrets')

const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

let appInsights = require('applicationinsights')

appInsights.setup()
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start()

const app = express()
app.use(bodyParser.json())

const credential = new ClientSecretCredential(
    '90386a23-5656-47c3-bd6f-ca12bf2b8ed4',  // tenantId
    'afe7a68d-dc06-45d3-b408-802e57cd7b9b', // clientId
    '97c7Q~bvFiupm45JCgIHnC5nbb.cFpmLVo1VW' // client secret
)

const client = new SecretClient('https://myvaultke.vault.azure.net/', credential)


app.get('/api/hello', async (req, res) => {

    const response = await client.getSecret('mysecret')
    res.status(421).send('secret: '+response.value)
})

app.get('/api/merhaba', (req, res) => {

    res.status(521).send('secret: '+response.value)
})

app.post('/api/name', (req, res) => {

    const body = _.pick(req.body, ['firstName','lastName'])
    console.log(body)
    res.send('Hello '+body.firstName+' '+body.lastName)
})

app.listen(8080, () => {
    console.log('app server is running')
})