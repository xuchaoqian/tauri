var __TAURI_IIFE__=function(e){"use strict";function n(e,n,t,i){if("a"===t&&!i)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof n?e!==n||!i:!n.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===t?i:"a"===t?i.call(e):i?i.value:n.get(e)}function t(e,n,t,i,r){if("m"===i)throw new TypeError("Private method is not writable");if("a"===i&&!r)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof n?e!==n||!r:!n.has(e))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===i?r.call(e,t):r?r.value=t:n.set(e,t),t}var i,r;function a(e,n=!1){return window.__TAURI_INTERNALS__.transformCallback(e,n)}"function"==typeof SuppressedError&&SuppressedError;class s{constructor(){this.__TAURI_CHANNEL_MARKER__=!0,i.set(this,(()=>{})),this.id=a((e=>{n(this,i,"f").call(this,e)}))}set onmessage(e){t(this,i,e,"f")}get onmessage(){return n(this,i,"f")}toJSON(){return`__CHANNEL__:${this.id}`}}i=new WeakMap;class l{constructor(e,n,t){this.plugin=e,this.event=n,this.channelId=t}async unregister(){return o(`plugin:${this.plugin}|remove_listener`,{event:this.event,channelId:this.channelId})}}async function o(e,n={},t){return window.__TAURI_INTERNALS__.invoke(e,n,t)}class u{get rid(){return n(this,r,"f")}constructor(e){r.set(this,void 0),t(this,r,e,"f")}async close(){return o("plugin:resources|close",{rid:this.rid})}}r=new WeakMap;var c=Object.freeze({__proto__:null,Channel:s,PluginListener:l,Resource:u,addPluginListener:async function(e,n,t){const i=new s;return i.onmessage=t,o(`plugin:${e}|register_listener`,{event:n,handler:i}).then((()=>new l(e,n,i.id)))},convertFileSrc:function(e,n="asset"){return window.__TAURI_INTERNALS__.convertFileSrc(e,n)},invoke:o,transformCallback:a});var d,p=Object.freeze({__proto__:null,getName:async function(){return o("plugin:app|name")},getTauriVersion:async function(){return o("plugin:app|tauri_version")},getVersion:async function(){return o("plugin:app|version")},hide:async function(){return o("plugin:app|app_hide")},show:async function(){return o("plugin:app|app_show")}});async function h(e,n){await o("plugin:event|unlisten",{event:e,eventId:n})}async function y(e,n,t){return o("plugin:event|listen",{event:e,windowLabel:t?.target,handler:a(n)}).then((n=>async()=>h(e,n)))}async function g(e,n,t){return y(e,(t=>{n(t),h(e,t.id).catch((()=>{}))}),t)}async function w(e,n,t){await o("plugin:event|emit",{event:e,windowLabel:t?.target,payload:n})}!function(e){e.WINDOW_RESIZED="tauri://resize",e.WINDOW_MOVED="tauri://move",e.WINDOW_CLOSE_REQUESTED="tauri://close-requested",e.WINDOW_CREATED="tauri://window-created",e.WINDOW_DESTROYED="tauri://destroyed",e.WINDOW_FOCUS="tauri://focus",e.WINDOW_BLUR="tauri://blur",e.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",e.WINDOW_THEME_CHANGED="tauri://theme-changed",e.WINDOW_FILE_DROP="tauri://file-drop",e.WINDOW_FILE_DROP_HOVER="tauri://file-drop-hover",e.WINDOW_FILE_DROP_CANCELLED="tauri://file-drop-cancelled"}(d||(d={}));var _=Object.freeze({__proto__:null,get TauriEvent(){return d},emit:w,listen:y,once:g});class m{constructor(e,n){this.type="Logical",this.width=e,this.height=n}}class b{constructor(e,n){this.type="Physical",this.width=e,this.height=n}toLogical(e){return new m(this.width/e,this.height/e)}}class f{constructor(e,n){this.type="Logical",this.x=e,this.y=n}}class v{constructor(e,n){this.type="Physical",this.x=e,this.y=n}toLogical(e){return new f(this.x/e,this.y/e)}}var k,D,A=Object.freeze({__proto__:null,LogicalPosition:f,LogicalSize:m,PhysicalPosition:v,PhysicalSize:b});!function(e){e[e.Critical=1]="Critical",e[e.Informational=2]="Informational"}(k||(k={}));class E{constructor(e){this._preventDefault=!1,this.event=e.event,this.windowLabel=e.windowLabel,this.id=e.id}preventDefault(){this._preventDefault=!0}isPreventDefault(){return this._preventDefault}}function I(){return new P(window.__TAURI_INTERNALS__.metadata.currentWindow.label,{skip:!0})}function L(){return window.__TAURI_INTERNALS__.metadata.windows.map((e=>new P(e.label,{skip:!0})))}!function(e){e.None="none",e.Normal="normal",e.Indeterminate="indeterminate",e.Paused="paused",e.Error="error"}(D||(D={}));const S=["tauri://created","tauri://error"];class P{constructor(e,n={}){this.label=e,this.listeners=Object.create(null),n?.skip||o("plugin:window|create",{options:{...n,label:e}}).then((async()=>this.emit("tauri://created"))).catch((async e=>this.emit("tauri://error",e)))}static getByLabel(e){return L().some((n=>n.label===e))?new P(e,{skip:!0}):null}static getCurrent(){return I()}static getAll(){return L()}static async getFocusedWindow(){for(const e of L())if(await e.isFocused())return e;return null}async listen(e,n){return this._handleTauriEvent(e,n)?Promise.resolve((()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)})):y(e,n,{target:this.label})}async once(e,n){return this._handleTauriEvent(e,n)?Promise.resolve((()=>{const t=this.listeners[e];t.splice(t.indexOf(n),1)})):g(e,n,{target:this.label})}async emit(e,n){if(S.includes(e)){for(const t of this.listeners[e]||[])t({event:e,id:-1,windowLabel:this.label,payload:n});return Promise.resolve()}return w(e,n,{target:this.label})}_handleTauriEvent(e,n){return!!S.includes(e)&&(e in this.listeners?this.listeners[e].push(n):this.listeners[e]=[n],!0)}async scaleFactor(){return o("plugin:window|scale_factor",{label:this.label})}async innerPosition(){return o("plugin:window|inner_position",{label:this.label}).then((({x:e,y:n})=>new v(e,n)))}async outerPosition(){return o("plugin:window|outer_position",{label:this.label}).then((({x:e,y:n})=>new v(e,n)))}async innerSize(){return o("plugin:window|inner_size",{label:this.label}).then((({width:e,height:n})=>new b(e,n)))}async outerSize(){return o("plugin:window|outer_size",{label:this.label}).then((({width:e,height:n})=>new b(e,n)))}async isFullscreen(){return o("plugin:window|is_fullscreen",{label:this.label})}async isMinimized(){return o("plugin:window|is_minimized",{label:this.label})}async isMaximized(){return o("plugin:window|is_maximized",{label:this.label})}async isFocused(){return o("plugin:window|is_focused",{label:this.label})}async isDecorated(){return o("plugin:window|is_decorated",{label:this.label})}async isResizable(){return o("plugin:window|is_resizable",{label:this.label})}async isMaximizable(){return o("plugin:window|is_maximizable",{label:this.label})}async isMinimizable(){return o("plugin:window|is_minimizable",{label:this.label})}async isClosable(){return o("plugin:window|is_closable",{label:this.label})}async isVisible(){return o("plugin:window|is_visible",{label:this.label})}async title(){return o("plugin:window|title",{label:this.label})}async theme(){return o("plugin:window|theme",{label:this.label})}async center(){return o("plugin:window|center",{label:this.label})}async requestUserAttention(e){let n=null;return e&&(n=e===k.Critical?{type:"Critical"}:{type:"Informational"}),o("plugin:window|request_user_attention",{label:this.label,value:n})}async setResizable(e){return o("plugin:window|set_resizable",{label:this.label,value:e})}async setMaximizable(e){return o("plugin:window|set_maximizable",{label:this.label,value:e})}async setMinimizable(e){return o("plugin:window|set_minimizable",{label:this.label,value:e})}async setClosable(e){return o("plugin:window|set_closable",{label:this.label,value:e})}async setTitle(e){return o("plugin:window|set_title",{label:this.label,value:e})}async maximize(){return o("plugin:window|maximize",{label:this.label})}async unmaximize(){return o("plugin:window|unmaximize",{label:this.label})}async toggleMaximize(){return o("plugin:window|toggle_maximize",{label:this.label})}async minimize(){return o("plugin:window|minimize",{label:this.label})}async unminimize(){return o("plugin:window|unminimize",{label:this.label})}async show(){return o("plugin:window|show",{label:this.label})}async hide(){return o("plugin:window|hide",{label:this.label})}async close(){return o("plugin:window|close",{label:this.label})}async setDecorations(e){return o("plugin:window|set_decorations",{label:this.label,value:e})}async setShadow(e){return o("plugin:window|set_shadow",{label:this.label,value:e})}async setEffects(e){return o("plugin:window|set_effects",{label:this.label,value:e})}async clearEffects(){return o("plugin:window|set_effects",{label:this.label,value:null})}async setAlwaysOnTop(e){return o("plugin:window|set_always_on_top",{label:this.label,value:e})}async setAlwaysOnBottom(e){return o("plugin:window|set_always_on_bottom",{label:this.label,value:e})}async setContentProtected(e){return o("plugin:window|set_content_protected",{label:this.label,value:e})}async setSize(e){if(!e||"Logical"!==e.type&&"Physical"!==e.type)throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return o("plugin:window|set_size",{label:this.label,value:{type:e.type,data:{width:e.width,height:e.height}}})}async setMinSize(e){if(e&&"Logical"!==e.type&&"Physical"!==e.type)throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return o("plugin:window|set_min_size",{label:this.label,value:e?{type:e.type,data:{width:e.width,height:e.height}}:null})}async setMaxSize(e){if(e&&"Logical"!==e.type&&"Physical"!==e.type)throw new Error("the `size` argument must be either a LogicalSize or a PhysicalSize instance");return o("plugin:window|set_max_size",{label:this.label,value:e?{type:e.type,data:{width:e.width,height:e.height}}:null})}async setPosition(e){if(!e||"Logical"!==e.type&&"Physical"!==e.type)throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return o("plugin:window|set_position",{label:this.label,value:{type:e.type,data:{x:e.x,y:e.y}}})}async setFullscreen(e){return o("plugin:window|set_fullscreen",{label:this.label,value:e})}async setFocus(){return o("plugin:window|set_focus",{label:this.label})}async setIcon(e){return o("plugin:window|set_icon",{label:this.label,value:"string"==typeof e?e:Array.from(e)})}async setSkipTaskbar(e){return o("plugin:window|set_skip_taskbar",{label:this.label,value:e})}async setCursorGrab(e){return o("plugin:window|set_cursor_grab",{label:this.label,value:e})}async setCursorVisible(e){return o("plugin:window|set_cursor_visible",{label:this.label,value:e})}async setCursorIcon(e){return o("plugin:window|set_cursor_icon",{label:this.label,value:e})}async setCursorPosition(e){if(!e||"Logical"!==e.type&&"Physical"!==e.type)throw new Error("the `position` argument must be either a LogicalPosition or a PhysicalPosition instance");return o("plugin:window|set_cursor_position",{label:this.label,value:{type:e.type,data:{x:e.x,y:e.y}}})}async setIgnoreCursorEvents(e){return o("plugin:window|set_ignore_cursor_events",{label:this.label,value:e})}async startDragging(){return o("plugin:window|start_dragging",{label:this.label})}async startResizeDragging(e){return o("plugin:window|start_resize_dragging",{label:this.label,value:e})}async setProgressBar(e){return o("plugin:window|set_progress_bar",{label:this.label,value:e})}async onResized(e){return this.listen(d.WINDOW_RESIZED,(n=>{n.payload=R(n.payload),e(n)}))}async onMoved(e){return this.listen(d.WINDOW_MOVED,(n=>{n.payload=z(n.payload),e(n)}))}async onCloseRequested(e){return this.listen(d.WINDOW_CLOSE_REQUESTED,(n=>{const t=new E(n);Promise.resolve(e(t)).then((()=>{if(!t.isPreventDefault())return this.close()}))}))}async onFocusChanged(e){const n=await this.listen(d.WINDOW_FOCUS,(n=>{e({...n,payload:!0})})),t=await this.listen(d.WINDOW_BLUR,(n=>{e({...n,payload:!1})}));return()=>{n(),t()}}async onScaleChanged(e){return this.listen(d.WINDOW_SCALE_FACTOR_CHANGED,e)}async onFileDropEvent(e){const n=await this.listen(d.WINDOW_FILE_DROP,(n=>{e({...n,payload:{type:"drop",paths:n.payload.paths,position:z(n.payload.position)}})})),t=await this.listen(d.WINDOW_FILE_DROP_HOVER,(n=>{e({...n,payload:{type:"hover",paths:n.payload.paths,position:z(n.payload.position)}})})),i=await this.listen(d.WINDOW_FILE_DROP_CANCELLED,(n=>{e({...n,payload:{type:"cancel"}})}));return()=>{n(),t(),i()}}async onThemeChanged(e){return this.listen(d.WINDOW_THEME_CHANGED,e)}}var C,T;function x(e){return null===e?null:{name:e.name,scaleFactor:e.scaleFactor,position:z(e.position),size:R(e.size)}}function z(e){return new v(e.x,e.y)}function R(e){return new b(e.width,e.height)}!function(e){e.AppearanceBased="appearanceBased",e.Light="light",e.Dark="dark",e.MediumLight="mediumLight",e.UltraDark="ultraDark",e.Titlebar="titlebar",e.Selection="selection",e.Menu="menu",e.Popover="popover",e.Sidebar="sidebar",e.HeaderView="headerView",e.Sheet="sheet",e.WindowBackground="windowBackground",e.HudWindow="hudWindow",e.FullScreenUI="fullScreenUI",e.Tooltip="tooltip",e.ContentBackground="contentBackground",e.UnderWindowBackground="underWindowBackground",e.UnderPageBackground="underPageBackground",e.Mica="mica",e.Blur="blur",e.Acrylic="acrylic",e.Tabbed="tabbed",e.TabbedDark="tabbedDark",e.TabbedLight="tabbedLight"}(C||(C={})),function(e){e.FollowsWindowActiveState="followsWindowActiveState",e.Active="active",e.Inactive="inactive"}(T||(T={}));var F,W=Object.freeze({__proto__:null,CloseRequestedEvent:E,get Effect(){return C},get EffectState(){return T},LogicalPosition:f,LogicalSize:m,PhysicalPosition:v,PhysicalSize:b,get ProgressBarStatus(){return D},get UserAttentionType(){return k},Window:P,availableMonitors:async function(){return o("plugin:window|available_monitors").then((e=>e.map(x)))},currentMonitor:async function(){return o("plugin:window|current_monitor").then(x)},getAll:L,getCurrent:I,primaryMonitor:async function(){return o("plugin:window|primary_monitor").then(x)}});!function(e){e[e.Audio=1]="Audio",e[e.Cache=2]="Cache",e[e.Config=3]="Config",e[e.Data=4]="Data",e[e.LocalData=5]="LocalData",e[e.Document=6]="Document",e[e.Download=7]="Download",e[e.Picture=8]="Picture",e[e.Public=9]="Public",e[e.Video=10]="Video",e[e.Resource=11]="Resource",e[e.Temp=12]="Temp",e[e.AppConfig=13]="AppConfig",e[e.AppData=14]="AppData",e[e.AppLocalData=15]="AppLocalData",e[e.AppCache=16]="AppCache",e[e.AppLog=17]="AppLog",e[e.Desktop=18]="Desktop",e[e.Executable=19]="Executable",e[e.Font=20]="Font",e[e.Home=21]="Home",e[e.Runtime=22]="Runtime",e[e.Template=23]="Template"}(F||(F={}));var N=Object.freeze({__proto__:null,get BaseDirectory(){return F},appCacheDir:async function(){return o("plugin:path|resolve_directory",{directory:F.AppCache})},appConfigDir:async function(){return o("plugin:path|resolve_directory",{directory:F.AppConfig})},appDataDir:async function(){return o("plugin:path|resolve_directory",{directory:F.AppData})},appLocalDataDir:async function(){return o("plugin:path|resolve_directory",{directory:F.AppLocalData})},appLogDir:async function(){return o("plugin:path|resolve_directory",{directory:F.AppLog})},audioDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Audio})},basename:async function(e,n){return o("plugin:path|basename",{path:e,ext:n})},cacheDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Cache})},configDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Config})},dataDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Data})},delimiter:function(){return window.__TAURI_INTERNALS__.plugins.path.delimiter},desktopDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Desktop})},dirname:async function(e){return o("plugin:path|dirname",{path:e})},documentDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Document})},downloadDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Download})},executableDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Executable})},extname:async function(e){return o("plugin:path|extname",{path:e})},fontDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Font})},homeDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Home})},isAbsolute:async function(e){return o("plugin:path|isAbsolute",{path:e})},join:async function(...e){return o("plugin:path|join",{paths:e})},localDataDir:async function(){return o("plugin:path|resolve_directory",{directory:F.LocalData})},normalize:async function(e){return o("plugin:path|normalize",{path:e})},pictureDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Picture})},publicDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Public})},resolve:async function(...e){return o("plugin:path|resolve",{paths:e})},resolveResource:async function(e){return o("plugin:path|resolve_directory",{directory:F.Resource,path:e})},resourceDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Resource})},runtimeDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Runtime})},sep:function(){return window.__TAURI_INTERNALS__.plugins.path.sep},tempDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Temp})},templateDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Template})},videoDir:async function(){return o("plugin:path|resolve_directory",{directory:F.Video})}});class O extends u{constructor(e,n){super(e),this.id=n}static async new(e){e?.menu&&(e.menu=[e.menu.rid,e.menu.kind]),e?.icon&&(e.icon="string"==typeof e.icon?e.icon:Array.from(e.icon));const n=new s;return e?.action&&(n.onmessage=e.action,delete e.action),o("plugin:tray|new",{options:e??{},handler:n}).then((([e,n])=>new O(e,n)))}async setIcon(e){let n=null;return e&&(n="string"==typeof e?e:Array.from(e)),o("plugin:tray|set_icon",{rid:this.rid,icon:n})}async setMenu(e){return e&&(e=[e.rid,e.kind]),o("plugin:tray|set_menu",{rid:this.rid,menu:e})}async setTooltip(e){return o("plugin:tray|set_tooltip",{rid:this.rid,tooltip:e})}async setTitle(e){return o("plugin:tray|set_title",{rid:this.rid,title:e})}async setVisible(e){return o("plugin:tray|set_visible",{rid:this.rid,visible:e})}async setTempDirPath(e){return o("plugin:tray|set_temp_dir_path",{rid:this.rid,path:e})}async setIconAsTemplate(e){return o("plugin:tray|set_icon_as_template",{rid:this.rid,asTemplate:e})}async setMenuOnLeftClick(e){return o("plugin:tray|set_show_menu_on_left_click",{rid:this.rid,onLeft:e})}}var M,U,B,V=Object.freeze({__proto__:null,TrayIcon:O});function H(e){if("items"in e)e.items=e.items?.map((e=>"rid"in e?e:H(e)));else if("action"in e&&e.action){const n=new s;return n.onmessage=e.action,delete e.action,{...e,handler:n}}return e}async function G(e,n){const t=new s;let i=null;return n&&"object"==typeof n&&("action"in n&&n.action&&(t.onmessage=n.action,delete n.action),"items"in n&&n.items&&(i=n.items.map((e=>"rid"in e?[e.rid,e.kind]:H(e))))),o("plugin:menu|new",{kind:e,options:n?{...n,items:i}:void 0,handler:t})}class j extends u{get id(){return n(this,M,"f")}get kind(){return n(this,U,"f")}constructor(e,n,i){super(e),M.set(this,void 0),U.set(this,void 0),t(this,M,n,"f"),t(this,U,i,"f")}}M=new WeakMap,U=new WeakMap;class q extends j{constructor(e,n){super(e,n,"MenuItem")}static async new(e){return G("MenuItem",e).then((([e,n])=>new q(e,n)))}async text(){return o("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return o("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return o("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return o("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return o("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}}class Q extends j{constructor(e,n){super(e,n,"Check")}static async new(e){return G("Check",e).then((([e,n])=>new Q(e,n)))}async text(){return o("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return o("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return o("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return o("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return o("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}async isChecked(){return o("plugin:menu|is_checked",{rid:this.rid})}async setChecked(e){return o("plugin:menu|set_checked",{rid:this.rid,checked:e})}}!function(e){e.Add="Add",e.Advanced="Advanced",e.Bluetooth="Bluetooth",e.Bookmarks="Bookmarks",e.Caution="Caution",e.ColorPanel="ColorPanel",e.ColumnView="ColumnView",e.Computer="Computer",e.EnterFullScreen="EnterFullScreen",e.Everyone="Everyone",e.ExitFullScreen="ExitFullScreen",e.FlowView="FlowView",e.Folder="Folder",e.FolderBurnable="FolderBurnable",e.FolderSmart="FolderSmart",e.FollowLinkFreestanding="FollowLinkFreestanding",e.FontPanel="FontPanel",e.GoLeft="GoLeft",e.GoRight="GoRight",e.Home="Home",e.IChatTheater="IChatTheater",e.IconView="IconView",e.Info="Info",e.InvalidDataFreestanding="InvalidDataFreestanding",e.LeftFacingTriangle="LeftFacingTriangle",e.ListView="ListView",e.LockLocked="LockLocked",e.LockUnlocked="LockUnlocked",e.MenuMixedState="MenuMixedState",e.MenuOnState="MenuOnState",e.MobileMe="MobileMe",e.MultipleDocuments="MultipleDocuments",e.Network="Network",e.Path="Path",e.PreferencesGeneral="PreferencesGeneral",e.QuickLook="QuickLook",e.RefreshFreestanding="RefreshFreestanding",e.Refresh="Refresh",e.Remove="Remove",e.RevealFreestanding="RevealFreestanding",e.RightFacingTriangle="RightFacingTriangle",e.Share="Share",e.Slideshow="Slideshow",e.SmartBadge="SmartBadge",e.StatusAvailable="StatusAvailable",e.StatusNone="StatusNone",e.StatusPartiallyAvailable="StatusPartiallyAvailable",e.StatusUnavailable="StatusUnavailable",e.StopProgressFreestanding="StopProgressFreestanding",e.StopProgress="StopProgress",e.TrashEmpty="TrashEmpty",e.TrashFull="TrashFull",e.User="User",e.UserAccounts="UserAccounts",e.UserGroup="UserGroup",e.UserGuest="UserGuest"}(B||(B={}));class $ extends j{constructor(e,n){super(e,n,"Icon")}static async new(e){return G("Icon",e).then((([e,n])=>new $(e,n)))}async text(){return o("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return o("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return o("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return o("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async setAccelerator(e){return o("plugin:menu|set_accelerator",{rid:this.rid,kind:this.kind,accelerator:e})}async setIcon(e){return o("plugin:menu|set_icon",{rid:this.rid,icon:e})}}class Z extends j{constructor(e,n){super(e,n,"Predefined")}static async new(e){return G("Predefined",e).then((([e,n])=>new Z(e,n)))}async text(){return o("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return o("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}}function J([e,n,t]){switch(t){case"Submenu":return new K(e,n);case"Predefined":return new Z(e,n);case"Check":return new Q(e,n);case"Icon":return new $(e,n);default:return new q(e,n)}}class K extends j{constructor(e,n){super(e,n,"Submenu")}static async new(e){return G("Submenu",e).then((([e,n])=>new K(e,n)))}async text(){return o("plugin:menu|text",{rid:this.rid,kind:this.kind})}async setText(e){return o("plugin:menu|set_text",{rid:this.rid,kind:this.kind,text:e})}async isEnabled(){return o("plugin:menu|is_enabled",{rid:this.rid,kind:this.kind})}async setEnabled(e){return o("plugin:menu|set_enabled",{rid:this.rid,kind:this.kind,enabled:e})}async append(e){return o("plugin:menu|append",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async prepend(e){return o("plugin:menu|prepend",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async insert(e,n){return o("plugin:menu|insert",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e)),position:n})}async remove(e){return o("plugin:menu|remove",{rid:this.rid,kind:this.kind,item:[e.rid,e.kind]})}async removeAt(e){return o("plugin:menu|remove_at",{rid:this.rid,kind:this.kind,position:e}).then(J)}async items(){return o("plugin:menu|items",{rid:this.rid,kind:this.kind}).then((e=>e.map(J)))}async get(e){return o("plugin:menu|get",{rid:this.rid,kind:this.kind,id:e}).then((e=>e?J(e):null))}async popup(e,n){let t=null;return e&&(t={type:e instanceof v?"Physical":"Logical",data:e}),o("plugin:menu|popup",{rid:this.rid,kind:this.kind,window:n?.label??null,at:t})}async setAsWindowsMenuForNSApp(){return o("plugin:menu|set_as_windows_menu_for_nsapp",{rid:this.rid})}async setAsHelpMenuForNSApp(){return o("plugin:menu|set_as_help_menu_for_nsapp",{rid:this.rid})}}function Y([e,n,t]){switch(t){case"Submenu":return new K(e,n);case"Predefined":return new Z(e,n);case"Check":return new Q(e,n);case"Icon":return new $(e,n);default:return new q(e,n)}}class X extends j{constructor(e,n){super(e,n,"Menu")}static async new(e){return G("Menu",e).then((([e,n])=>new X(e,n)))}static async default(){return o("plugin:menu|create_default").then((([e,n])=>new X(e,n)))}async append(e){return o("plugin:menu|append",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async prepend(e){return o("plugin:menu|prepend",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e))})}async insert(e,n){return o("plugin:menu|insert",{rid:this.rid,kind:this.kind,items:(Array.isArray(e)?e:[e]).map((e=>"rid"in e?[e.rid,e.kind]:e)),position:n})}async remove(e){return o("plugin:menu|remove",{rid:this.rid,kind:this.kind,item:[e.rid,e.kind]})}async removeAt(e){return o("plugin:menu|remove_at",{rid:this.rid,kind:this.kind,position:e}).then(Y)}async items(){return o("plugin:menu|items",{rid:this.rid,kind:this.kind}).then((e=>e.map(Y)))}async get(e){return o("plugin:menu|get",{rid:this.rid,kind:this.kind,id:e}).then((e=>e?Y(e):null))}async popup(e,n){let t=null;return e&&(t={type:e instanceof v?"Physical":"Logical",data:e}),o("plugin:menu|popup",{rid:this.rid,kind:this.kind,window:n?.label??null,at:t})}async setAsAppMenu(){return o("plugin:menu|set_as_app_menu",{rid:this.rid}).then((e=>e?new X(e[0],e[1]):null))}async setAsWindowMenu(e){return o("plugin:menu|set_as_window_menu",{rid:this.rid,window:e?.label??null}).then((e=>e?new X(e[0],e[1]):null))}}var ee=Object.freeze({__proto__:null,CheckMenuItem:Q,IconMenuItem:$,Menu:X,MenuItem:q,get NativeIcon(){return B},PredefinedMenuItem:Z,Submenu:K});return e.app=p,e.core=c,e.dpi=A,e.event=_,e.menu=ee,e.path=N,e.tray=V,e.window=W,e}({});window.__TAURI__=__TAURI_IIFE__;
