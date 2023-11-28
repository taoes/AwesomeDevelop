<template>
        <span>降级</span>
</template>
<script>
export default {
    name: 'Card',
    data(){
        return {

        }
    }
}
</script>
<style lang="scss">
button {
    background-color: #4e6ef2
}

.g-card-link {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    text-align: center;
    line-height: 38px;

    .g-card-item {
        background: blue;
        width: 113px;
        max-width: 138px;
        height: 38px;
        cursor: pointer;
        overflow: hidden;
    }

    .g-card-item:nth-of-type(2n) {
        background: rgba(44, 104, 255, .1);
    }

    .g-card-item:nth-of-type(2n+1) {
        background: rgba(56, 203, 137, .1);
    }
}</style>
