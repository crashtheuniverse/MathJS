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
* Matrix33
* Quaternion
* TestSuite (used for decorated HTML testing generation)


How to use it
=======

Simply include the "mathjs.js" file in your projects.

Every object is included in the MW namespace.

`var mtx33 = new MW.Matrix33(); `

or you may use a method like: 

`var mtx33 = MW.Matrix33.identity(); `

Both will give you a new Matrix33 object.

Methods express their will with a prefix, like get or set. Where omitted, 
the function will modify the current object like in matrix inversion. For example

`
var mtx33 = new MW.Matrix33();
mtx33.fromEulerAnglesXYZ(0.0, 0.0, Math.PI);
`

Modifies the mtx33 object setting it to a rotation matrix based on the Euler angles for the X,Y,Z axis.

Instead

`
var mtx33 = MW.Matrix33().Identity();
var newMtx = mtx33.getInverse();
`

Will store a new matrix in newMtx which is the inverse of the mtx33, leaving mtx33 unaltered.

For debugging purposes most of the objects override the .toString() method to report something meaningful.