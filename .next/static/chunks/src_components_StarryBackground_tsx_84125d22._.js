(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/StarryBackground.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>StarryBackground)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function StarryBackground() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StarryBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;
            // Generate stars
            const numStars = 200;
            const stars = [];
            for(let i = 0; i < numStars; i++){
                const radius = Math.random() * 1.5 + 0.5;
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius,
                    alpha: Math.random(),
                    dAlpha: Math.random() * 0.02 * (Math.random() < 0.5 ? 1 : -1)
                });
            }
            // Handle resize
            const onResize = {
                "StarryBackground.useEffect.onResize": ()=>{
                    width = canvas.width = window.innerWidth;
                    height = canvas.height = window.innerHeight;
                }
            }["StarryBackground.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // Animation loop
            let animationId;
            const draw = {
                "StarryBackground.useEffect.draw": ()=>{
                    if (!ctx) return;
                    ctx.clearRect(0, 0, width, height);
                    stars.forEach({
                        "StarryBackground.useEffect.draw": (star)=>{
                            // twinkle
                            star.alpha += star.dAlpha;
                            if (star.alpha <= 0 || star.alpha >= 1) star.dAlpha *= -1;
                            ctx.beginPath();
                            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255,255,255,${star.alpha.toFixed(2)})`;
                            ctx.fill();
                        }
                    }["StarryBackground.useEffect.draw"]);
                    animationId = requestAnimationFrame(draw);
                }
            }["StarryBackground.useEffect.draw"];
            draw();
            return ({
                "StarryBackground.useEffect": ()=>{
                    cancelAnimationFrame(animationId);
                    window.removeEventListener('resize', onResize);
                }
            })["StarryBackground.useEffect"];
        }
    }["StarryBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute inset-0 z-0"
    }, void 0, false, {
        fileName: "[project]/src/components/StarryBackground.tsx",
        lineNumber: 72,
        columnNumber: 10
    }, this);
}
_s(StarryBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = StarryBackground;
var _c;
__turbopack_context__.k.register(_c, "StarryBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/StarryBackground.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/StarryBackground.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_components_StarryBackground_tsx_84125d22._.js.map