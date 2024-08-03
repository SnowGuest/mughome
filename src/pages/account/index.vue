<template>
    <div class="accountPage flex">
        <div class="anim-view">
            <canvas class="renderRef"  ref="renderRef"></canvas>
        </div>
        <div class="form-view flex">
            <!-- <router-view></router-view> -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import * as rive from "@rive-app/canvas";
const renderRef = ref<HTMLCanvasElement>()
onMounted(renderAnim)
async function renderAnim() {
    if (!renderRef.value) await nextTick();
    if (!renderRef.value) return;
    const r = new rive.Rive({
        src: "https://cdn.rive.app/animations/vehicles.riv",
        // OR the path to a discoverable and public Rive asset
        // src: '/public/example.riv',
        canvas: renderRef.value,
        autoplay: true,
        stateMachines: "bumpy",
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
        },
    });
    window.addEventListener("resize",()=>{
        r.resizeDrawingSurfaceToCanvas()
    })
}
</script>
<style lang="less" scoped>
.accountPage {
    min-height: 100vh;
    overflow-x: hidden;
    // height: ;
}

.anim-view {
    position: sticky;
    top: 0;
    height: 240px;
    flex: 1 1 auto;
    .renderRef{
        width: 100%;
        height: 100%;
    }
}

.form-view {}

@media screen and (min-width: 960px) {
    .anim-view {
        width: 50%;
        height: 100vh;
        flex: 3 1 auto;
    }

    .accountPage {
        flex-direction: column;
    }

    .form-view {
        flex: 2 0 auto;
        width: 380px;
        display: flex;
        padding: 100px;
        flex-direction: column;
        justify-content: center;
    }
}

@media screen and (max-width: 960px) {

    .main {
        margin-left: 0 !important;
    }
}
</style>