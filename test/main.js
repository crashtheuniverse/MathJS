/**
 * @author CrashTheuniversE
 */

app = {};

function main() { 
	
	setup();
	testVectors();
	testRender3D();
}

function setup() { 
	
	document.addEventListener('mousedown', mouseDown); 
	document.addEventListener('mouseup', mouseUp);	
}

function mouseDown()
{ app.rotate = true; }

function mouseUp()
{ app.rotate = false; }

function testVectors() {
	
	var v2 = new Vector2;
	var v3 = new Vector3; 
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
