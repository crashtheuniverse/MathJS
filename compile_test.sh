java -jar compiler/compiler.jar --js *.js --js_output_file lib/mathjs.js

cp lib/mathjs.js test/scripts/mathjs.js
cp lib/mathjs.js ../../Web/crashtheuniverse/public/scripts/lib/mathjs.js

