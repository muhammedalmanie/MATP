var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'MATP',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'matp',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjER1pZezAQImdUl2SOUP267deP4+HYol0inYz6BIQdrHdOrM9dwZ0Ie19FJQ9Td/ZoE47JOl3maDq0DLttI1s5W3qtRie/SbdK4ev/yb66udNyUqIoHZFvmXfz5rN5Irihu/bqkvHCF9r7HE8CxjmENjRRFpXBUlpiTeXkpvRlIAhqs6fEZRoXWczbLPitT7AwxwpxBLiGxPn8vVxEfbN9Dw/AsCSXb/xetB4SojHpCoHM4AO7OSXcjlenPKpI8nmlrDHqab3cQi4pGiV5p/wmws/O/xpFqeTdLUEEgr4JxuiptpLcuuths+ADvs8mydkPNP+DUblg8mgQHMs7XVJQIDAQAB',

    credentials: {
        secret: 'hNAbwdmM9JfD6qQakW9VuZXf3s310beJ'
    }
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};