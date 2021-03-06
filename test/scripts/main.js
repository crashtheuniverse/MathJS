/**
 * @author CrashTheuniversE
 */

require(["mathjs", "aux"], function(mathjs, aux) {

function main() { 

	var unit = new TestSuite("Matrix");
	unit.addTest("Matrix4", testMatrix4);
	unit.addTest("Long chaining", testChaining);
	unit.addTest("Matrix22", testMatrix22);
	unit.addTest("Vector Matrix Multiply", testVectorMatrixMul);
	unit.addTest("From Axis Angle", testFromAxisAngle);
	unit.addTest("Get / Set Column", testGetSetColumn);
	unit.addTest("Matrix Equality", testEquality);
	unit.addTest("Matrix Multiplication", testMultiply);
	unit.addTest("To Axis Angle", testAxisAngle);
	unit.addTest("Scalar multiply", testScalarMultiply);
	unit.addTest("Matrix inversion", testMatrixInverse);
	unit.addTest("Determinant", testMatrixDet);
	unit.runTests();
}

function testMatrix4() { 
	
	var pass = true; 
	
	var mi = MW.m44().identity(); 
	var m0 = MW.m44().zero(); 
	
	var m3 = MW.m33().makeRotationX(Math.PI);
	var m4 = MW.m44().makeRotationX(Math.PI);
	
	var s3 = m4.getMatrix33(); 
	
	if(!s3.equal(m3))
		pass = false;
	
	var m4n = MW.m44();
	m4n.copy(m4);
			
	m4.inverse(); 
	s3 = m4.getMatrix33(); 
	m3.inverse();

	if(!s3.equal(m3))
		pass = false;
	 
	//A * Ainverse = Identity
	m4n.multiply(m4);
	if(!m4n.equal(MW.m44().identity()))
		pass = false;
	
	var v = MW.v4().zero(); 
	v.x = 1.0; 
	v.w = 1.0;
	
	mr = MW.m44().makeRotationZ(Math.PI * 0.5);
	var vr = mr.vectorMultiply(v);
	
	var v2 = MW.v4();
	v2.set(0.0, 1.0, 0.0, 1.0);
	
	if(!vr.equal(v2))
		pass = false;
	
	
	var mri = MW.m44().fromEulerAnglesXYZ(0.0, Math.PI, 0.0);
	var mry = MW.m44().makeRotationY(Math.PI);
	
	if(!mri.equal(mry))
		pass = false; 
		
	mri.inverse(); 
	mry.transpose(); 
	
	if(!mri.equal(mry))
		pass = false;
		
	return pass;
}

function testChaining() { 
	
	var m = MW.m22().identity().scalarMultiply(2.0).inverse();
	var mx = MW.m22().identity().makeScale(0.5, 0.5);
	
	if(m.equal(mx))
		return true;

	return false;	
}

function testMatrix22() {
	
	var pass = true;

	var m2 = mw.m22(); 
	
	m2.identity(); 
	if(m2.determinant() !== 1.0) {
		pass = false;
	}
	
	m2.zero();
	if(m2.determinant() !== 0.0) {
		pass = false;
	}
	
	m2.makeScale(2.0, 2.0);
	var m2x = mw.m22(); 
	m2x.identity().scalarMultiply(2.0);
	
	if(!(m2.equal(m2x))) {
		pass = false;
	}
	
	var m_0 = mw.m22().identity(); 
	var m_1 = mw.m22().zero();
	 
	var m_2 = mw.m22().makeScale(2.0, 2.0);
	if(!(m_2.trace() === 4.0)) {
		pass = false;
	}
	if(!(m_2.determinant() === 4.0)) {
		pass = false;
	}

	var m_3 = mw.m22().copy(m_2);
	if(!(m_3.equal(m_2))) {
		pass = false;
	}

	var m_4 = mw.m22().makeRotation(Math.PI * 0.5);
	var m_5 = mw.m22().copy(m_4);
	
	if(!(m_4.inverse().equal(m_5.transpose()))) {
		pass = false;
	}
	
	var m_6 = mw.m22().makeScale(2.0, 2.0);
	var m_7 = mw.m22().identity().scalarMultiply(2.0);
	
	if(!(m_6.equal(m_7))) {
		pass = false;
	}

	// m_0.identity();
	// m_0.zero();
	// m_0.determinant();
	// m_0.trace(); 
	// m_0.scale();
	// m_0.copy();
	// m_0.transpose();
	// m_0.inverse();
	// m_0.equal();
	// m_0.scalarMultiply();
	//x// m_0.vectorMultiply(); 
	// m_0.multiply();
	// m_0.makeScale(); 
	// m_0.makeRotation(); 
	//x// m_0.setColumn();
	//x// m_0.getColumn(); 
	// m_0.toString(); 
	
	return pass;
}

function testVectorMatrixMul() {
	
	var m = mw.m33();
	var v = mw.v3();
	v.set(1.0, 0.0, 0.0);
	m.makeRotationZ(Math.PI * 0.5);
	
	var v2 = m.vectorMultiply(v);
	
	var vy = mw.v3(); 
	vy.set(0.0, 1.0, 0.0);
	
	print(m);
	print(v);
	print(v2);
	print(vy);
	
	if(v2.equal(vy)) {
		return true;
	}
		
	return false;
}

function testFromAxisAngle() { 
	
	var m1 = mw.m33(); 
	var m2 = mw.m33();
	var axis = mw.v3(); 
	axis.zero();
	axis.x = 1.0; 
	
	m1.makeRotationX(Math.PI * 0.5);
	m2.fromAngleAxis(Math.PI * 0.5, axis);
	
	print(m1);
	print(m2);

	if(m1.equal(m2))
		return true;
		
	return false;
}


function testGetSetColumn() { 
	
	var m = mw.m33();
	m.zero(); 
	m.m[1] = 2.0;
	m.m[4] = 2.0;
	m.m[7] = 2.0;
	
	var v1 = m.getColumn(1);
	
	var v2 = mw.v3();
	v2.set(2.0);
	print(v2);
	
	var pass = true; 
	
	if(v2.equal(v1))
		pass = true;
	else
		pass = false;
		
	var m2 = mw.m33();
	m2.zero();
	var vNull = mw.v3(); 
	vNull.set(0.0);

	print(m);
	
	m.setColumn(0, vNull);
	m.setColumn(1, vNull);
	m.setColumn(2, vNull); 
	
	print(m);
	
	if(m.equal(m2))
		pass = pass & true;
	else
		pass = false;

	return pass; 
}

function testMatrixDet() { 
	
	var m = mw.m33().fromEulerAnglesXYZ(0.0, 0.0, Math.PI * 0.5); 
	if(m.determinant() !== 1.0) {
		return false;
	}
	
	return true;
}


function testMatrixInverse() {
	
	var m = mw.m33().makeRotationX(Math.PI * 0.5);
	var m2 = mw.m33().makeRotationX(-Math.PI * 0.5).inverse();
	print(m);
	print(m2);
	if(m2.equal(m)) {
		return true;
	}	
	
	return false;		
}


function testScalarMultiply() {
	
	var mtx1 = MW.m33().identity().scalarMultiply(2.0);
	var mtx2 = MW.m33().makeScale(2.0, 2.0, 2.0);
	
	print(mtx1); print(mtx2);
	
	if(mtx1.equal(mtx2)) {
		return true;
	}
	return false;
}

function testMultiply() { 
	
	var mtx1 = MW.m33().identity(); 
	var mtx2 = MW.m33().copy(mtx1); 
	mtx1.inverse(); 

	var mtxX = MW.m33().makeRotationX(Math.PI * 0.5); 
	var mtxY = MW.m33().makeRotationY(Math.PI * 0.5);
	var mtxZ = MW.m33().makeRotationZ(Math.PI * 0.5);
	
	var mtxXYZ = MW.m33().identity(); 
	mtxXYZ.fromEulerAnglesXYZ(Math.PI * 0.5, Math.PI * 0.5, Math.PI * 0.5);

	print(mtxX);
	print(mtxY);
	print(mtxZ);

	print(mtxXYZ);
	
	var mulMatrix = MW.m33().copy(mtxX); 
	mulMatrix.multiply(mtxY);
	mulMatrix.multiply(mtxZ);
			
	if(mtxXYZ.equal(mulMatrix))
		return true;
		
	return false;
}

function testEquality() { 
	
	var mtx = MW.m33().identity(); 
	var mtx2 = MW.m33().identity(); 
	
	if(mtx.equal(mtx2)) {
		return true;
	}
		
	return false;
}

function testAxisAngle() { 
	
	var mtxId = MW.m33().identity();
	var v3 = new MW.Vector3();
	
	v3.x = 1.0;
	v3.y = 0.0; 
	v3.z = 0.0; 
	mtxId.fromAngleAxis(Math.PI * 0.5, v3);
	
 	var mtxX = MW.m33().makeRotationX(Math.PI * 0.5); 
 	
 	print(mtxId);
 	print(mtxX);
 	
 	var test = true;
 	
 	if( mtxId.equal(mtxX))
 		test = test & true;
 	else
 		test = false;
 	
 	var angleAxis = mtxId.toAngleAxis();
	
	print("Angle" + angleAxis.angle + " Axis" + angleAxis.axis);
	
	if( (angleAxis.angle == Math.PI * 0.5) && angleAxis.axis.equal(v3) )
		test = test & true;
	else
		test = false;
	
 	return test;
}

////////////////////////////////////////////////////////////////////////////////////

	main();
	
});