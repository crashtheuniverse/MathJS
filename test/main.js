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

function main() { 

	var unit = new TestSuite("Matrix33");
	unit.addTest("From Axis Angle", testFromAxisAngle);
	unit.addTest("Get / Set Column", testGetSetColumn);
	unit.addTest("Matrix Equality", testEquality);
	unit.addTest("Matrix Transpose", testTranspose);
	unit.addTest("Matrix Multiplication", testMultiply);
	unit.addTest("To Axis Angle", testAxisAngle);
	unit.addTest("Scalar multiply", testScalarMultiply);
	unit.addTest("Matrix inversion", testMatrixInverse);
	unit.addTest("Determinant", testMatrixDet);
	unit.runTests();
}

function testFromAxisAngle() { 
	
	var m1 = mw.m33(); 
	var m2 = mw.m33();
	var axis = mw.v3(); 
	axis.zero();
	axis.x = 1.0; 
	
	m1.setRotationX(Math.PI * 0.5);
	m2.fromAngleAxis(Math.PI * 0.5, axis);
	
	print(m1);
	print(m2);
	
	if(m1.isEqual(m2))
		return true;
		
	return false;
}


function testGetSetColumn() { 
	
	var m = mw.m33();
	m.setZero(); 
	m.m[1] = 2.0;
	m.m[4] = 2.0;
	m.m[7] = 2.0;
	
	var v1 = m.getColumn(1);
	
	var v2 = mw.v3();
	v2.set(2.0);
	print(v2);
	
	var pass = true; 
	
	if(v2.isEqual(v1))
		pass = true;
	else
		pass = false;
		
	var m2 = mw.m33();
	m2.setZero();
	var vNull = mw.v3(); 
	vNull.set(0.0);

	print(m);
	
	m.setColumn(0, vNull);
	m.setColumn(1, vNull);
	m.setColumn(2, vNull); 
	
	print(m);
	
	if(m.isEqual(m2))
		pass = pass & true;
	else
		pass = false;

	return pass; 
}

function testMatrixDet() { 
	
	var m = mw.m33(); 
	m.fromEulerAnglesXYZ(0.0, 0.0, Math.PI * 0.5);
	
	var d = m.getDeterminant(); 
	
	if(d === 1.0)
		return true;
		
	return false;	
}


function testMatrixInverse() {
	
	var m = mw.m33();
	m.setRotationX(Math.PI * 0.5);
	
	var m2 = mw.m33();
	m2.setRotationX(-Math.PI * 0.5);
	m2.inverse(); 
	
	print(m); print(m2);
	
	if(m2.isEqual(m))
		return true;
		
	return false;		
}


function testScalarMultiply() {
	
	var mtx1 = MW.Matrix33.identity();
	mtx1.scalarMultiply(2.0);
	
	var mtx2 = MW.Matrix33.identity();
	mtx2.setScale(2.0);
	
	print(mtx1);
	print(mtx2);
	
	if(mtx1.isEqual(mtx2))
		return true;
		
	return false;
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