/*
 * Create and Export Configuration Variables
 *
 */

 // Containers for all Environment

 var environment = {};

 // Staging (default) environments
 environment.staging = {
    "httpPort" : 2000,
    "envName" : "staging"
 };

 // Production Environment
 environment.production = {
    "httpPort": 4000,
    "envName" : "Prouction"
 };

// Determine which environment was passed as a command-line argument
var currentEnvornment = typeof(process.env.NODE_ENV) == "string" ? process.env.NODE_ENV.toLowerCase() : "";

// Check the current environmen is the one of the environment above, if not, default to staging
var environmentToExport = typeof(environment[currentEnvornment]) == "object" ? environment[currentEnvornment] : environment.staging;

// Export the module
module.exports = environmentToExport;

// run following comment if cannot use NODE_ENV in command prompt 
// npm install -g win-node-env