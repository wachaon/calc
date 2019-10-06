# Modules ecoSystem

これは *wes* で モジュール の エコシステム を構築するに必要なものを作成する

## 要件

+   インストール 可能な モジュール は *GitHub* にあるもののみとする
+   ダウンロード は bitsadmin を使用。1ファイル構成とする
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
wes buildModule src/calc
```

生成されたファイル

```json
//  C:/bin/calc/src/calc.json
{
    "{1936D67A-5B4D-4FBB-8368-F37CFC1F947B}": {
        "source": "const add = ( a, b ) => a + b\nmodule.exports = add",
        "mapping": {},
        "path": "{wachaon@calc}/src/add"
    },
    "{164D7342-3988-49B7-939B-7051A3143140}": {
        "source": "const sub = ( a, b ) => a - b\nmodule.exports = sub",
        "mapping": {},
        "path": "{wachaon@calc}/src/sub"
    },
    "{E320A885-D795-4BA4-869A-44F3974293B0}": {
        "source": "const add = require( 'add' )\nconst sub = require( 'sub' )nmodule.exports = { add, sub }",
        "mapping": {
            "add": "{1936D67A-5B4D-4FBB-8368-F37CFC1F947B}",
            "sub": "{164D7342-3988-49B7-939B-7051A3143140}"
        },
        "path": "{wachaon@calc}/calc",
        "package : {}
    }
}

```
インストールコマンド

```
wes install wachaon@calc
```

出力されるコマンド

```
bitsadmin /TRANSFER GetWES https://raw.githubusercontent.com/wachaon/wes/master/calc.js %CD%\node_modules\wachaon@calc.json
```

```
wes createModule %CD%\node_modules\wachaon@calc.json
```

```javascript
// C:/bin/node_modules/wachaon@calc/calc.js
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
const { add, sub } = require( 'wachaon@calc' )
console.log( sub( add( 5, 7 ), 4 ) ) // => 8
```
