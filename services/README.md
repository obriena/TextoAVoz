# Development
Hay es un archivo aquí: ./src/main/java/resources llamada credenciales.txt. 


Esta archivo mira igual a:
```
{
  "apikey": "your API Key",
  "iam_apikey_description": "Auto-generated for key ",
  "iam_apikey_name": "Auto-generated service credentials",
  "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
  "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/34662a492545e209b6e1f0178bb0131b::serviceid:ServiceId-1da383b3-70f2-4aaf-8c9e-ed7748ba1153",
  "url": "<url>/speech-to-text/api"
}
```
Necesitas va a http://cloud.ibm.com y crear esta archivo.

Puedes leer más [aquí](../README.md)

# Dev Ops
## Docker:
Comando a construir imagen:
```
docker build -t flyingspheres/textoadockevoz:0.1 .
```
comand a correar la imagen:
```
'docker run -p 9080:9080 -d flyingspheres/textoadockevoz:0.1'
```


# Deploying to Cloud Foundry:
```
ibmcloud login

ibmcloud target --cf
aarons-mbp:services aaron$ ibmcloud target --cf
Targeted Cloud Foundry (https://api.us-south.cf.cloud.ibm.com)

Targeted org flyingspheres

Targeted space dev


                      
API endpoint:      https://cloud.ibm.com   
Region:            us-south   
User:              aaron@flyingspheres.com   
Account:           Aaron OBrien's Account (34662a492545e209b6e1f0178bb0131b)   
Resource group:    No resource group targeted, use 'ibmcloud target -g RESOURCE_GROUP'   
CF API endpoint:   https://api.us-south.cf.cloud.ibm.com (API version: 2.142.0)   
Org:               flyingspheres   
Space:             dev   

```

OpenSSL> s_client -connect cluster0-shard-00-02-gmcxk.mongodb.net:27017 -showcerts

https://stacktracelog.blogspot.com/2018/09/certificate-chaining-error-ssl.html

keytool -importcert -file ./cert1.cer -keystore ./key.jks -storepass transcribir -storetype jks