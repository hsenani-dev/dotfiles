module.exports=(()=>{"use strict";var e={61:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=t.IS_WINDOWS=process.platform.startsWith("win"),n=t.IS_OSX="darwin"==process.platform;t.IS_LINUX=!o&&!n,t.PIO_CORE_VERSION_SPEC=">=5",t.STATUS_BAR_PRIORITY_START=10,t.CONFLICTED_EXTENSION_IDS=["llvm-vs-code-extensions.vscode-clangd","vsciot-vscode.vscode-arduino"]},39:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=d();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(425)),r=o(61),i=o(939),s=o(853),a=c(o(622)),l=c(o(549));function c(e){return e&&e.__esModule?e:{default:e}}function d(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}class u{constructor(){this.subscriptions=[],this._currentPanel=void 0,this._lastStartUrl=u.defaultStartUrl,this.subscriptions.push(l.default.workspace.onDidChangeWorkspaceFolders(this.disposePanel.bind(this)))}async toggle(e=u.defaultStartUrl){const t=l.default.window.activeTextEditor?l.default.window.activeTextEditor.viewColumn:void 0;try{if(this._currentPanel)return this._lastStartUrl!==e&&(this._currentPanel.webview.html=await this.getWebviewContent(e)),this._currentPanel.reveal(t)}catch(e){console.warn(e)}this._currentPanel=await this.newPanel(e)}async newPanel(e){const t=l.default.window.createWebviewPanel("pioHome",i.extension.getEnterpriseSetting("pioHomeTitle","PIO Home"),l.default.ViewColumn.One,{enableScripts:!0,retainContextWhenHidden:!0});this.subscriptions.push(t.onDidDispose(this.onPanelDisposed.bind(this))),t.iconPath=l.default.Uri.file(a.default.join(i.extension.context.extensionPath,"resources","platformio-mini-logo.svg")),t.webview.html=this.getLoadingContent();try{t.webview.html=await this.getWebviewContent(e)}catch(e){e.toString().includes("Webview is disposed")||(0,s.notifyError)("Start PIO Home Server",e)}return t}getTheme(){return((l.default.workspace.getConfiguration("workbench")||{}).colorTheme||"").toLowerCase().includes("light")?"light":"dark"}getLoadingContent(){return`<!DOCTYPE html>\n    <html lang="en">\n    <body style="background-color: ${"light"===this.getTheme()?"#FFF":"#1E1E1E"}">\n      <div style="padding: 15px;">Loading...</div>\n    </body>\n    </html>`}async getWebviewContent(e){this._lastStartUrl=e;const t=await n.home.ensureServerStarted({port:i.extension.getSetting("pioHomeServerHttpPort"),onIDECommand:async(e,t)=>{if("open_project"===e)this.disposePanel(),l.default.workspace.workspaceFolders?l.default.workspace.updateWorkspaceFolders(l.default.workspace.workspaceFolders.length,null,{uri:l.default.Uri.file(t)}):l.default.commands.executeCommand("vscode.openFolder",l.default.Uri.file(t)),l.default.commands.executeCommand("workbench.view.explorer");else if("open_text_document"===e){const e=await l.default.window.showTextDocument(l.default.Uri.file(t.path)),o=new l.default.Position((t.line||1)-1,(t.column||1)-1);e.selection=new l.default.Selection(o,o),e.revealRange(new l.default.Range(o,o),l.default.TextEditorRevealType.InCenter)}}}),o=this.getTheme();return`<!DOCTYPE html>\n      <html lang="en">\n      <head>\n        <script>\n          window.addEventListener('message', (e) => {\n            switch (e.data.command) {\n              case 'kbd-event': {\n                if (${r.IS_OSX}) {\n                  window.dispatchEvent(new KeyboardEvent('keydown', e.data.data));\n                }\n                break;\n              }\n            }\n          }, false);\n        <\/script>\n      </head>\n      <body style="margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: ${"light"===o?"#FFF":"#1E1E1E"}">\n        <iframe src="${n.home.getFrontendUri(t.host,t.port,{start:e,theme:o,workspace:i.extension.getEnterpriseSetting("defaultPIOHomeWorkspace")})}"\n          width="100%"\n          height="100%"\n          frameborder="0"\n          style="border: 0; left: 0; right: 0; bottom: 0; top: 0; position:absolute;" />\n      </body>\n      </html>\n    `}onPanelDisposed(){this._currentPanel=void 0}disposePanel(){this._currentPanel&&(this._currentPanel.dispose(),this._currentPanel=void 0)}dispose(){this.disposePanel(),n.misc.disposeSubscriptions(this.subscriptions),n.home.shutdownServer()}}t.default=u,u.defaultStartUrl="/"},405:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(425)),r=o(61),i=l(o(327)),s=l(o(294)),a=l(o(549));function l(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}t.default=class{constructor(e,t=!1){this.LOCK_TIMEOUT=6e4,this.LOCK_KEY="platformio-ide:installer-lock",this.STORAGE_STATE_KEY="platformio-ide:installer-state",this.globalState=e,this.stateStorage=new s.default(e,this.STORAGE_STATE_KEY);const o=a.default.workspace.getConfiguration("platformio-ide");this.stages=[new n.installer.PlatformIOCoreStage(this.stateStorage,this.onDidStatusChange.bind(this),{pioCoreVersionSpec:r.PIO_CORE_VERSION_SPEC,useBuiltinPython:o.get("useBuiltinPython"),useBuiltinPIOCore:o.get("useBuiltinPIOCore"),useDevelopmentPIOCore:o.get("useDevelopmentPIOCore"),pythonPrompt:new i.default,disableAutoUpdates:t})]}onDidStatusChange(){this.locked()&&this.lock()}lock(){return this.globalState.update(this.LOCK_KEY,(new Date).getTime())}unlock(){return this.globalState.update(this.LOCK_KEY,void 0)}locked(){const e=this.globalState.get(this.LOCK_KEY);return!!e&&(new Date).getTime()-parseInt(e)<=this.LOCK_TIMEOUT}async check(){let e=!0;for(const t of this.stages)try{await t.check()||(e=!1)}catch(t){e=!1,console.warn(t)}return e}async install(e){const t=100/this.stages.length;for(const o of this.stages)await o.install(((o,n)=>{e.report({message:o,increment:t*(n/100)})}));e.report({message:"Finish! Please restart VSCode.",increment:100})}destroy(){return this.stages.map((e=>e.destroy()))}}},327:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=i(o(3)),r=i(o(549));function i(e){return e&&e.__esModule?e:{default:e}}t.default=class{constructor(){this.STATUS_TRY_AGAIN=0,this.STATUS_ABORT=1,this.STATUS_CUSTOMEXE=2}async prompt(){const e=await r.default.window.showInformationMessage("PlatformIO: Can not find working Python 2.7 or 3.5+ Interpreter. Please install the latest Python 3 and restart VSCode",{title:"Install Python",isCloseAffordance:!1},{title:"I have Python",isCloseAffordance:!1},{title:"Try again",isCloseAffordance:!1},{title:"Abort PlatformIO IDE Installation",isCloseAffordance:!0});switch(e?e.title:void 0){case"Install Python":return r.default.commands.executeCommand("vscode.open",r.default.Uri.parse("http://docs.platformio.org/page/faq.html#install-python-interpreter")),{status:this.STATUS_TRY_AGAIN};case"I have Python":return{status:this.STATUS_CUSTOMEXE,pythonExecutable:await r.default.window.showInputBox({prompt:"Please specify a full path to Python executable file",placeHolder:"Full path to python/python.exe",validateInput:e=>n.default.isFileSync(e)?null:"Invalid path to Python Interpreter"})};case"Abort PlatformIO IDE Installation":return{status:this.STATUS_ABORT};default:return{status:this.STATUS_TRY_AGAIN}}}}},939:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.extension=void 0,t.activate=function(e){return b.activate(e),b},t.deactivate=function(){b.deactivate(),i.deactivate()};var n=P(o(835)),r=P(o(425)),i=P(o(728)),s=P(o(853)),a=w(o(405)),l=w(o(39)),c=w(o(445)),d=w(o(526)),u=w(o(723)),p=o(61),f=w(o(294)),h=w(o(942)),m=w(o(3)),g=w(o(549));function w(e){return e&&e.__esModule?e:{default:e}}function v(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return v=function(){return e},e}function P(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=v();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}const b=t.extension=new class{constructor(){this.context=void 0,this.pioTerm=void 0,this.pioHome=void 0,this.subscriptions=[],this._enterpriseSettings=void 0}async activate(e){this.context=e,this.stateStorage=new f.default(e.globalState),this.projectManager=new d.default,this.pioHome=new l.default,this.pioTerm=new c.default,this.subscriptions.push(this.projectManager,this.pioHome,this.pioTerm);const t=!!this.projectManager.getActivePIOProjectDir();!t&&this.getSetting("activateOnlyOnPlatformIOProject")||(g.default.workspace.getConfiguration("extensions").has("showRecommendationsOnlyOnDemand")||g.default.workspace.getConfiguration("extensions").update("showRecommendationsOnlyOnDemand",!0),this.patchOSEnviron(),await this.startInstaller(!t),this.subscriptions.push(this.handleUseDevelopmentPIOCoreConfiguration()),g.default.commands.executeCommand("setContext","pioCoreReady",!0),"function"==typeof this.getEnterpriseSetting("onPIOCoreReady")&&await this.getEnterpriseSetting("onPIOCoreReady")(),this.subscriptions.push(g.default.window.registerTreeDataProvider("platformio-activitybar.quickAccess",new u.default)),this.registerGlobalCommands(),t?(g.default.commands.executeCommand("setContext","pioProjectReady",!0),this.subscriptions.push(new h.default),this.initDebug(),this.initToolbar({ignoreCommands:this.getEnterpriseSetting("ignoreToolbarCommands")}),this.projectManager.initIndexer({autoRebuild:this.getSetting("autoRebuildAutocompleteIndex")}),this.startPIOHome(),n.maybeRateExtension(this.stateStorage),n.warnAboutConflictedExtensions(),this.subscriptions.push(g.default.window.onDidChangeActiveTextEditor((e=>n.warnAboutInoFile(e,this.stateStorage))))):this.initToolbar({filterCommands:["platformio-ide.showHome"]}))}getSetting(e){return g.default.workspace.getConfiguration("platformio-ide").get(e)}loadEnterpriseSettings(){const e=g.default.extensions.all.find((e=>e.id.startsWith("platformio.")&&"platformio.platformio-ide"!==e.id&&e.isActive));return e&&e.exports?e.exports.settings:void 0}getEnterpriseSetting(e,t){return this._enterpriseSettings||(this._enterpriseSettings=this.loadEnterpriseSettings()),this._enterpriseSettings&&e in this._enterpriseSettings?this._enterpriseSettings[e]:t}patchOSEnviron(){const e={PLATFORMIO_IDE:s.getIDEVersion()},t=g.default.workspace.getConfiguration("http").get("proxy");!t||process.env.HTTP_PROXY||process.env.http_proxy||(e.HTTP_PROXY=t),g.default.workspace.getConfiguration("http").get("proxyStrictSSL")||(e.CURL_CA_BUNDLE=""),!t||process.env.HTTPS_PROXY||process.env.https_proxy||(e.HTTPS_PROXY=t),r.proc.patchOSEnviron({caller:"vscode",extraPath:this.getSetting("customPATH"),extraVars:e})}async startInstaller(e){const t=new a.default(this.context.globalState,e);if(!t.locked())return await g.default.window.withProgress({location:g.default.ProgressLocation.Window,title:"PlatformIO"},(async e=>{e.report({message:"Checking PlatformIO Core installation..."});try{return!await t.check()}catch(e){}return!0}))?await g.default.window.withProgress({location:g.default.ProgressLocation.Notification,title:"PlatformIO Installer"},(async e=>{e.report({message:"Installing PlatformIO IDE..."});const o=g.default.window.createOutputChannel("PlatformIO Installation");o.show(),o.appendLine("Installing PlatformIO IDE..."),o.appendLine("It may take a few minutes depending on your connection speed"),o.appendLine("Please do not close this window and do not open other folders until this process is completed."),o.appendLine("\nDebugging information is available via VSCode > Help > Toggle Developer Tools > Console.");try{t.lock(),await t.install(e),o.appendLine("PlatformIO IDE installed successfully.\n"),o.appendLine("Please restart VSCode.");const n="Reload Now";await g.default.window.showInformationMessage("PlatformIO IDE has been successfully installed! Please reload window",n)===n&&g.default.commands.executeCommand("workbench.action.reloadWindow")}catch(e){o.appendLine("Failed to install PlatformIO IDE."),s.notifyError("Installation Manager",e)}finally{t.unlock()}return t.destroy(),!0})):void 0;g.default.window.showInformationMessage("PlatformIO IDE installation has been suspended, because PlatformIO IDE Installer is already started in another window.")}async startPIOHome(){!this.getSetting("disablePIOHomeStartup")&&r.home.showAtStartup("vscode")&&g.default.commands.executeCommand("platformio-ide.showHome")}registerGlobalCommands(){this.subscriptions.push(g.default.commands.registerCommand("platformio-ide.showHome",(e=>this.pioHome.toggle(e))),g.default.commands.registerCommand("platformio-ide.newTerminal",(()=>this.pioTerm.new().show())),g.default.commands.registerCommand("platformio-ide.openPIOCoreCLI",(()=>this.pioTerm.sendText("pio --help"))),g.default.commands.registerCommand("platformio-ide.startDebugging",(()=>{g.default.commands.executeCommand("workbench.view.debug"),g.default.commands.executeCommand("workbench.debug.action.toggleRepl"),g.default.commands.executeCommand("workbench.action.debug.start")})),g.default.commands.registerCommand("platformio-ide.updateGlobalLibs",(()=>this.pioTerm.sendText("pio lib --global update"))),g.default.commands.registerCommand("platformio-ide.updatePlatforms",(()=>this.pioTerm.sendText("pio platform update"))),g.default.commands.registerCommand("platformio-ide.updateCore",(()=>this.pioTerm.sendText("pio update"))),g.default.commands.registerCommand("platformio-ide.upgradeCore",(()=>this.pioTerm.sendText("pio upgrade"))))}initDebug(){i.activate(this.context)}initToolbar({filterCommands:e,ignoreCommands:t}){this.getSetting("disableToolbar")||[["$(home)","PlatformIO: Home","platformio-ide.showHome"],["$(check)","PlatformIO: Build","platformio-ide.build"],["$(arrow-right)","PlatformIO: Upload","platformio-ide.upload"],["$(trashcan)","PlatformIO: Clean","platformio-ide.clean"],["$(plug)","PlatformIO: Serial Monitor","platformio-ide.serialMonitor"],["$(terminal)","PlatformIO: New Terminal","platformio-ide.newTerminal"]].filter((o=>(!e||e.includes(o[2]))&&(!t||!t.includes(o[2])))).reverse().forEach(((e,t)=>{const[o,n,r]=e,i=g.default.window.createStatusBarItem(g.default.StatusBarAlignment.Left,p.STATUS_BAR_PRIORITY_START+t+1);i.text=o,i.tooltip=n,i.command=r,i.show(),this.subscriptions.push(i)}))}handleUseDevelopmentPIOCoreConfiguration(){return g.default.workspace.onDidChangeConfiguration((e=>{if(!e.affectsConfiguration("platformio-ide.useDevelopmentPIOCore")||!this.getSetting("useBuiltinPIOCore"))return;const t=r.core.getEnvDir();t&&m.default.isDirectorySync(t)&&(r.home.shutdownServer(),setTimeout((()=>{try{m.default.removeSync(t)}catch(e){console.warn(e)}g.default.window.showInformationMessage("Please restart VSCode to apply the changes.")}),2e3))}))}disposeLocalSubscriptions(){g.default.commands.executeCommand("setContext","pioCoreReady",!1),r.misc.disposeSubscriptions(this.subscriptions)}deactivate(){this.disposeLocalSubscriptions()}}},835:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.maybeRateExtension=async function(e){const t="rate-extension";let o=e.getValue(t);if(o&&o.done)return;if(o&&o.callCounter||(o={callCounter:0,done:!1}),o.callCounter+=1,o.callCounter<13)return void e.setValue(t,o);const n=await i.default.window.showInformationMessage("If you enjoy using PlatformIO IDE for VSCode, would you mind taking a moment to rate it? It will not take more than one minute. Thanks for your support!",{title:"Rate PlatformIO IDE Extension",isCloseAffordance:!1},{title:"Remind later",isCloseAffordance:!1},{title:"No, Thanks",isCloseAffordance:!0});switch(n?n.title:void 0){case"Rate PlatformIO IDE Extension":i.default.commands.executeCommand("vscode.open",i.default.Uri.parse("http://bit.ly/pio-vscode-rate")),o.done=!0;break;case"No, Thanks":o.done=!0;break;default:o.callCounter=0}e.setValue(t,o)},t.warnAboutConflictedExtensions=async function(){const e=i.default.extensions.all.filter((e=>e.isActive&&r.CONFLICTED_EXTENSION_IDS.includes(e.id)));if(0===e.length)return;const t=await i.default.window.showWarningMessage(`Conflicted extensions with IntelliSense service were detected (${e.map((e=>e.packageJSON.displayName||e.id)).join(", ")}). Code-completion, linting and navigation will not work properly. Please disable or uninstall them (Menu > View > Extensions).`,{title:"More details",isCloseAffordance:!1},{title:"Uninstall conflicted",isCloseAffordance:!1},{title:"Remind later",isCloseAffordance:!0});switch(t?t.title:void 0){case"More details":i.default.commands.executeCommand("vscode.open",i.default.Uri.parse("http://bit.ly/pio-vscode-conflicted-extensions"));break;case"Uninstall conflicted":e.forEach((e=>{i.default.commands.executeCommand("workbench.extensions.uninstallExtension",e.id)})),i.default.commands.executeCommand("workbench.action.reloadWindow")}},t.warnAboutInoFile=async function(e,t){if(!e||!e.document||!e.document.fileName)return;if(!e.document.fileName.endsWith(".ino"))return;const o="ino-warn-disabled";if(t.getValue(o))return;const n=await i.default.window.showWarningMessage("C/C++ IntelliSense service does not support .INO files. It might lead to the spurious problems with code completion, linting, and debugging. Please convert .INO sketch into the valid .CPP file.",{title:"Show instruction",isCloseAffordance:!1},{title:"Do not show again",isCloseAffordance:!1},{title:"Remind later",isCloseAffordance:!0});switch(n?n.title:void 0){case"Show instruction":i.default.commands.executeCommand("vscode.open",i.default.Uri.parse("http://bit.ly/ino2cpp"));break;case"Do not show again":t.setValue(o,1)}};var n,r=o(61),i=(n=o(549))&&n.__esModule?n:{default:n}},526:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(425)),r=a(o(747)),i=a(o(622)),s=a(o(549));function a(e){return e&&e.__esModule?e:{default:e}}function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}class c{constructor(){this.subscriptions=[],this._lastActiveProjectDir=void 0,this._selectedProjectEnv={},this._indexObsorver=void 0}static isPIOProjectSync(e){try{return r.default.accessSync(i.default.join(e,"platformio.ini")),!0}catch(e){}return!1}getSelectedProjectEnv(e){return this._selectedProjectEnv[e]}setSelectedProjectEnv(e,t){if(this._selectedProjectEnv[e]&&!t&&delete this._selectedProjectEnv[e],this._selectedProjectEnv[e]=t,this._indexObsorver){const o=this._indexObsorver.getProjectIndexer(e);o.setActiveEnv(t),o.rebuild()}}getPIOProjectDirs(){return(s.default.workspace.workspaceFolders||[]).map((e=>e.uri.fsPath)).filter((e=>c.isPIOProjectSync(e)))}getActivePIOProjectDir(){const e=this.getPIOProjectDirs();if(e.length<1)return this._lastActiveProjectDir=void 0,this._lastActiveProjectDir;this._lastActiveProjectDir&&s.default.workspace.workspaceFolders.find((e=>e.uri.fsPath===this._lastActiveProjectDir))||(this._lastActiveProjectDir=e[0]);const t=s.default.window.activeTextEditor;if(!t)return this._lastActiveProjectDir;const o=t.document.uri;if("file"!==o.scheme)return this._lastActiveProjectDir;const n=s.default.workspace.getWorkspaceFolder(o);return n&&c.isPIOProjectSync(n.uri.fsPath)?(this._lastActiveProjectDir=n.uri.fsPath,this._lastActiveProjectDir):this._lastActiveProjectDir}initIndexer(e={}){this._indexObsorver=new n.project.ProjectObserver({ide:"vscode",createFileSystemWatcher:s.default.workspace.createFileSystemWatcher,createDirSystemWatcher:e=>s.default.workspace.createFileSystemWatcher(i.default.join(e,"*")),withProgress:e=>s.default.window.withProgress({location:{viewId:s.default.ProgressLocation.Window},title:"PlatformIO: IntelliSense Index Rebuild"},e)});const t=()=>{this._indexObsorver.update(e.autoRebuild&&s.default.workspace.workspaceFolders?s.default.workspace.workspaceFolders.map((e=>e.uri.fsPath)):[])};this.subscriptions.push(this._indexObsorver,s.default.workspace.onDidChangeWorkspaceFolders(t.bind(this)),s.default.workspace.onDidChangeConfiguration(t.bind(this)),s.default.commands.registerCommand("platformio-ide.rebuildProjectIndex",(()=>{t(),this._indexObsorver.rebuildIndex()}))),t()}dispose(){n.misc.disposeSubscriptions(this.subscriptions),this._indexObsorver=void 0}}t.default=c},294:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e,t="miscStates"){this._globalState=e,this._stateKey=t}_loadState(){try{return this._globalState.get(this._stateKey)||{}}catch(e){return{}}}getValue(e){return(this._loadState()||{})[e]}setValue(e,t){const o=this._loadState();o[e]=t,this._globalState.update(this._stateKey,o)}}},942:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=l();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(425)),r=a(o(160)),i=o(939),s=a(o(549));function a(e){return e&&e.__esModule?e:{default:e}}function l(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return l=function(){return e},e}t.default=class{constructor(){this.subscriptions=[],this._ptm=void 0,this.subscriptions.push(s.default.commands.registerCommand("platformio-ide.refreshProjectTasks",(()=>this.onDidProjectTasksRefresh())),s.default.window.onDidChangeActiveTextEditor((()=>this.checkActiveProjectDir())),s.default.workspace.onDidChangeWorkspaceFolders((()=>this.checkActiveProjectDir()))),this.checkActiveProjectDir()}onDidProjectTasksRefresh(){this._ptm&&(this._ptm.dispose(),this._ptm=void 0),this.checkActiveProjectDir()}checkActiveProjectDir(){const e=i.extension.projectManager.getActivePIOProjectDir();this._ptm&&this._ptm.projectDir===e||(this._ptm&&(this._ptm.dispose(),this._ptm=void 0),e&&(this._ptm=new r.default(e),this._ptm.requestRefresh()))}dispose(){n.misc.disposeSubscriptions(this.subscriptions)}}},160:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=p(o(425)),r=p(o(853)),i=o(61),s=d(o(783)),a=o(939),l=d(o(622)),c=d(o(549));function d(e){return e&&e.__esModule?e:{default:e}}function u(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function p(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}class f{constructor(e){this.projectDir=e,this.subscriptions=[],this._sid=Math.random(),this._refreshTimeout=void 0,this._envTasks={},this._sbEnvSwitcher=void 0}requestRefresh(){this._refreshTimeout&&clearTimeout(this._refreshTimeout),this._refreshTimeout=setTimeout(this.refresh.bind(this),f.AUTO_REFRESH_DELAY)}async refresh(){this.dispose();const e=await this.loadProjectEnvs(),t=await this.getEnvTasks(e),o=c.default.window.createTreeView(f.TASKS_VIEW_ID,{treeDataProvider:new s.default(this._sid,t,a.extension.projectManager.getSelectedProjectEnv(this.projectDir)),showCollapseAll:!0});this.subscriptions.push(o,o.onDidExpandElement((async({element:e})=>{(e.env||"").includes("env:")&&await this.onDidLoadEnvTasks(e.env.substring(4))&&this.refresh()})),c.default.tasks.registerTaskProvider(f.type,{provideTasks:async()=>{const e=[];for(const o of Object.values(t))e.push(...o.map((e=>this.toVSCodeTask(e))));return e},resolveTask:()=>{}})),this.addProjectConfigWatcher(),this.controlDeviceMonitorTasks(),this.registerTaskBasedCommands(),e.length>1&&this.registerEnvSwitcher(e),c.default.commands.executeCommand("setContext","pioMultiEnvProject",e.length>1)}async loadProjectEnvs(){const e=[],t=process.cwd();process.chdir(this.projectDir);try{const t=new n.project.ProjectConfig;await t.read(l.default.join(this.projectDir,"platformio.ini"));for(const o of t.envs()){const n=t.get("env:"+o,"platform");n&&e.push({name:o,platform:n})}}catch(e){console.warn(`Could not parse "platformio.ini" file in ${this.projectDir}: ${e}`)}return process.chdir(t),e}async getEnvTasks(e){const t=a.extension.projectManager.getSelectedProjectEnv(this.projectDir),o=new n.project.ProjectTasks(this.projectDir,"vscode"),r={Default:await o.getDefaultTasks()};for(const o of e)this._envTasks[o.name]||!a.extension.getSetting("autoPreloadEnvTasks")&&1!==e.length&&o.name!==t||await this.onDidLoadEnvTasks(o.name),r["env:"+o.name]=this._envTasks[o.name]||[];return r}async onDidLoadEnvTasks(e){if(!(e in this._envTasks))return await c.default.window.withProgress({location:{viewId:f.TASKS_VIEW_ID}},(async()=>await this.fetchEnvTasks(e)))}async fetchEnvTasks(e){const t=new n.project.ProjectTasks(this.projectDir,"vscode");return this._envTasks[e]=[],this._envTasks[e]=await t.fetchEnvTasks(e),this._envTasks[e]}toVSCodeTask(e){const t=Object.create(process.env);process.env.PLATFORMIO_PATH&&(t.PATH=process.env.PLATFORMIO_PATH,t.Path=process.env.PLATFORMIO_PATH);const o=new c.default.Task({type:f.type,task:e.id},c.default.workspace.getWorkspaceFolder(c.default.Uri.file(this.projectDir)),e.title,f.type,new c.default.ProcessExecution(i.IS_WINDOWS?"pio.exe":"pio",e.args,{cwd:this.projectDir,env:t}),"$platformio");return o.presentationOptions={panel:c.default.TaskPanelKind.Dedicated},e.isBuild()?o.group=c.default.TaskGroup.Build:e.isClean()?o.group=c.default.TaskGroup.Clean:e.isTest()&&(o.group=c.default.TaskGroup.Test),o}addProjectConfigWatcher(){try{const e=c.default.workspace.createFileSystemWatcher(l.default.join(this.projectDir,"platformio.ini"));this.subscriptions.push(e,e.onDidCreate((()=>{this.requestRefresh()})),e.onDidChange((()=>{this.requestRefresh()})),e.onDidDelete((()=>{this.dispose()})))}catch(e){r.notifyError("Project Tasks FileSystemWatcher",e)}}controlDeviceMonitorTasks(){let e=void 0,t=[];this.subscriptions.push(c.default.tasks.onDidStartTaskProcess((o=>{c.default.workspace.getConfiguration("platformio-ide").get("autoCloseSerialMonitor")&&["upload","test"].some((e=>o.execution.task.execution.args.includes(e)))&&(c.default.tasks.taskExecutions.forEach((e=>{o.execution.task!==e.task&&(["device","monitor"].every((t=>e.task.execution.args.includes(t)))&&t.push(e.task),e.task.execution.args.includes("monitor")&&e.terminate())})),e=o.execution.task)})),c.default.tasks.onDidEndTaskProcess((o=>{o.execution.task===e&&0===o.exitCode&&setTimeout((()=>{t.forEach((e=>{c.default.tasks.executeTask(e)})),t=[]}),parseInt(c.default.workspace.getConfiguration("platformio-ide").get("reopenSerialMonitorDelay")))})))}registerEnvSwitcher(e){let t=a.extension.projectManager.getSelectedProjectEnv(this.projectDir);t&&!e.some((e=>e.name===t))&&(t=void 0,a.extension.projectManager.setSelectedProjectEnv(this.projectDir,void 0)),this._sbEnvSwitcher=c.default.window.createStatusBarItem(c.default.StatusBarAlignment.Left,i.STATUS_BAR_PRIORITY_START),this._sbEnvSwitcher.tooltip="Switch PlatformIO Project Environment",this._sbEnvSwitcher.command="platformio-ide.switchProjectEnv",this._sbEnvSwitcher.text="$(root-folder) "+(t?"env:"+t:"Default"),this._sbEnvSwitcher.show(),this.subscriptions.push(this._sbEnvSwitcher,c.default.commands.registerCommand("platformio-ide.switchProjectEnv",(()=>this.switchProjectEnv(e))))}async switchProjectEnv(e){const t=[{label:"Default",description:'All or "default_envs" declared in [platformio] section of "platformio.ini"'}];t.push(...e.map((e=>({label:"env:"+e.name}))));const o=await c.default.window.showQuickPick(t);if(!o)return;const n="Default"===o.label?void 0:o.label.substring(4);n&&(this._sbEnvSwitcher.text="$(root-folder) Loading...",await this.onDidLoadEnvTasks(n)),a.extension.projectManager.setSelectedProjectEnv(this.projectDir,n),c.default.commands.executeCommand("platformio-ide.refreshProjectTasks")}registerTaskBasedCommands(){const e=e=>{const t=a.extension.projectManager.getSelectedProjectEnv(this.projectDir);return t?`${e} (${t})`:e};this.subscriptions.push(c.default.commands.registerCommand("platformio-ide.build",(()=>{const t=a.extension.getSetting("buildTask")||{type:f.type,task:e("Build")};return c.default.commands.executeCommand("workbench.action.tasks.runTask",t)})),c.default.commands.registerCommand("platformio-ide.upload",(()=>c.default.commands.executeCommand("workbench.action.tasks.runTask",{type:f.type,task:e(a.extension.getSetting("forceUploadAndMonitor")?"Upload and Monitor":"Upload")}))),c.default.commands.registerCommand("platformio-ide.remote",(()=>c.default.commands.executeCommand("workbench.action.tasks.runTask",{type:f.type,task:e("Remote")}))),c.default.commands.registerCommand("platformio-ide.test",(()=>c.default.commands.executeCommand("workbench.action.tasks.runTask",{type:f.type,task:e("Test")}))),c.default.commands.registerCommand("platformio-ide.clean",(()=>c.default.commands.executeCommand("workbench.action.tasks.runTask",{type:f.type,task:e("Clean")}))),c.default.commands.registerCommand("platformio-ide.serialMonitor",(()=>c.default.commands.executeCommand("workbench.action.tasks.runTask",{type:f.type,task:e("Monitor")}))))}dispose(){n.misc.disposeSubscriptions(this.subscriptions)}}t.default=f,f.TASKS_VIEW_ID="platformio-ide.projectTasks",f.AUTO_REFRESH_DELAY=500,f.type="PlatformIO"},783:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n,r=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=s();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(549)),i=(n=o(160))&&n.__esModule?n:{default:n};function s(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return s=function(){return e},e}t.default=class{constructor(e,t,o){this.id=e,this.envTasks=t,this.selectedEnvName=o,this.multiEnvProject=Object.keys(this.envTasks).filter((e=>e.includes("env:"))).length>1}getTreeItem(e){return e instanceof r.TreeItem?e:this.taskToTreeItem(e)}taskToTreeItem(e){const t=new r.TreeItem(e.name);return t.iconPath=new r.ThemeIcon("circle-outline"),t.tooltip=e.title,t.command={title:e.title,command:"workbench.action.tasks.runTask",arguments:[{type:i.default.type,task:e.id}]},!e.coreEnv&&e.multienv&&this.multiEnvProject&&(t.label+=" All"),t}getChildren(e){return e&&e.group?this.getGroupChildren(e.group,e.env):e&&e.env?this.getEnvChildren(e.env):this.getRootChildren()}getRootChildren(){const e=[];for(const t of Object.keys(this.envTasks)){const o=new r.TreeItem(t,t==="env:"+this.selectedEnvName||t.includes("env:")&&!this.multiEnvProject?r.TreeItemCollapsibleState.Expanded:r.TreeItemCollapsibleState.Collapsed);o.id=`${this.id}-${t}`,o.env=t,o.iconPath=new r.ThemeIcon("root-folder"),e.push(o)}return e}getGroupChildren(e,t){return this.envTasks[t].filter((t=>t.group===e))}getEnvChildren(e){const t=this.envTasks[e];if(!t.length)return[new r.TreeItem("Loading...")];const o=t.filter((e=>!e.group&&!e.coreEnv));for(const n of this.getTaskGroups(t)){const t=new r.TreeItem(n,["General","Platform"].includes(n)?r.TreeItemCollapsibleState.Expanded:r.TreeItemCollapsibleState.Collapsed);t.env=e,t.group=n,t.iconPath=r.ThemeIcon.Folder,o.push(t)}return o}getTaskGroups(e){const t=["General"],o=e.filter((e=>e.group)).map((e=>e.group));o.includes("Platform")&&t.push("Platform");for(const e of o)t.includes(e)||t.push(e);return t}}},445:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n,r=(n=o(549))&&n.__esModule?n:{default:n};t.default=class{constructor(){this._instance=void 0}new(){const e=Object.create(process.env);return process.env.PLATFORMIO_PATH&&(e.PATH=process.env.PLATFORMIO_PATH,e.Path=process.env.PLATFORMIO_PATH),r.default.window.createTerminal({name:"PlatformIO CLI",env:e})}sendText(e){this._instance&&void 0===this._instance.exitStatus||(this._instance=this.new()),this._instance.sendText(e),this._instance.show()}dispose(){this._instance&&this._instance.dispose(),this._instance=void 0}}},853:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.notifyError=async function(e,t){const o=t.stack||t.toString(),s=`# Description of problem\n  Leave a comment...\n\n  BEFORE SUBMITTING, PLEASE SEARCH FOR DUPLICATES IN\n  - https://github.com/platformio/platformio-vscode-ide/issues?q=is%3Aissue+\n\n  # Configuration\n\n  VSCode: ${i.default.version}\n  PIO IDE: v${c()}\n  System: ${r.default.type()}, ${r.default.release()}, ${r.default.arch()}\n\n  # Exception\n  \`\`\`\n  ${o}\n  \`\`\`\n  `,a=n.misc.getErrorReportUrl(e,s);let l="Report a problem";a.includes("issues/new")||(l="Check available solutions"),await i.default.window.showErrorMessage(o.substring(0,700)+"...",l)===l&&i.default.commands.executeCommand("vscode.open",i.default.Uri.parse(a)),console.error(t)},t.getIDEManifest=l,t.getIDEVersion=c;var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=a();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var i=n?Object.getOwnPropertyDescriptor(e,r):null;i&&(i.get||i.set)?Object.defineProperty(o,r,i):o[r]=e[r]}return o.default=e,t&&t.set(e,o),o}(o(425)),r=s(o(87)),i=s(o(549));function s(e){return e&&e.__esModule?e:{default:e}}function a(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return a=function(){return e},e}function l(){return i.default.extensions.getExtension("platformio.platformio-ide").packageJSON}function c(){return l().version}},723:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=r();if(t&&t.has(e))return t.get(e);var o={},n=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)){var s=n?Object.getOwnPropertyDescriptor(e,i):null;s&&(s.get||s.set)?Object.defineProperty(o,i,s):o[i]=e[i]}return o.default=e,t&&t.set(e,o),o}(o(549));function r(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return r=function(){return e},e}class i extends n.TreeItem{constructor(e,t,o,n,r){super(e,n),t&&(this.command={title:e,command:t,arguments:o}),this.customChildren=r}}t.default=class{getChildren(e){return e&&e.customChildren?e.customChildren:[new i("PIO Home",void 0,void 0,n.TreeItemCollapsibleState.Expanded,[new i("Open","platformio-ide.showHome"),new i("PIO Account","platformio-ide.showHome",["/account"]),new i("Inspect","platformio-ide.showHome",["/inspect"]),new i("Projects & Configuration","platformio-ide.showHome",["/projects"]),new i("Libraries","platformio-ide.showHome",["/libraries"]),new i("Boards","platformio-ide.showHome",["/boards"]),new i("Platforms","platformio-ide.showHome",["/platforms"]),new i("Devices","platformio-ide.showHome",["/device"])]),new i("Debug",void 0,void 0,n.TreeItemCollapsibleState.Expanded,[new i("Start Debugging","platformio-ide.startDebugging"),new i("Toggle Debug Console","workbench.debug.action.toggleRepl")]),new i("Updates",void 0,void 0,n.TreeItemCollapsibleState.Expanded,[new i("Library Updates","platformio-ide.showHome",["/libraries/updates"]),new i("Platform Updates","platformio-ide.showHome",["/platforms/updates"]),new i("Update All","platformio-ide.updateCore")]),new i("Miscellaneous",void 0,void 0,n.TreeItemCollapsibleState.Expanded,[new i("PlatformIO Core CLI","platformio-ide.openPIOCoreCLI"),new i("Clone Git Project","git.clone"),new i("New Terminal","platformio-ide.newTerminal"),new i("Upgrade PlatformIO Core","platformio-ide.upgradeCore")])]}getTreeItem(e){return e}}},747:e=>{e.exports=require("fs")},3:e=>{e.exports=require("fs-plus")},87:e=>{e.exports=require("os")},622:e=>{e.exports=require("path")},425:e=>{e.exports=require("platformio-node-helpers")},728:e=>{e.exports=require("platformio-vscode-debug")},549:e=>{e.exports=require("vscode")}},t={};return function o(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,o),r.exports}(939)})();
//# sourceMappingURL=extension.js.map