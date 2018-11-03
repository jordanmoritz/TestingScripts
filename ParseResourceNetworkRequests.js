//Pulls the Request URL for all navigation entries into an array
function getRequests(entries) {
    var requestURLs = [];
    var i;
    for (i = 0; i < entries.length; i++) {
        requestURLs.push(entries[i]['name']);
    }
return requestURLs;
}

//Pulls all Request URLs for that specific resource into an array
function getResource(requestURLs, resource) {
	var resourceURLs = [];
	var i;
	for (i = 0; i < requestURLs.length; i++) {
		if (requestURLs[i].indexOf(resource) > 1) {
			resourceURLs.push(requestURLs[i]);
        }
    }
return resourceURLs;
}

//Uses resource, eval and validity arrays and outputs results
function validateResource(resourceURLs, evalCriteria, validationCriteria) {
	var checkResource = [];
	var r;
	for (r = 0; r < resourceURLs.length; r++) {
		if (resourceURLs[r].indexOf(evalCriteria) > 1) {
			checkResource.push(resourceURLs[r]);
        }
    }
	console.log('/////////////////////////////////////');
	console.log('Hits Identified:', checkResource.length);
	console.log('-------------------------------------');

	for (r = 0; r < checkResource.length; r++) {
		var resourceParams = checkResource[r].split('?');
		resourceParams = resourceParams[1].split('&');
		//console.log(resourceParams);

		var validParam = 0;
		var p;
		for (p = 0; p < resourceParams.length; p++) {

			var c;
			for (c = 0; c < validationCriteria.length; c++) {
				//console.log('Resource Numer:', r, 'and', resourceParams[p], 'and', validationCriteria[c]);
                if (resourceParams[p].indexOf(validationCriteria[c]) >= 0) {
                    resourceValue = resourceParams[p].split('=');
                    console.log(validationCriteria[c], 'found and returned', resourceValue);
                    validParam += 1;
                }
            }
        }
		if (validParam == validationCriteria.length) {
			console.log('No issues detected with hit', r);
			console.log('-------------------------------');
        } else {
			console.log('Hit', r, 'invalid. Expected', validationCriteria.length, 'only matched', validParam);
        }
    }
}

//Source of performanceTiming entries
var entries = window.performance.getEntries();

//Returned array of REquest URLs from entries
var requestURLs = getRequests(entries);

//Specific resource to identify
var resource = 'www.google-analytics.com/collect';

//Returned array of Request URLs for the resource
var resourceURLs = getResource(requestURLs, resource);

//Criteria for whether an element of resource URLs should be examined
var evalCriteria = '&t=pageview&';

//What to check for in a particular resource 
var validationCriteria = ['cd=1', 'cd=2', 'cd=3', 'cd=4', 'cd=5', 'cd=10', 'cd=11', 'cd=12', 'cd=13', 'cd=15']

validateResource(resourceURLs, evalCriteria, validationCriteria);
