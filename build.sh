
rm -rf extension

mkdir "extension"
cp background.js chat.css chat.js manifest.json ptt.js ptt.wasm wasm_exec.js extension/

cd popup && npm run build
cd ../

cp -R popup/out/_next extension/next
cp popup/out/index.html extension/popup.html
# for OSX
sed -i '' 's#/_next/#/next/#g' extension/popup.html
