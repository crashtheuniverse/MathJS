MathJS
======

Javascript Math Helper library

I began writing this library to collect functions I would use in my game development experiments in JS.

There are already good libraries out there for some of the functionality I wanted, but sometimes they 
are different from what I expected.

This is also a very good exercise for me to refresh this concepts fromt time to time.

I hope that with feedback and more people using the lib, it will look more and more feature complete. 

What we have so far
=======

* Vector2D
* Vector3D
* Vector4D
* Matrix22
* Matrix33
* Quaternion
* TestSuite (used for decorated HTML testing generation)

How to use it
=======

Simply include the "mathjs.js" file in your projects.

`<script type="text/javascript" src="mathjs.js"></script>`

Every object is included in the MW namespace.

`var mtx33 = new MW.Matrix33(); `

or even shorter:

`var mtx33 = mw.m33()`

Both MW and mw are equivalent namespaces

Methods express their will with a prefix, like get or set. Where omitted, 
the function will modify the current object like in matrix inversion. For example

`
var mtx33 = new MW.Matrix33();  
mtx33.fromEulerAnglesXYZ(0.0, 0.0, Math.PI);
`

Modifies the mtx33 object setting it to a rotation matrix based on the Euler angles for the X,Y,Z axis.

In a process to simplify the objects layout, now all the methods modify the current matrix. Also 
to allow chaining, methods now return this so you can do: 

`
var mtx22 = MW.m22().identity().scalarMultiply(x).inverse();
`

ToDo
=======

* Include dot and cross product in the Vector objects
* Complete Quaternion class implementation
* Introduce "Complex" object type
* Ray, Plane, and intersection functions
* Have some fun with canvas tests :)
* Include 2D geometry helpers
* Add 3D Geometry (Plane, Sphere, Cube at least)
* Add AABB and OOBB in 2D and 3D
* Evaluate if we want to include FFT? DCT? 
* Evaluate inclusion of integration + mean
* Statistical functions?

