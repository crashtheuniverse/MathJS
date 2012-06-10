/**
 * @author CrashTheuniversE
 */
function print(str) {
	
	var txt = document.createElement('p');
	txt.innerText = str;
	document.body.appendChild(txt);
}

TestSuite = function(name) { 
	
	var tests = [];
	var passed = true;
	var suiteName = name || "Generic";
	
	this.addTest = function(desc, test) {
		tests.push({d: desc, t: test});	
	}
	
	this.print = function(str) {
		var txt = document.createElement('p');
		txt.innerText = str;
		document.body.appendChild(txt);
	}

	this.printHeader = function(str) { 
		
		var txt = document.createElement('h2');
		txt.innerText = str;
		document.body.appendChild(txt);
	}

	this.runTests = function() {
				
		this.printHeader("Running suite " + suiteName);			
		this.printHeader("------------------------------------");
		
		passed = true;
				
		for(var i = 0, count = tests.length; i < count; ++i)
		{
			var local = tests[i].t(); 
			var txt = local ? "PASS" : "FAIL";
			this.printHeader("Function:" + tests[i].t.name + " Description:" + tests[i].d + " :" + txt);
			passed = passed & local;
		}
		
		if(passed)
			this.printHeader("TEST PASSED");
		else
			this.printHeader("TEST FAILED");
		
		return passed;
	}	
}
