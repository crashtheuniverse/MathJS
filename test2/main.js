/**
 * @author CrashTheuniversE
 */

app = {};

function print(str) {
	
	var txt = document.createElement('p');
	txt.innerText = str;
	document.body.appendChild(txt);
}

TestSuite = function() { 
	
	var tests = [];
	var passed = true;
	
	this.addTest = function(desc, test) {
		tests.push({d: desc, t: test});	
	}
	
	this.print = function(str) {
		var txt = document.createElement('p');
		txt.innerText = str;
		document.body.appendChild(txt);
	}

	this.runTests = function() {
				
		for(var i = 0, count = tests.length; i < count; ++i)
		{
			var local = tests[i].t(); 
			var txt = local ? "PASS" : "FAIL";
			this.print("Function:" + tests[i].t.name + " Description:" + tests[i].d + " :" + txt);
			passed = local;
		}
		
		if(passed)
			print("TEST PASSED");
		else
			print("TEST FAILED");
		
		return passed;
	}	
}

function main() { 
	
	setup();
	//testNan();
	testVectors();
	testQuaternion();
	testMatrix();
	testMatrixEquality();
	testTranspose();
	testCopy();
	//testRender3D();
	
	var unit = new TestSuite(); 
	unit.addTest("Matrix Equality", testEquality);
	unit.addTest("Matrix Transpose", testTranspose);
	unit.runTests();
}

function setup() { 
	
	document.addEventListener('mousedown', mouseDown); 
	document.addEventListener('mouseup', mouseUp);	
}

function mouseDown()
{ 
	app.rotate = true;
}

function mouseUp()
{ 
	app.rotate = false;
}

function testEquality() { 
	
	var mtx = MW.Matrix33.identity(); 
	var mtx2 = MW.Matrix33.identity(); 
	
	if(mtx.isEqual(mtx2)) {
		return true;
	}
		
	return false;
}

function testMatrix() { 
	
	var mtx = MW.Matrix33.identity(); 
	print(mtx.toString());	
}

function testCopy() { 
	var mtx = MW.Matrix33.identity(); 
	mtx.m[1]	 = 7;
	var mtx2 = mtx.getCopy(); 
	print(mtx);
	print(mtx2);
}

function testTranspose() { 
	
	var mtxId = MW.Matrix33.identity();
	mtxId.m[1] = 1;
	print(mtxId);
	var mtx2 = mtxId.getTranspose();
	print(mtx2);
	
	if(mtxId.isEqual(mtx2)) {
		return true;
	}
	
	return false;
}

function testMatrixEquality() { 
	
	var mtxIdentity = MW.Matrix33.identity(); 
	var mtxId2 = MW.Matrix33.identity();
	 
	if(mtxIdentity.isEqual(mtxId2))
		print("Matrix are equal");	
}

function testQuaternion() { 
	
	print(" Quaternion Only ------------------------ ");
	
	var axis = MW.Vector3.zero(); 
	axis.x = 1.0;
	var angle = Math.PI * 0.5;
	
	var q1 = MW.Quaternion.identity(); 
	q1.fromAngleAxis(angle, axis);  
	var angleAxis = q1.toAngleAxis();
	
	print( "Original Angle:" + angle + " Original axis:" + axis.toString());
	print( "From Quaternion Angle:" + angleAxis.angle + " From Quaternion Axis:" + angleAxis.axis.toString()); 
}

function testNan() { 
	
	var x = 0.0; 
	var y = 1.0 / x; 
	
	if(isNaN(y))
	{
		alert("NAAN");
	}
	if(!isFinite(y)) {
		alert("INFINITY");
	}
}

function testVectors() {
	
	var q = MW.Quaternion.identity(); 
	var q2 = MW.Quaternion.zero();
	var v = MW.Vector3.zero(); 
	v.x = 1.0;
	q2.fromAngleAxis( Math.PI * 0.5, v);
	var q3 = MW.Quaternion.zero();
		
	print(q.toString());
	print(q2.toString());
	print(q3.toString());
}

function testRender3D() { 

    var camera, scene, renderer,
    geometry, material, mesh;

	var render2D; 
	
	app.obj = {x:0, y:0};
	
    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        scene.add( camera );

        geometry = new THREE.CubeGeometry( 200, 200, 200 );
        material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
        
        geometry2 = new THREE.SphereGeometry( 200, 16, 16 );
        material2 = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: true } );

        mesh = new THREE.Mesh( geometry, material );
        mesh2 = new THREE.Mesh( geometry2, material2 );
        scene.add( mesh );
        scene.add( mesh2 );

        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.setClearColor( new THREE.Color( 0x000000 ), 1.0);

		render2D = new THREE.CanvasRenderer(); 
		render2D.setSize( window.innerWidth, window.innerHeight ); 
		
		var divLayer1 = document.createElement('div');
		divLayer1.width = window.innerWidth; 
		divLayer1.height = window.innerHeight;
		divLayer1.style.position = "absolute";
		divLayer1.top = 0.0; 
		divLayer1.left = 0.0; 
		 
		var divLayer2 = document.createElement('div');
		divLayer2.width = window.innerWidth; 
		divLayer2.height = window.innerHeight;
		divLayer2.style.position = "absolute";
		divLayer2.top = 0.0; 
		divLayer2.left = 0.0; 

		divLayer1.appendChild( renderer.domElement ); 
		divLayer2.appendChild( render2D.domElement );

        document.body.appendChild( divLayer1 );
		document.body.appendChild( divLayer2 );
    }

    function animate() {

        // note: three.js includes requestAnimationFrame shim
        requestAnimationFrame( animate );
        render();
        render2DFunc();

    }

	function render2DFunc()
	{
		var context = render2D.domElement.getContext("2d");
		render2D.domElement.width = render2D.domElement.width;
		context.fillStyle = "rgb(10, 10, 128)"
		context.globalAlpha = 0.0;
		context.fillRect(0, 0, window.innerWidth, window.innerHeight);
		context.globalAlpha = 1.0;
		context.fillStyle = 'red';
		context.fillRect(app.obj.x, app.obj.y, 100, 100);
		
		if(app.rotate)
		{
			app.obj.x += 2.0;
			app.obj.y += 1.0;
		}
	}
	

    function render() {

        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;

		if(app.rotate)
		{
			mesh2.rotation.x += 0.05;
			mesh2.position.y += 1.0;			
		}
        renderer.render( scene, camera );

    }
}
