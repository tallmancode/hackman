<script setup lang="ts">

</script>

<template>
    <div class="flex flex-col items-center justify-center h-dvh w-full text-white">
        <div class="h-[calc(100vw-100px)] w-[calc(100vw-100px)] md:h-[500px] md:w-[500px] rounded-full bg-[#090909] flex flex-col items-center justify-center">
            <div class="wrapper">
                <div class="triangle-wrap">
                    <div class="triangle triangle--main"></div>
                    <div class="triangle triangle--red"></div>
                    <div class="triangle triangle--blue"></div>
                    <div class="triangle__text">Loading</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.triangle{
    margin: auto;
    border-style: solid;
    border-width: 0 125px 216.5px 125px;
    border-color: transparent transparent   #F2F2F0 transparent;
    animation-name: triangleMove;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    transition-timing-function: linear;
    &:after{
        position: absolute;
        top: 11.5px;
        left: -114px;
        display: block;
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 115px 199.2px 115px;
        border-color: transparent transparent #090909 transparent;
    }

}

.triangle-wrap{
    margin: auto;
    position: relative;
    width: 250px;
    height: 217px;
}
.triangle--main{
    position: relative;
    z-index: 10;
}
.triangle--red{
    left: 0;
    top: 0;
    position: absolute !important;
    border-color: transparent transparent red transparent;
    animation-delay: .5s;
}
.triangle--blue{
    left: 0;
    top: 0;
    position: absolute !important;
    border-color: transparent transparent blue transparent;
    animation-delay: .3s;
}
.triangle__text{
    color: #fff;
    position: absolute;
    top: 50%;
    left: 0;
    text-align: center;
    z-index: 9999;
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 700;
    padding: 10px;
    background-color: #090909;
    letter-spacing: 20px;
    animation-name: textAnim;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    transition-timing-function: linear;
}

@keyframes triangleMove{
    10%{
        transform: translateX(10px);
        filter: blur(3px);
    }
    20%{
        transform: translateX(4px);
        filter: blur(0);
    }
    30%{
        transform: translateX(-5px) skew(0deg);
        filter: blur(3px);
    }
    40%{
        transform: translateX(7px);
        filter: blur(0);
    }
    50%{
        transform: translateX(3px);
    }
    60%{
        transform: translateX(2px);
        filter: blur(5px);
    }
    70%{
        transform: translateX(-2px);
        filter: blur(0);
    }
    80%{
        transform: translateX(3px);
        filter: blur(2px);
    }
    90%{
        transform: translateX(-3px);
    }
    100%{
        transform: translateX(3px);
    }
}
@keyframes textAnim{
    10%{
        transform: scale(1.2) skew(180deg);
    }
    11%{
        transform: scale(1) skew(180deg);
    }

    70%{
        transform: scale(1) skew(-300deg);
        filter: blur(1px);
    }

    99%{
        transform: scale(1) skew(200deg);
    }

    100%{
        transform: scale(1) skew(-200deg);

    }

}

</style>