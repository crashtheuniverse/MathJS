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

	this.runTests = function() {
				
		print("Running suite " + suiteName);			
		
		passed = true;
				
		for(var i = 0, count = tests.length; i < count; ++i)
		{
			var local = tests[i].t(); 
			var txt = local ? "PASS" : "FAIL";
			this.print("Function:" + tests[i].t.name + " Description:" + tests[i].d + " :" + txt);
			passed = passed & local;
		}
		
		if(passed)
			print("TEST PASSED");
		else
			print("TEST FAILED");
		
		return passed;
	}	
}

function main() { 

	var unit = new TestSuite("Matrix33");
	unit.addTest("Matrix Equality", testEquality);
	unit.addTest("Matrix Transpose", testTranspose);
	unit.addTest("Matrix Multiplication", testMultiply);
	unit.addTest("Axis Angle", testAxisAngle);
	unit.runTests();
}

function testMultiply() { 
	
	var mtx1 = MW.Matrix33.identity(); 
	var mtx2 = mtx1.getCopy();
	mtx1.inverse(); 

	var mtxX = MW.Matrix33.identity();
	mtxX.setRotationX(Math.PI * 0.5);
	var mtxY = MW.Matrix33.identity();
	mtxY.setRotationY(Math.PI * 0.5);
	var mtxZ = MW.Matrix33.identity();
	mtxZ.setRotationZ(Math.PI * 0.5);

	
	var mtxXYZ = MW.Matrix33.identity(); 
	mtxXYZ.fromEulerAnglesXYZ(Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5);

	print(mtxX);
	print(mtxY);
	print(mtxZ);

	print(mtxXYZ);
	
	var mulMatrix = mtxX.getCopy(); 
	mulMatrix.multiply(mtxY);
	mulMatrix.multiply(mtxZ);
			
	if(mtxXYZ.isEqual(mulMatrix))
		return true;
		
	return false;
}

function testEquality() { 
	
	var mtx = MW.Matrix33.identity(); 
	var mtx2 = MW.Matrix33.identity(); 
	
	if(mtx.isEqual(mtx2)) {
		return true;
	}
		
	return false;
}

function testTranspose() { 
	
	var mtxId = MW.Matrix33.identity();
	mtxId.m[1] = 1;
	print(mtxId);
	var mtx2 = mtxId.getTranspose();
	print(mtx2);
	
	if(mtxId.isEqual(mtx2.getTranspose())) {
		return true;
	}
	
	return false;
}

function testAxisAngle() { 
	
	var mtxId = MW.Matrix33.identity();
	var v3 = new MW.Vector3();
	
	v3.x = 1.0;
	v3.y = 0.0; 
	v3.z = 0.0; 
	mtxId.fromAngleAxis(Math.PI * 0.5, v3);
	
 	var mtxX = MW.Matrix33.identity(); 
 	mtxX.setRotationX(Math.PI * 0.5);
 	
 	print(mtxId);
 	print(mtxX);
 	
 	var test = true;
 	
 	if( mtxId.isEqual(mtxX))
 		test = test & true;
 	else
 		test = false;
 	
 	var angleAxis = mtxId.toAngleAxis();
	
	print("Angle" + angleAxis.angle + " Axis" + angleAxis.axis);
	
	if( (angleAxis.angle == Math.PI * 0.5) && angleAxis.axis.isEqual(v3) )
		test = test & true;
	else
		test = false;
	
 	return test;
}

////////////////////////////////////////////////////////////////////////////////////