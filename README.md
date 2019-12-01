# Modules ecoSystem

これは *wes* で モジュール の エコシステム を構築するに必要なものを作成する

## 要件

+   インストール 可能な モジュール は *GitHub* にあるもののみとする
+   モジュールファイル は バンドル されたファイルを構成するオブジェクトと、それを評価する関数で構成


## モジュールファイル

バンドルされるファイル

```javascript
// C:/bin/calc/src/add.js
const add = ( a, b ) => a + b
module.exports = add
```

```javascript
// C:/bin/calc/src/sub.js
const sub = ( a, b ) => a - b
module.exports = sub
```

*wes* モジュールを 1ファイル にするために、必要なモジュール を集める

```javascript
// C:/bin/calc/src/calc.js
const add = require( 'add' )
const sub = require( 'sub' )
module.exports = { add, sub }

```

モジュール生成コマンド

```
wes bundle /src/calc
```

生成されたファイル

```json
//  C:/bin/calc/src/calc.json
{
    "{6B8726F4-8178-4558-9866-B2B22866D655}": {
        "source": "const add = require( './add' )\r\nconst div = require( './div' )\r\nconst mul = require( './mul' )\r\nconst pow = require( './pow' )\r\nconst rem = require( './rem' )\r\nconst sub = require( './sub' )\r\n\r\nmodule.exports = {\r\n    add,\r\n    div,\r\n    mul,\r\n    pow,\r\n    rem,\r\n    sub\r\n}\r\n",
        "path": "{calc}/src/calc.js",
        "mapping": {
            "./add": "{90CF99D9-1DA2-4869-BFA8-63536E8DB979}",
            "./div": "{9C50DC3B-C687-472C-8F16-F3AD0BF38DB4}",
            "./mul": "{59CAF00E-042C-4C23-B24E-E523BD04BE50}",
            "./pow": "{78ADE251-1F46-4BCA-AB26-5C664B87A26E}",
            "./rem": "{6BAC68B6-D385-4AF9-A565-BABE1B3ECFBB}",
            "./sub": "{53DCFDF3-04C1-4BF0-AB02-7C8E613D10CB}"
        }
    },
    "{90CF99D9-1DA2-4869-BFA8-63536E8DB979}": {
        "source": "module.exports = function add ( a, b ) { return a + b }",
        "path": "{calc}/src/add.js",
        "mapping": {}
    },
    "{9C50DC3B-C687-472C-8F16-F3AD0BF38DB4}": {
        "source": "module.exports = function div ( a, b ) { return a / b }",
        "path": "{calc}/src/div.js",
        "mapping": {}
    },
    "{59CAF00E-042C-4C23-B24E-E523BD04BE50}": {
        "source": "module.exports = function mul ( a, b ) { return a * b }",
        "path": "{calc}/src/mul.js",
        "mapping": {}
    },
    "{78ADE251-1F46-4BCA-AB26-5C664B87A26E}": {
        "source": "module.exports = function pow ( a, b ) { return a ** b }",
        "path": "{calc}/src/pow.js",
        "mapping": {}
    },
    "{6BAC68B6-D385-4AF9-A565-BABE1B3ECFBB}": {
        "source": "module.exports = function rem ( a, b ) { return a % b }",
        "path": "{calc}/src/rem.js",
        "mapping": {}
    },
    "{53DCFDF3-04C1-4BF0-AB02-7C8E613D10CB}": {
        "source": "module.exports = function sub ( a, b ) { return a - b }",
        "path": "{calc}/src/sub.js",
        "mapping": {}
    }
}
```
インストールコマンド

```
wes install @wachaon/calc
```

```javascript
// C:/bin/node_modules/@wachaon/calc/index.js
const path = require( 'pathname' )
const modules = {
    "{1936D67A-5B4D-4FBB-8368-F37CFC1F947B}": {
        "source": "const add = ( a, b ) => a + b\nmodule.exports = add",
        "mapping": {},
        "path": "{wachaon@calc}/src/add"
    },
    "{164D7342-3988-49B7-939B-7051A3143140}": {
        "source": "const sub = ( a, b ) => a - b\nmodule.exports = sub",
        "mapping": {},
        "path": "{wachaon@calc}/src/sub"
    }
    "{E320A885-D795-4BA4-869A-44F3974293B0}": {
        "source": "const add = require( 'add' )\nconst sub = require( 'sub' )nmodule.exports = { add, sub }",
        "mapping": {
            'add': "{1936D67A-5B4D-4FBB-8368-F37CFC1F947B}",
            'sub': "{164D7342-3988-49B7-939B-7051A3143140}"
        },
        "path": "{wachaon@calc}/calc",
        "package" : {}
    }
}

require.modules = { ...modules, ...require.modules }

module.exports = require( path.join( __dirname, __filename ), "{E320A885-D795-4BA4-869A-44F3974293B0}" )
```

モジュールの呼び出し

```javascript
const { add, sub } = require( '@wachaon/calc' )
console.log( sub( add( 5, 7 ), 4 ) ) // => 8
```
