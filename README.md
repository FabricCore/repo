# JSCore Package Repository

[**JSCore**](https://github.com/FabricCore/JSCore) | [**Pully (package manager)**](https://github.com/FabricCore/pully)

## Package Rules

1. No malicious packages or malicious updates.
2. Have a valid package.json that specifes all dependencies it requires.
3. README include a list of all commands provided, and method signatures of all public functions.
4. Other packages can only be accessed through public functions.
5. Internal variables should not be top level.

### Manifest (package.json) Requirements

- Name in package.json must match name in repo.
- The field **dependencies** must exist, even if there are no dependencies.
- The field **authors** must have at least one entry.
- Author should be in format **UserNickname<IdentifiableName>**. **IdentifiableName** can be any identifiable information such as your email address, GitHub username, etc.
- All dependencies must be valid packages on repo.

### Build Guides

To update the package README, run `node build.js` on a local machine.

## Package Listing

<!--listing:begin-->
### core
[**Source**](https://github.com/FabricCore/modcore) | [**Download**](https://github.com/FabricCore/modcore/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install core
```

Core library.
- Keywords: core

### emojichat
[**Source**](https://github.com/siriusmart/emojichat/) | [**Download**](https://github.com/Siriusmart/emojichat/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install emojichat
```

Use Discord style emoji in chat.
- Depends on: **[keep](#keep)**(0.1.0), **[yarn](#yarn)**(0.1.0), **[toggle](#toggle)**(0.1.0), **[yarntogglepass](#yarntogglepass)**(0.1.0)
- Keywords: chat

### keep
[**Source**](https://github.com/FabricCore/modkeep) | [**Download**](https://github.com/FabricCore/modkeep/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install keep
```

Lazy storage.
- Depends on: **[core](#core)**(0.1.0), **[yarn](#yarn)**(0.1.0)
- Keywords: core, keep, storage

### pully
[**Source**](https://github.com/FabricCore/pully) | [**Download**](https://github.com/FabricCore/pully/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install pully
```

Pully package manager.
- Depends on: **[core](#core)**(0.1.0)
- Keywords: package manager

### toggle
[**Source**](https://github.com/FabricCore/modtoggle) | [**Download**](https://github.com/FabricCore/modtoggle/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install toggle
```

Togglable services.
- Depends on: **[keep](#keep)**(0.1.0)
- Keywords: core, toggles

### toggle-floppyfly
[**Download**](https://github.com/Siriusmart/toggle-floppyfly/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install toggle-floppyfly
```

Floppy's elytra fly.
- Depends on: **[keep](#keep)**(0.1.0), **[toggle](#toggle)**(0.1.0), **[utils](#utils)**(0.1.0), **[yarnutils](#yarnutils)**(0.1.0), **[yarn](#yarn)**(0.1.0)
- Keywords: efly

### utils
[**Source**](https://github.com/FabricCore/modutils) | [**Download**](https://github.com/FabricCore/modutils/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install utils
```

Basic utilities.
- Keywords: core, toggles

### yarn
[**Source**](https://github.com/FabricCore/yarn.js) | [**Download**](https://github.com/FabricCore/yarn.js/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install yarn
```

Yarnwrap helper methods.
- Java dependencies: yarnwrap
- Keywords: core, yarnwrap

### yarntogglepass
[**Source**](https://github.com/FabricCore/yarntogglepass) | [**Download**](https://github.com/FabricCore/yarntogglepass/archive/refs/heads/master.zip) | ***by Sirius***

```
/pully install yarntogglepass
```

Yarnwrap event passes.
- Depends on: **[yarn](#yarn)**(0.1.0), **[toggle](#toggle)**(0.1.0)
- Keywords: core, yarnwrap

### yarnutils
[**Source**](https://github.com/FabricCore/yarnutils) | [**Download**](https://github.com/FabricCore/yarnutils/archive/refs/heads/master.zip) | ***by Sirius&lt;siriusmart&gt;***

```
/pully install yarnutils
```

Yarnwrap helper methods (extra)
- Depends on: **[yarn](#yarn)**(0.1.0)
- Keywords: yarnwrap, utils
<!--listing:end-->

## Bad Packages

These packages are submitted to repo, but taken down due to package.json requirements. They will be restored once requirements are met.

Note: a package taken down will cause all packages dependent on it to also be taken down.

<!--badpacks:begin-->
*[no bad packages]*
<!--badpacks:end-->
