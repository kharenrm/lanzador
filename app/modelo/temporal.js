{
	"bbva": {
		"uuaa": "qzqc"
	},
	"dtos": [{
		"name": "levelContent",
		"attributes": [{
			"name": "codContenido",
			"type": "String",
			"isKeyField": false,
			"description": "",
			"required": false
		}, {
			"name": "codNivel",
			"type": "Integer",
			"isKeyField": false,
			"description": "",
			"required": false
		}]
	}, {
		"name": "outline",
		"attributes": [{
			"name": "codSecupetiS",
			"type": "Integer"
		}, {
			"name": "desNombre",
			"type": "String"
		}, {
			"name": "desApe1",
			"type": "String"
		}, {
			"name": "desApe2",
			"type": "String"
		}, {
			"name": "codDni",
			"type": "String"
		}, {
			"name": "codCargofun",
			"type": "String"
		}, {
			"name": "codCentcost",
			"type": "String"
		}, {
			"name": "codBcoOpe",
			"type": "String"
		}, {
			"name": "codOfiOpe",
			"type": "String"
		}, {
			"name": "codIdiomiso",
			"type": "String"
		}, {
			"name": "codIdiomint",
			"type": "Integer"
		}, {
			"name": "codPais",
			"type": "String"
		}, {
			"name": "contenidoNivel",
			"type": "List<dto.levelContent>"
		}]
	}, {
		"name": "user",
		"attributes": [{
			"name": "codUsuario",
			"type": "String",
			"isKeyField": false,
			"description": "",
			"required": false
		}, {
			"name": "codSecupeti",
			"type": "Integer",
			"isKeyField": false,
			"description": "",
			"required": false
		}, {
			"name": "xtiMovilidad",
			"type": "String",
			"isKeyField": false,
			"description": "",
			"required": false
		}, {
			"name": "xtiEscenario",
			"type": "String",
			"isKeyField": false,
			"description": "",
			"required": false
		}]
	}],
	"sn": {
		"restlessType": "RESTless",
		"logicalId": "outline",
		"registryId": "SN201400111",
		"version": "V01",
		"description": "SN Outline",
		"backends": "",
		"smcs": [{
			"type": "post",
			"logicalId": "outline",
			"registryId": "SMC201400111",
			"description": "Perfila a un usuario a traves de la QPIPT400",
			"notes": "More text...",
			"gceErrors": ["aliasGCE1", "aliasGCE2"],
			"params": [{
				"name": "user",
				"type": "dto.user",
				"location": "body"
			}],
			"responseType": "dto.outline",
			"transactionInfo": {
				"txId": "outline_ver3",
				"protocol": "OTMA-PG",
				"version": 3,
				"type": 1,
				"subtype": 1,
				"copyPaths": [
					"./Copy_QPIPT400ver1.txt"
				]
			}
		}]
	}
}